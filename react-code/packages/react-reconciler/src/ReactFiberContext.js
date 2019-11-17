import { ClassComponent, HostRoot } from "../../shared/ReactWorkTags";
import { setCurrentPhase } from "./ReactCurrentFiber";

export const emptyContextObject = {};
if (__DEV__) {
    Object.freeze(emptyContextObject);
}

function findCurrentUnmaskedContext(fiber) {
    let node = fiber;
    do {
        switch (node.tag) {
            case HostRoot:
                return node.stateNode.context;
            case ClassComponent: {
                const Component = node.type;
                if (isContextProvider(Component)) {
                    return node.stateNode
                        .__reactInternalMemoizedMergedChildContext;
                }
                break;
            }
        }
        node = node.return;
    } while (node !== null);
}

function isContextProvider(type) {
    const childContextTypes = type.childContextTypes;
    return childContextTypes !== null && childContextTypes !== undefined;
}

function processChildContext(fiber, type, parentContext) {
    const instance = fiber.stateNode;
    const childContextTypes = type.childContextTypes;

    if (typeof instance.getChildContext !== "function") {
        if (__DEV__) {
            // TODO:
        }
        return parentContext;
    }

    let childContext;
    if (__DEV__) {
        setCurrentPhase("getChildContext");
    }
    startPhaseTimer(fiber, "getChildContext");
    childContext = instance.getChildContext();
    stopPhaseTimer();
    if (__DEV__) {
        setCurrentPhase(null);
    }
    for (let contextKey in childContext) {
        invariant(
            contextKey in childContextTypes,
            '%s.getChildContext(): key "%s" is not defined in childContextTypes.',
            getComponentName(type) || "Unknown",
            contextKey
        );
    }
    if (__DEV__) {
        const name = getComponentName(type) || "Unknown";
        checkPropTypes(
            childContextTypes,
            childContext,
            "child context",
            name,
            // In practice, there is one case in which we won't get a stack. It's when
            // somebody calls unstable_renderSubtreeIntoContainer() and we process
            // context from the parent component instance. The stack will be missing
            // because it's outside of the reconciliation, and so the pointer has not
            // been set. This is rare and doesn't matter. We'll also remove that API.
            getCurrentFiberStackInDev
        );
    }

    return { ...parentContext, ...childContext };
}

export { findCurrentUnmaskedContext, isContextProvider, processChildContext };
