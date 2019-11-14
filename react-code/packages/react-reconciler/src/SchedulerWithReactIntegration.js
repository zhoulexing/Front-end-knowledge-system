import * as Scheduler from "../../scheduler";

const {
    unstable_runWithPriority: Scheduler_runWithPriority,
    unstable_scheduleCallback: Scheduler_scheduleCallback,
    unstable_cancelCallback: Scheduler_cancelCallback,
    unstable_shouldYield: Scheduler_shouldYield,
    unstable_requestPaint: Scheduler_requestPaint,
    unstable_now: Scheduler_now,
    unstable_getCurrentPriorityLevel: Scheduler_getCurrentPriorityLevel,
    unstable_ImmediatePriority: Scheduler_ImmediatePriority,
    unstable_UserBlockingPriority: Scheduler_UserBlockingPriority,
    unstable_NormalPriority: Scheduler_NormalPriority,
    unstable_LowPriority: Scheduler_LowPriority,
    unstable_IdlePriority: Scheduler_IdlePriority
} = Scheduler;

let immediateQueueCallbackNode = null;
let isFlushingSyncQueue = false;
let syncQueue = null;
let initialTimeMs = Scheduler_now();

export const ImmediatePriority = 99;
export const UserBlockingPriority = 98;
export const NormalPriority = 97;
export const LowPriority = 96;
export const IdlePriority = 95;

export function flushSyncCallbackQueue() {
    if (immediateQueueCallbackNode !== null) {
        Scheduler_cancelCallback(immediateQueueCallbackNode);
    }
    flushSyncCallbackQueueImpl();
}

function flushSyncCallbackQueueImpl() {
    if (!isFlushingSyncQueue && syncQueue !== null) {
        // Prevent re-entrancy.
        isFlushingSyncQueue = true;
        let i = 0;
        try {
            const isSync = true;
            const queue = syncQueue;
            runWithPriority(ImmediatePriority, () => {
                for (; i < queue.length; i++) {
                    let callback = queue[i];
                    do {
                        callback = callback(isSync);
                    } while (callback !== null);
                }
            });
            syncQueue = null;
        } catch (error) {
            // If something throws, leave the remaining callbacks on the queue.
            if (syncQueue !== null) {
                syncQueue = syncQueue.slice(i + 1);
            }
            // Resume flushing in the next tick
            Scheduler_scheduleCallback(
                Scheduler_ImmediatePriority,
                flushSyncCallbackQueue
            );
            throw error;
        } finally {
            isFlushingSyncQueue = false;
        }
    }
}

export function runWithPriority(reactPriorityLevel, fn) {
    const priorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
    return Scheduler_runWithPriority(priorityLevel, fn);
}

function reactPriorityToSchedulerPriority(reactPriorityLevel) {
    switch (reactPriorityLevel) {
        case ImmediatePriority:
            return Scheduler_ImmediatePriority;
        case UserBlockingPriority:
            return Scheduler_UserBlockingPriority;
        case NormalPriority:
            return Scheduler_NormalPriority;
        case LowPriority:
            return Scheduler_LowPriority;
        case IdlePriority:
            return Scheduler_IdlePriority;
        default:
            console.log(false, "Unknown priority level.");
    }
}

export function getCurrentPriorityLevel() {
    switch (Scheduler_getCurrentPriorityLevel()) {
        case Scheduler_ImmediatePriority:
            return ImmediatePriority;
        case Scheduler_UserBlockingPriority:
            return UserBlockingPriority;
        case Scheduler_NormalPriority:
            return NormalPriority;
        case Scheduler_LowPriority:
            return LowPriority;
        case Scheduler_IdlePriority:
            return IdlePriority;
        default:
            console.log(false, "Unknown priority level.");
    }
}

export const now =
    initialTimeMs < 10000
        ? Scheduler_now
        : () => Scheduler_now() - initialTimeMs;

