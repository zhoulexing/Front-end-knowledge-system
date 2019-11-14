import { getPublicInstance } from "./ReactFiberHostConfig.js";
import { createFiberRoot } from "./ReactFiberRoot.js";
import { requestCurrentSuspenseConfig } from "./ReactFiberSuspenseConfig";
import {
    unbatchedUpdates,
    warnIfNotScopedWithMatchingAct,
    requestCurrentTime,
    scheduleWork,
    computeExpirationForFiber
} from "./ReactFiberWorkLoop";
import ReactFiberInstrumentation from "./ReactFiberInstrumentation";
import { get as getInstance } from "../../shared/ReactInstanceMap";
import { HostComponent, ClassComponent } from "../../shared/ReactWorkTags";
import {
    isContextProvider as isLegacyContextProvider,
    processChildContext
} from "./ReactFiberContext";
import { createUpdate } from "./ReactUpdateQueue";

export { unbatchedUpdates };

export function getPublicRootInstance(container) {
    const containerFiber = container.current;
    if (!containerFiber.child) {
        return null;
    }
    switch (containerFiber.child.tag) {
        case HostComponent:
            return getPublicInstance(containerFiber.child.stateNode);
        default:
            return containerFiber.child.stateNode;
    }
}

export function createContainer(containerInfo, tag, hydrate) {
    return createFiberRoot(containerInfo, tag, hydrate);
}

export function updateContainer(element, container, parentComponent, callback) {
    const current = container.current;
    // currentTime是用来计算expirationTime，expirationTime代表优先级
    const currentTime = requestCurrentTime();

    const suspenseConfig = requestCurrentSuspenseConfig();
    // 计算优先级expirationTime
    const expirationTime = computeExpirationForFiber(
        currentTime,
        current,
        suspenseConfig
    );

    return updateContainerAtExpirationTime(
        element,
        container,
        parentComponent,
        expirationTime,
        suspenseConfig,
        callback
    );
}

export function updateContainerAtExpirationTime(
    element,
    container,
    parentComponent,
    expirationTime,
    suspenseConfig,
    callback
) {
    // current即Fiber实例
    const current = container.current;

    const context = getContextForSubtree(parentComponent);
    if (container.context === null) {
        container.context = context;
    } else {
        container.pendingContext = context;
    }

    return scheduleRootUpdate(
        current,
        element,
        expirationTime,
        suspenseConfig,
        callback
    );
}

function scheduleRootUpdate(
    current,
    element,
    expirationTime,
    suspenseConfig,
    callback
) {
    const update = createUpdate(expirationTime, suspenseConfig);
    update.payload = { element };
    callback = callback === undefined ? null : callback;

    enqueueUpdate(current, update);
    scheduleWork(current, expirationTime);
    return expirationTime;
}

function getContextForSubtree(parentComponent) {
    if (!parentComponent) {
        return emptyContextObject;
    }

    const fiber = getInstance(parentComponent);
    const parentContext = findCurrentUnmaskedContext(fiber);

    if (fiber.tag === ClassComponent) {
        const Component = fiber.type;
        if (isLegacyContextProvider(Component)) {
            return processChildContext(fiber, Component, parentContext);
        }
    }

    return parentContext;
}
