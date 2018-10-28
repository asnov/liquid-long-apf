"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PolledValue {
    constructor(scheduler, fetcher, frequencyInMilliseconds, defaultValue) {
        this.listeners = [];
        this.scheduledTaskId = null;
        this.registerListener = (listener) => {
            this.listeners.push(listener);
        };
        this.shutdown = async () => {
            await this.outstandingFetch;
            // this is sketchy, it depends on this continuation getting executed after the `fetch` continuation. need to verify if that is standardized or not just lucky
            this.scheduler.cancelAll();
        };
        this.fetch = async () => {
            try {
                if (this.scheduledTaskId !== null)
                    this.scheduler.cancel(this.scheduledTaskId);
                const previousValue = this.lastKnownGood;
                this.outstandingFetch = this.fetcher();
                this.lastKnownGood = await this.outstandingFetch;
                this.outstandingFetch = null;
                this.listeners.forEach(listener => listener(this.lastKnownGood, previousValue));
                return this.lastKnownGood;
            }
            finally {
                this.scheduledTaskId = this.scheduler.schedule(this.frequencyInMilliseconds, this.fetch);
            }
        };
        this.scheduler = scheduler;
        this.fetcher = fetcher;
        this.frequencyInMilliseconds = frequencyInMilliseconds;
        this.lastKnownGood = defaultValue;
        this.outstandingFetch = this.fetch();
    }
    get cached() { return this.lastKnownGood; }
    get latest() { return this.outstandingFetch || this.fetch(); }
}
exports.PolledValue = PolledValue;
//# sourceMappingURL=polled-value.js.map