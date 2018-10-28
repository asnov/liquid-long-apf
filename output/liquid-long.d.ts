import { Provider, Signer } from './liquid-long-ethers-impl';
import { Scheduler } from './scheduler';
export declare class LiquidLong {
    private readonly contract;
    private readonly ethPriceInUsd;
    private readonly providerFeeRate;
    readonly awaitReady: Promise<void>;
    constructor(scheduler: Scheduler, provider: Provider, signer: Signer, liquidLongAddress: string, defaultEthPriceInUsd: number, defaultProviderFeeRate: number, ethPricePollingFrequency?: number, providerFeePollingFrequency?: number);
    shutdown: () => Promise<void>;
    registerForEthPriceUpdated: (listener: (newEthPriceInUsd: number) => void) => void;
    getEthPriceInUsd: () => Promise<number>;
    getLiquidationPriceInUsd: (leverageMultiplier: number) => Promise<number>;
    getFuturePriceInUsdForPercentChange: (percentChangeFromCurrent: number, leverageMultiplier: number) => Promise<number>;
    getPercentageChangeForFuturePrice: (futurePriceInUsd: number, leverageMultiplier: number) => Promise<number>;
    getPositionValueInUsdAtFuturePrice: (futurePriceInUsd: number, leverageMultiplier: number, leverageSizeInEth: number) => Promise<number>;
    getChangeInPositionValueInUsdAtFuturePrice: (futurePriceInUsd: number, leverageMultiplier: number, leverageSizeInEth: number) => Promise<number>;
    getFeeInEth: (leverageMultiplier: number, leverageSizeInEth: number) => Promise<number>;
    getLiquidationPenaltyPercent: (leverageMultiplier: number) => number;
    getEstimatedCostsInEth: (leverageMultiplier: number, leverageSizeInEth: number) => Promise<{
        low: number;
        high: number;
    }>;
    openPosition: (leverageMultiplier: number, leverageSizeInEth: number, costLimitInEth: number, feeLimitInEth: number) => Promise<void>;
    adminDepositEth: (amount: number) => Promise<void>;
    adminWithdrawEth: (amount: number) => Promise<void>;
    private fetchEthPriceInUsd;
    private fetchProviderFeeRate;
    private getLoanSizeInEth;
}
