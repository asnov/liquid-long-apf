export declare type Primitive = 'uint8' | 'uint64' | 'uint256' | 'bool' | 'string' | 'address' | 'bytes20' | 'bytes32' | 'bytes' | 'int256' | 'tuple' | 'address[]' | 'uint256[]' | 'bytes32[]' | 'tuple[]';
export interface AbiParameter {
    name: string;
    type: Primitive;
    components?: Array<AbiParameter>;
}
export interface AbiEventParameter extends AbiParameter {
    indexed: boolean;
}
export interface AbiFunction {
    name: string;
    type: 'function' | 'constructor' | 'fallback';
    stateMutability: 'pure' | 'view' | 'payable' | 'nonpayable';
    constant: boolean;
    payable: boolean;
    inputs: Array<AbiParameter>;
    outputs: Array<AbiParameter>;
}
export interface AbiEvent {
    name: string;
    type: 'event';
    inputs: Array<AbiEventParameter>;
    anonymous: boolean;
}
export declare type Abi = Array<AbiFunction | AbiEvent>;
export interface Transaction<TBigNumber> {
    to: string;
    from: string;
    data: string;
    value?: TBigNumber;
}
export interface TransactionReceipt {
    status: number;
}
export interface Dependencies<TBigNumber> {
    keccak256(utf8String: string): string;
    encodeParams(abi: AbiFunction, parameters: Array<any>): string;
    decodeParams(abi: Array<AbiParameter>, encoded: string): Array<any>;
    getDefaultAddress(): Promise<string>;
    call(transaction: Transaction<TBigNumber>): Promise<string>;
    submitTransaction(transaction: Transaction<TBigNumber>): Promise<TransactionReceipt>;
}
/**
 * By convention, pure/view methods have a `_` suffix on them indicating to the caller that the function will be executed locally and return the function's result.  payable/nonpayable functions have both a localy version and a remote version (distinguished by the trailing `_`).  If the remote method is called, you will only get back a transaction hash which can be used to lookup the transaction receipt for success/failure (due to EVM limitations you will not get the function results back).
 */
