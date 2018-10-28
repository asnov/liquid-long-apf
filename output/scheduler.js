"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Scheduler {
    constructor() {
        this.delay = (milliseconds) => {
            return new Promise(resolve => {
                this.schedule(milliseconds, () => resolve());
            });
        };
    }
}
exports.Scheduler = Scheduler;
class TimeoutScheduler extends Scheduler {
    constructor() {
        super(...arguments);
        this.scheduledTaskIds = new Set();
        this.stopped = false;
        this.schedule = (milliseconds, scheduledTask) => {
            let scheduledTaskId;
            scheduledTaskId = setTimeout(() => { this.scheduledTaskIds.delete(scheduledTaskId); scheduledTask(); }, milliseconds);
            this.scheduledTaskIds.add(scheduledTaskId);
            return scheduledTaskId;
        };
        this.cancel = (scheduledTaskId) => {
            clearTimeout(scheduledTaskId);
            this.scheduledTaskIds.delete(scheduledTaskId);
        };
        this.cancelAll = () => {
            this.scheduledTaskIds.forEach(scheduledTaskId => clearTimeout(scheduledTaskId));
        };
    }
}
exports.TimeoutScheduler = TimeoutScheduler;
//# sourceMappingURL=scheduler.js.map