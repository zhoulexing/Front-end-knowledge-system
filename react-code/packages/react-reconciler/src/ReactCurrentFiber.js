import {
    HostRoot,
    HostPortal,
    HostText,
    Fragment,
    ContextProvider,
    ContextConsumer
} from "../../shared/ReactWorkTags";
import getComponentName from "../../shared/getComponentName";

export let phase = null;

function describeFiber(fiber) {
    switch (fiber.tag) {
        case HostRoot:
        case HostPortal:
        case HostText:
        case Fragment:
        case ContextProvider:
        case ContextConsumer:
            return "";
        default:
            const owner = fiber._debugOwner;
            const source = fiber._debugSource;
            const name = getComponentName(fiber.type);
            let ownerName = null;
            if (owner) {
                ownerName = getComponentName(owner.type);
            }
            return describeComponentFrame(name, source, ownerName);
    }
}

export function getStackByFiberInDevAndProd(workInProgress) {
    let info = "";
    let node = workInProgress;
    do {
        info += describeFiber(node);
        node = node.return;
    } while (node);
    return info;
}

export function setCurrentPhase(lifeCyclePhase) {
    if (__DEV__) {
        phase = lifeCyclePhase;
    }
}
