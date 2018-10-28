import { Scheduler } from './scheduler';
export declare class PolledValue<TValue> {
    private readonly scheduler;
    private readonly fetcher;
    private readonly frequencyInMilliseconds;
    private lastKnownGood;
    private outstandingFetch;
    private readonly listeners;
    private scheduledTaskId;
    constructor(scheduler: Scheduler, fetcher: () => Promise<TValue>, frequencyInMilliseconds: number, defaultValue: TValue);
    readonly cached: TValue;
    readonly latest: Promise<TValue>;
    registerListener: (listener: (newValue: TValue, oldValue: TValue) => void) => void;
    shutdown: () => Promise<void>;
    private fetch;
}
