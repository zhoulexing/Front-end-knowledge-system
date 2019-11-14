import { noTimeout } from "./ReactFiberHostConfig.js";
import { createHostRootFiber } from "./ReactFiber.js";
import { enableSchedulerTracing } from "../../shared/ReactFeatureFlags";
import { unstable_getThreadID } from "../../scheduler/tracing";

export const NoWork = 0;
export const Never = 1;

function FiberRootNode(containerInfo, tag, hydrate) {
    this.tag = tag;
    this.current = null;
    this.containerInfo = containerInfo;
    this.pendingChildren = null;
    this.pingCache = null;
    this.finishedExpirationTime = NoWork;
    this.finishedWork = null;
    this.timeoutHandle = noTimeout;
    this.context = null;
    this.pendingContext = null;
    this.hydrate = hydrate;
    this.firstBatch = null;
    this.callbackNode = null;
    this.callbackExpirationTime = NoWork;
    this.firstPendingTime = NoWork;
    this.lastPendingTime = NoWork;
    this.pingTime = NoWork;

    if (enableSchedulerTracing) {
        this.interactionThreadID = unstable_getThreadID();
        this.memoizedInteractions = new Set();
        this.pendingInteractionMap = new Map();
    }
}

export function createFiberRoot(containerInfo, tag, hydrate) {
    const root = new FiberRootNode(containerInfo, tag, hydrate);
    const uninitializedFiber = createHostRootFiber(tag);
    root.current = uninitializedFiber;
    uninitializedFiber.stateNode = root;
    return root;
}
