"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("ethers/utils");
class LiquidLongDependenciesEthers {
    constructor(provider, signer) {
        this.keccak256 = (utf8String) => utils_1.keccak256(utils_1.toUtf8Bytes(utf8String));
        this.encodeParams = (abiFunction, parameters) => new utils_1.AbiCoder().encode(abiFunction.inputs, parameters).substr(2);
        this.decodeParams = (abiParameters, encoded) => new utils_1.AbiCoder().decode(abiParameters, encoded);
        this.getDefaultAddress = async () => (await this.provider.listAccounts())[0];
        this.call = async (transaction) => await this.provider.call(transaction);
        this.submitTransaction = async (transaction) => ({ status: (await (await this.signer.sendTransaction(transaction)).wait()).status });
        this.provider = provider;
        this.signer = signer;
    }
}
exports.LiquidLongDependenciesEthers = LiquidLongDependenciesEthers;
//# sourceMappingURL=liquid-long-ethers-impl.js.map