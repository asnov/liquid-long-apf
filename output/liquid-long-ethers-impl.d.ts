import { Dependencies, AbiFunction, AbiParameter, Transaction } from './generated/liquid-long';
import { BigNumber } from 'ethers/utils';
import { TransactionResponse, TransactionRequest } from 'ethers/providers';
export interface Provider {
    listAccounts(): Promise<Array<string>>;
    call(transaction: TransactionRequest): Promise<string>;
}
export interface Signer {
    sendTransaction(transaction: TransactionRequest): Promise<TransactionResponse>;
}
export declare class LiquidLongDependenciesEthers implements Dependencies<BigNumber> {
    private readonly provider;
    private readonly signer;
    constructor(provider: Provider, signer: Signer);
    keccak256: (utf8String: string) => string;
    encodeParams: (abiFunction: AbiFunction, parameters: any[]) => string;
    decodeParams: (abiParameters: AbiParameter[], encoded: string) => any;
    getDefaultAddress: () => Promise<string>;
    call: (transaction: Transaction<BigNumber>) => Promise<string>;
    submitTransaction: (transaction: Transaction<BigNumber>) => Promise<{
        status: number;
    }>;
}