export declare class Contract<TBigNumber> {
    protected readonly dependencies: Dependencies<TBigNumber>;
    readonly address: string;
    protected constructor(dependencies: Dependencies<TBigNumber>, address: string);
    private stringifyParams;
    private hashSignature;
    private encodeMethod;
    protected localCall(abi: AbiFunction, parameters: Array<any>, sender?: string, attachedEth?: TBigNumber): Promise<any>;
    protected remoteCall(abi: AbiFunction, parameters: Array<any>, txName: String, sender?: string, attachedEth?: TBigNumber): Promise<void>;
}
export declare class CdpHolder<TBigNumber> extends Contract<TBigNumber> {
    constructor(dependencies: Dependencies<TBigNumber>, address: string);
    returnUnrecognizedCdp: (cdpId: string, user: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    returnUnrecognizedCdp_: (cdpId: string, user: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    maker_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    renounceOwnership: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    renounceOwnership_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    owner_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    recordCdpOwnership: (cdpId: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    recordCdpOwnership_: (cdpId: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    returnCdp: (cdpId: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    returnCdp_: (cdpId: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    cdpLastOwner_: (arg0: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    transferOwnership: (newOwner: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    transferOwnership_: (newOwner: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
}
export declare class Claimable<TBigNumber> extends Contract<TBigNumber> {
    constructor(dependencies: Dependencies<TBigNumber>, address: string);
    claimOwnership: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    claimOwnership_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    renounceOwnership: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    renounceOwnership_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    owner_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    pendingOwner_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    transferOwnership: (newOwner: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    transferOwnership_: (newOwner: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
}
export declare class Dai<TBigNumber> extends Contract<TBigNumber> {
    constructor(dependencies: Dependencies<TBigNumber>, address: string);
    approve: (spender: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    approve_: (spender: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<boolean>;
    totalSupply_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    transferFrom: (from: string, to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    transferFrom_: (from: string, to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<boolean>;
    balanceOf_: (who: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    transfer: (to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    transfer_: (to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<boolean>;
    allowance_: (owner: string, spender: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
}
export declare class ERC20<TBigNumber> extends Contract<TBigNumber> {
    constructor(dependencies: Dependencies<TBigNumber>, address: string);
    approve: (spender: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    approve_: (spender: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<boolean>;
    totalSupply_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    transferFrom: (from: string, to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    transferFrom_: (from: string, to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<boolean>;
    balanceOf_: (who: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    transfer: (to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    transfer_: (to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<boolean>;
    allowance_: (owner: string, spender: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
}
export declare class ERC20Basic<TBigNumber> extends Contract<TBigNumber> {
    constructor(dependencies: Dependencies<TBigNumber>, address: string);
    totalSupply_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    balanceOf_: (who: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    transfer: (to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    transfer_: (to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<boolean>;
}
export declare class LiquidLong<TBigNumber> extends Contract<TBigNumber> {
    constructor(dependencies: Dependencies<TBigNumber>, address: string);
    totalPayments_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    getCdps: (user: string, offset: TBigNumber, pageSize: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    getCdps_: (user: string, offset: TBigNumber, pageSize: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<{
        id: TBigNumber;
        debtInAttodai: TBigNumber;
        lockedAttoeth: TBigNumber;
        feeInAttoeth: TBigNumber;
        liquidationCostInAttoeth: TBigNumber;
        liquidatableDebtInAttodai: TBigNumber;
        liquidationCostAtFeedPriceInAttoeth: TBigNumber;
        userOwned: boolean;
    }[]>;
    closeCdp: (cdpId: string, options?: {
        sender?: string | undefined;
        attachedEth?: TBigNumber | undefined;
    } | undefined) => Promise<void>;
    closeCdp_: (cdpId: string, options?: {
        sender?: string | undefined;
        attachedEth?: TBigNumber | undefined;
    } | undefined) => Promise<TBigNumber>;
    getPayPriceAndAmount_: (payGem: string, buyGem: string, payDesiredAmount: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<{
        _paidAmount: TBigNumber;
        _boughtAmount: TBigNumber;
    }>;
    wethDeposit: (options?: {
        sender?: string | undefined;
        attachedEth?: TBigNumber | undefined;
    } | undefined) => Promise<void>;
    wethDeposit_: (options?: {
        sender?: string | undefined;
        attachedEth?: TBigNumber | undefined;
    } | undefined) => Promise<void>;
    unpause: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    unpause_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    estimateDaiPurchaseCosts_: (attodaiToBuy: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<{
        _wethPaid: TBigNumber;
        _daiBought: TBigNumber;
    }>;
    weth_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    getVolumeAtPrice_: (payGem: string, buyGem: string, payAmount: TBigNumber, buyAmount: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<{
        _paidAmount: TBigNumber;
        _boughtAmount: TBigNumber;
    }>;
    returnUnrecognizedCdp: (cdpId: string, user: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    returnUnrecognizedCdp_: (cdpId: string, user: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    claimOwnership: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    claimOwnership_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    maker_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    estimateDaiSaleProceeds_: (attodaiToSell: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<{
        _daiPaid: TBigNumber;
        _wethBought: TBigNumber;
    }>;
    paused_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<boolean>;
    withdrawPayments: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    withdrawPayments_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    ethPriceInUsd_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    renounceOwnership: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    renounceOwnership_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    getBuyPriceAndAmount_: (payGem: string, buyGem: string, buyDesiredAmount: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<{
        _paidAmount: TBigNumber;
        _boughtAmount: TBigNumber;
    }>;
    openCdp: (leverage: TBigNumber, leverageSizeInAttoeth: TBigNumber, allowedFeeInAttoeth: TBigNumber, affiliateFeeInAttoeth: TBigNumber, affiliateAddress: string, options?: {
        sender?: string | undefined;
        attachedEth?: TBigNumber | undefined;
    } | undefined) => Promise<void>;
    openCdp_: (leverage: TBigNumber, leverageSizeInAttoeth: TBigNumber, allowedFeeInAttoeth: TBigNumber, affiliateFeeInAttoeth: TBigNumber, affiliateAddress: string, options?: {
        sender?: string | undefined;
        attachedEth?: TBigNumber | undefined;
    } | undefined) => Promise<string>;
    peth_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    mkr_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    pause: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    pause_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    owner_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    wethWithdraw: (amount: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    wethWithdraw_: (amount: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    recordCdpOwnership: (cdpId: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    recordCdpOwnership_: (cdpId: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    oasis_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    returnCdp: (cdpId: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    returnCdp_: (cdpId: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    cdpLastOwner_: (arg0: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    payments_: (arg0: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    pendingOwner_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    cdpCount_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    transferOwnership: (newOwner: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    transferOwnership_: (newOwner: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    dai_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    providerFeePerEth_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
}
export declare class Maker<TBigNumber> extends Contract<TBigNumber> {
    constructor(dependencies: Dependencies<TBigNumber>, address: string);
    join: (wad: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    join_: (wad: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    skr_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    gov_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    ink: (cup: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    ink_: (cup: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    draw: (cup: string, wad: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    draw_: (cup: string, wad: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    cupi_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    gap_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    rap: (cup: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    rap_: (cup: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    wipe: (cup: string, wad: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    wipe_: (cup: string, wad: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    gem_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    per_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    sai_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    lock: (cup: string, wad: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    lock_: (cup: string, wad: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    give: (cup: string, guy: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    give_: (cup: string, guy: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    chi: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    chi_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    pip_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    lad_: (cup: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    tab: (cup: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    tab_: (cup: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    open: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    open_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    cups_: (arg0: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<{
        lad: string;
        ink: TBigNumber;
        art: TBigNumber;
        ire: TBigNumber;
    }>;
}
export declare class Medianizer<TBigNumber> extends Contract<TBigNumber> {
    constructor(dependencies: Dependencies<TBigNumber>, address: string);
    read_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
}
export declare class Mkr<TBigNumber> extends Contract<TBigNumber> {
    constructor(dependencies: Dependencies<TBigNumber>, address: string);
    approve: (spender: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    approve_: (spender: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<boolean>;
    totalSupply_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    transferFrom: (from: string, to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    transferFrom_: (from: string, to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<boolean>;
    balanceOf_: (who: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    transfer: (to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    transfer_: (to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<boolean>;
    allowance_: (owner: string, spender: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
}
export declare class Oasis<TBigNumber> extends Contract<TBigNumber> {
    constructor(dependencies: Dependencies<TBigNumber>, address: string);
    getBestOffer_: (sell_gem: string, buy_gem: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    sellAllAmount: (pay_gem: string, pay_amt: TBigNumber, buy_gem: string, min_fill_amount: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    sellAllAmount_: (pay_gem: string, pay_amt: TBigNumber, buy_gem: string, min_fill_amount: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    getBuyAmount_: (tokenToBuy: string, tokenToPay: string, amountToPay: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    getOffer_: (id: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<{
        pay_amt: TBigNumber;
        pay_gem: string;
        buy_amt: TBigNumber;
        buy_gem: string;
    }>;
    getWorseOffer_: (id: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    getPayAmount_: (tokenToPay: string, tokenToBuy: string, amountToBuy: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
}
export declare class Ownable<TBigNumber> extends Contract<TBigNumber> {
    constructor(dependencies: Dependencies<TBigNumber>, address: string);
    renounceOwnership: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    renounceOwnership_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    owner_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    transferOwnership: (newOwner: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    transferOwnership_: (newOwner: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
}
export declare class Pausable<TBigNumber> extends Contract<TBigNumber> {
    constructor(dependencies: Dependencies<TBigNumber>, address: string);
    unpause: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    unpause_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    paused_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<boolean>;
    renounceOwnership: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    renounceOwnership_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    pause: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    pause_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    owner_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<string>;
    transferOwnership: (newOwner: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    transferOwnership_: (newOwner: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
}
export declare class Peth<TBigNumber> extends Contract<TBigNumber> {
    constructor(dependencies: Dependencies<TBigNumber>, address: string);
    approve: (spender: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    approve_: (spender: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<boolean>;
    totalSupply_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    transferFrom: (from: string, to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    transferFrom_: (from: string, to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<boolean>;
    balanceOf_: (who: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    transfer: (to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    transfer_: (to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<boolean>;
    allowance_: (owner: string, spender: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
}
export declare class PullPayment<TBigNumber> extends Contract<TBigNumber> {
    constructor(dependencies: Dependencies<TBigNumber>, address: string);
    totalPayments_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    withdrawPayments: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    withdrawPayments_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    payments_: (arg0: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
}
export declare class Weth<TBigNumber> extends Contract<TBigNumber> {
    constructor(dependencies: Dependencies<TBigNumber>, address: string);
    approve: (spender: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    approve_: (spender: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<boolean>;
    totalSupply_: (options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    transferFrom: (from: string, to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    transferFrom_: (from: string, to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<boolean>;
    withdraw: (wad: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    withdraw_: (wad: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    balanceOf_: (who: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
    transfer: (to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<void>;
    transfer_: (to: string, value: TBigNumber, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<boolean>;
    deposit: (options?: {
        sender?: string | undefined;
        attachedEth?: TBigNumber | undefined;
    } | undefined) => Promise<void>;
    deposit_: (options?: {
        sender?: string | undefined;
        attachedEth?: TBigNumber | undefined;
    } | undefined) => Promise<void>;
    allowance_: (owner: string, spender: string, options?: {
        sender?: string | undefined;
    } | undefined) => Promise<TBigNumber>;
}
