/// <reference types="node" />
export declare abstract class Scheduler {
    delay: (milliseconds: number) => Promise<void>;
    abstract schedule: (milliseconds: number, scheduledTask: () => void) => any;
    abstract cancel: (scheduledTaskId: any) => void;
    abstract cancelAll: () => void;
}
export declare class TimeoutScheduler extends Scheduler {
    private readonly scheduledTaskIds;
    private stopped;
    schedule: (milliseconds: number, scheduledTask: () => void) => NodeJS.Timer;
    cancel: (scheduledTaskId: NodeJS.Timer) => void;
    cancelAll: () => void;
}
