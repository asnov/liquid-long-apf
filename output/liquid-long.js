"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const liquid_long_1 = require("./generated/liquid-long");
const liquid_long_ethers_impl_1 = require("./liquid-long-ethers-impl");
const polled_value_1 = require("./polled-value");
const utils_1 = require("ethers/utils");
class LiquidLong {
    constructor(scheduler, provider, signer, liquidLongAddress, defaultEthPriceInUsd, defaultProviderFeeRate, ethPricePollingFrequency = 10000, providerFeePollingFrequency = 10000) {
        this.shutdown = async () => {
            await Promise.all([
                this.ethPriceInUsd.shutdown(),
                this.providerFeeRate.shutdown(),
            ]);
        };
        this.registerForEthPriceUpdated = (listener) => {
            this.ethPriceInUsd.registerListener(listener);
        };
        this.getEthPriceInUsd = async () => {
            return await this.ethPriceInUsd.cached;
        };
        this.getLiquidationPriceInUsd = async (leverageMultiplier) => {
            const ethPrice = await this.ethPriceInUsd.cached;
            const liquidationAsPercentOfPrice = 1.5 - 1.5 / leverageMultiplier;
            return ethPrice * liquidationAsPercentOfPrice;
        };
        this.getFuturePriceInUsdForPercentChange = async (percentChangeFromCurrent, leverageMultiplier) => {
            const ethPrice = await this.ethPriceInUsd.cached;
            return ethPrice * (1 + percentChangeFromCurrent / leverageMultiplier);
        };
        this.getPercentageChangeForFuturePrice = async (futurePriceInUsd, leverageMultiplier) => {
            const ethPrice = await this.ethPriceInUsd.cached;
            return leverageMultiplier * (futurePriceInUsd / ethPrice - 1);
        };
        this.getPositionValueInUsdAtFuturePrice = async (futurePriceInUsd, leverageMultiplier, leverageSizeInEth) => {
            const percentageChange = await this.getPercentageChangeForFuturePrice(futurePriceInUsd, leverageMultiplier);
            const ethAtPrice = leverageSizeInEth + leverageSizeInEth * percentageChange;
            return ethAtPrice * await this.ethPriceInUsd.cached;
        };
        this.getChangeInPositionValueInUsdAtFuturePrice = async (futurePriceInUsd, leverageMultiplier, leverageSizeInEth) => {
            const currentPositionValueInUsd = await this.getPositionValueInUsdAtFuturePrice(await this.ethPriceInUsd.cached, leverageMultiplier, leverageSizeInEth);
            const futurePositionValueInUsd = await this.getPositionValueInUsdAtFuturePrice(futurePriceInUsd, leverageMultiplier, leverageSizeInEth);
            return futurePositionValueInUsd - currentPositionValueInUsd;
        };
        this.getFeeInEth = async (leverageMultiplier, leverageSizeInEth) => {
            const providerFeeRate = await this.providerFeeRate.cached;
            const loanInEth = this.getLoanSizeInEth(leverageMultiplier, leverageSizeInEth);
            const feeInEth = loanInEth * providerFeeRate;
            return feeInEth;
        };
        // TODO verify this math with a run through of a liquidation
        this.getLiquidationPenaltyPercent = (leverageMultiplier) => {
            const liquidationAsPercentOfPrice = 1.5 - 1.5 / leverageMultiplier;
            return leverageMultiplier * (liquidationAsPercentOfPrice * (1 - 0.13 / leverageMultiplier) - 1);
        };
        this.getEstimatedCostsInEth = async (leverageMultiplier, leverageSizeInEth) => {
            const daiPerEth = this.ethPriceInUsd.cached;
            const loanSizeInEth = this.getLoanSizeInEth(leverageMultiplier, leverageSizeInEth);
            const daiToSell = loanSizeInEth * daiPerEth;
            const attodaiToSell = utils_1.bigNumberify(Math.floor(daiToSell * 1e9)).mul(1e9);
            const result = await this.contract.estimateDaiSaleProceeds_(attodaiToSell);
            const daiSaleProceedsInEth = result._wethBought.div(1e9).toNumber() / 1e9;
            const estimatedCostInEth = loanSizeInEth - daiSaleProceedsInEth;
            const low = estimatedCostInEth;
            const high = (low > 0) ? low * 2 : 0;
            return { low, high };
        };
        this.openPosition = async (leverageMultiplier, leverageSizeInEth, costLimitInEth, feeLimitInEth) => {
            const leverageMultiplierInPercents = utils_1.bigNumberify(Math.round(leverageMultiplier * 100));
            const leverageSizeInAttoeth = utils_1.bigNumberify(Math.floor(leverageSizeInEth * 1e9)).mul(1e9);
            const allowedCostInAttoeth = utils_1.bigNumberify(Math.floor(costLimitInEth * 1e9)).mul(1e9);
            const allowedFeeInAttoeth = utils_1.bigNumberify(Math.floor(feeLimitInEth * 1e9)).mul(1e9);
            const affiliateFeeInAttoeth = utils_1.bigNumberify(0);
            const affiliateAddress = '0x0000000000000000000000000000000000000000';
            const totalAttoeth = leverageSizeInAttoeth.add(allowedCostInAttoeth).add(allowedFeeInAttoeth).add(affiliateFeeInAttoeth);
            await this.contract.openCdp(leverageMultiplierInPercents, leverageSizeInAttoeth, allowedFeeInAttoeth, affiliateFeeInAttoeth, affiliateAddress, { attachedEth: totalAttoeth });
        };
        this.adminDepositEth = async (amount) => {
            await this.contract.wethDeposit({ attachedEth: utils_1.bigNumberify(amount).mul(1e18.toString()) });
        };
        this.adminWithdrawEth = async (amount) => {
            await this.contract.wethWithdraw(utils_1.bigNumberify(amount).mul(1e18.toString()));
        };
        this.fetchEthPriceInUsd = async () => {
            const attousd = await this.contract.ethPriceInUsd_();
            return attousd.div(1e9).toNumber() / 1e9;
        };
        this.fetchProviderFeeRate = async () => {
            const providerFeeAttoethPerEth = await this.contract.providerFeePerEth_();
            return providerFeeAttoethPerEth.div(1e9).toNumber() / 1e9;
        };
        this.getLoanSizeInEth = (leverageMultiplier, leverageSizeInEth) => {
            const ethLockedInCdp = leverageSizeInEth * leverageMultiplier;
            const loanInEth = ethLockedInCdp - leverageSizeInEth;
            return loanInEth;
        };
        this.contract = new liquid_long_1.LiquidLong(new liquid_long_ethers_impl_1.LiquidLongDependenciesEthers(provider, signer), liquidLongAddress);
        this.ethPriceInUsd = new polled_value_1.PolledValue(scheduler, this.fetchEthPriceInUsd, ethPricePollingFrequency, defaultEthPriceInUsd);
        this.providerFeeRate = new polled_value_1.PolledValue(scheduler, this.fetchProviderFeeRate, providerFeePollingFrequency, defaultProviderFeeRate);
        this.awaitReady = Promise.all([this.ethPriceInUsd.latest, this.providerFeeRate.latest]).then(() => { });
    }
}
exports.LiquidLong = LiquidLong;
// https://github.com/nodejs/promise-use-cases/issues/27 current behavior of node is dumb, this fixes that
// process.on('unhandledRejection', e => { /* swallow error */ })
//# sourceMappingURL=liquid-long.js.map