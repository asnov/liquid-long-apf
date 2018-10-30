import { keccak256, toUtf8Bytes, AbiCoder } from 'ethers/utils';
export class LiquidLongDependenciesEthers {
    constructor(provider, signer) {
        this.keccak256 = (utf8String) => keccak256(toUtf8Bytes(utf8String));
        this.encodeParams = (abiFunction, parameters) => new AbiCoder().encode(abiFunction.inputs, parameters).substr(2);
        this.decodeParams = (abiParameters, encoded) => new AbiCoder().decode(abiParameters, encoded);
        this.getDefaultAddress = async () => (await this.provider.listAccounts())[0];
        this.call = async (transaction) => await this.provider.call(transaction);
        this.submitTransaction = async (transaction) => ({ status: (await (await this.signer.sendTransaction(transaction)).wait()).status });
        this.provider = provider;
        this.signer = signer;
    }
}
//# sourceMappingURL=liquid-long-ethers-impl.js.map