import { ConcurrentRoot, BatchedRoot } from "../../shared/ReactRootTags.js";
import { enableProfilerTimer } from "../../shared/ReactFeatureFlags.js";
import {
    NoMode,
    ConcurrentMode,
    ProfileMode,
    StrictMode,
    BatchedMode
} from "./ReactTypeOfMode.js";
import { isDevToolsPresent } from "./ReactFiberDevToolsHook";
import { NoEffect } from "../../shared/ReactSideEffectTags";
import { NoWork } from "./ReactFiberExpirationTime";
import { HostRoot } from "../../shared/ReactWorkTags";

let debugCounter;
if (__DEV__) {
    debugCounter = 1;
}

let hasBadMapPolyfill;
if (__DEV__) {
    hasBadMapPolyfill = false;
    try {
        const nonExtensibleObject = Object.preventExtensions({});
        const testMap = new Map([[nonExtensibleObject, null]]);
        const testSet = new Set([nonExtensibleObject]);
        testMap.set(0, 0);
        testSet.add(0);
    } catch (e) {
        hasBadMapPolyfill = true;
    }
}

export function createHostRootFiber(tag) {
    let mode;
    if (tag === ConcurrentRoot) {
        mode = ConcurrentMode | BatchedMode | StrictMode;
    } else if (tag === BatchedRoot) {
        mode = BatchedMode | StrictMode;
    } else {
        mode = NoMode;
    }

    if (enableProfilerTimer && isDevToolsPresent) {
        mode |= ProfileMode;
    }

    return createFiber(HostRoot, null, null, mode);
}

const createFiber = function(tag, pendingProps, key, mode) {
    return new FiberNode(tag, pendingProps, key, mode);
};

function FiberNode(tag, pendingProps, key, mode) {
    // Instance
    this.tag = tag;
    this.key = key;
    this.elementType = null;
    this.type = null;
    this.stateNode = null;

    // Fiber
    this.return = null;
    this.child = null;
    this.sibling = null;
    this.index = 0;

    this.ref = null;

    this.pendingProps = pendingProps;
    this.memoizedProps = null;
    this.updateQueue = null;
    this.memoizedState = null;
    this.dependencies = null;

    this.mode = mode;

    // Effects
    this.effectTag = NoEffect;
    this.nextEffect = null;

    this.firstEffect = null;
    this.lastEffect = null;

    this.expirationTime = NoWork;
    this.childExpirationTime = NoWork;

    this.alternate = null;

    if (enableProfilerTimer) {
        this.actualDuration = Number.NaN;
        this.actualStartTime = Number.NaN;
        this.selfBaseDuration = Number.NaN;
        this.treeBaseDuration = Number.NaN;

        this.actualDuration = 0;
        this.actualStartTime = -1;
        this.selfBaseDuration = 0;
        this.treeBaseDuration = 0;
    }

    if (__DEV__) {
        this._debugID = debugCounter++;
        this._debugSource = null;
        this._debugOwner = null;
        this._debugIsCurrentlyTiming = false;
        this._debugNeedsRemount = false;
        this._debugHookTypes = null;
        if (
            !hasBadMapPolyfill &&
            typeof Object.preventExtensions === "function"
        ) {
            Object.preventExtensions(this);
        }
    }
}
