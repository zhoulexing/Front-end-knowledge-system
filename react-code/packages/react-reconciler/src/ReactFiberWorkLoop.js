import { requestCurrentSuspenseConfig } from "./ReactFiberSuspenseConfig";
import {
    NoWork,
    Sync,
    Never,
    msToExpirationTime,
    computeInteractiveExpiration,
    computeAsyncExpiration,
    computeSuspenseExpiration,
    LOW_PRIORITY_EXPIRATION,
    Batched
} from "./ReactFiberExpirationTime";
import warningWithoutStack from "../../shared/warningWithoutStack";
import { getStackByFiberInDevAndProd } from "./ReactCurrentFiber";
import {
    NoMode,
    StrictMode,
    ProfileMode,
    BatchedMode,
    ConcurrentMode
} from "./ReactTypeOfMode";
import {
    flushSyncCallbackQueue,
    now,
    getCurrentPriorityLevel
} from "./SchedulerWithReactIntegration";
import { recordScheduleUpdate } from "./ReactDebugFiberPerf";

const NoContext = /*                    */ 0b000000;
const BatchedContext = /*               */ 0b000001;
const EventContext = /*                 */ 0b000010;
const DiscreteEventContext = /*         */ 0b000100;
const LegacyUnbatchedContext = /*       */ 0b001000;
const RenderContext = /*                */ 0b010000;
const CommitContext = /*                */ 0b100000;

let executionContext = NoContext;
let currentEventTime = NoWork;

export function unbatchedUpdates(fn) {
    const prevExecutionContext = executionContext;
    executionContext &= ~BatchedContext;
    executionContext |= LegacyUnbatchedContext;
    try {
        return fn();
    } finally {
        // TODO:
    }
}

export function requestCurrentTime() {
    if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
        return msToExpirationTime(now());
    }
    if (currentEventTime !== NoWork) {
        return currentEventTime;
    }
    currentEventTime = msToExpirationTime(now());
    return currentEventTime;
}

export function warnIfNotScopedWithMatchingAct(fiber) {
    if (__DEV__) {
        if (
            warnsIfNotActing === true &&
            IsSomeRendererActing.current === true &&
            IsThisRendererActing.current !== true
        ) {
            warningWithoutStack(
                false,
                "It looks like you're using the wrong act() around your test interactions.\n" +
                    "Be sure to use the matching version of act() corresponding to your renderer:\n\n" +
                    "// for react-dom:\n" +
                    "import {act} from 'react-dom/test-utils';\n" +
                    "//...\n" +
                    "act(() => ...);\n\n" +
                    "// for react-test-renderer:\n" +
                    "import TestRenderer from 'react-test-renderer';\n" +
                    "const {act} = TestRenderer;\n" +
                    "//...\n" +
                    "act(() => ...);" +
                    "%s",
                getStackByFiberInDevAndProd(fiber)
            );
        }
    }
}

export function computeExpirationForFiber(currentTime, fiber, suspenseConfig) {
    const mode = fiber.mode;
    if ((mode & BatchedMode) === NoMode) {
        return Sync;
    }
    // TODO:
    return Sync;
}

export function flushPassiveEffects() {
    if (rootWithPendingPassiveEffects === null) {
        return false;
    }
    const root = rootWithPendingPassiveEffects;
    const expirationTime = pendingPassiveEffectsExpirationTime;
    rootWithPendingPassiveEffects = null;
    pendingPassiveEffectsExpirationTime = NoWork;

    let prevInteractions = null;
    if (enableSchedulerTracing) {
        prevInteractions = __interactionsRef.current;
        __interactionsRef.current = root.memoizedInteractions;
    }

    const prevExecutionContext = executionContext;
    executionContext |= CommitContext;

    let effect = root.current.firstEffect;
    while (effect !== null) {
        if (__DEV__) {
            setCurrentDebugFiberInDEV(effect);
            invokeGuardedCallback(null, commitPassiveHookEffects, null, effect);
            if (hasCaughtError()) {
                const error = clearCaughtError();
                captureCommitPhaseError(effect, error);
            }
            resetCurrentDebugFiberInDEV();
        } else {
            try {
                commitPassiveHookEffects(effect);
            } catch (error) {
                captureCommitPhaseError(effect, error);
            }
        }
        effect = effect.nextEffect;
    }

    if (enableSchedulerTracing) {
        __interactionsRef.current = prevInteractions;
        finishPendingInteractions(root, expirationTime);
    }

    executionContext = prevExecutionContext;
    flushSyncCallbackQueue();

    nestedPassiveUpdateCount =
        rootWithPendingPassiveEffects === null
            ? 0
            : nestedPassiveUpdateCount + 1;

    return true;
}

function checkForInterruption(fiberThatReceivedUpdate, updateExpirationTime) {
    if (
        enableUserTimingAPI &&
        workInProgressRoot !== null &&
        updateExpirationTime > renderExpirationTime
    ) {
        interruptedBy = fiberThatReceivedUpdate;
    }
}

export function scheduleUpdateOnFiber(fiber, expirationTime) {
    // 更新优先级
    const root = markUpdateTimeFromFiberToRoot(fiber, expirationTime);
    if (root === null) {
        return;
    }

    root.pingTime = NoWork;

    checkForInterruption(fiber, expirationTime);
    recordScheduleUpdate();

    // TODO: computeExpirationForFiber also reads the priority. Pass the
    // priority as an argument to that function and this one.
    const priorityLevel = getCurrentPriorityLevel();

    if (expirationTime === Sync) {
        if (
            // Check if we're inside unbatchedUpdates
            (executionContext & LegacyUnbatchedContext) !== NoContext &&
            // Check if we're not already rendering
            (executionContext & (RenderContext | CommitContext)) === NoContext
        ) {
            // Register pending interactions on the root to avoid losing traced interaction data.
            schedulePendingInteractions(root, expirationTime);

            // This is a legacy edge case. The initial mount of a ReactDOM.render-ed
            // root inside of batchedUpdates should be synchronous, but layout updates
            // should be deferred until the end of the batch.
            let callback = renderRoot(root, Sync, true);
            while (callback !== null) {
                callback = callback(true);
            }
        } else {
            scheduleCallbackForRoot(root, ImmediatePriority, Sync);
            if (executionContext === NoContext) {
                // Flush the synchronous work now, wnless we're already working or inside
                // a batch. This is intentionally inside scheduleUpdateOnFiber instead of
                // scheduleCallbackForFiber to preserve the ability to schedule a callback
                // without immediately flushing it. We only do this for user-initated
                // updates, to preserve historical behavior of sync mode.
                flushSyncCallbackQueue();
            }
        }
    } else {
        scheduleCallbackForRoot(root, priorityLevel, expirationTime);
    }

    if (
        (executionContext & DiscreteEventContext) !== NoContext &&
        // Only updates at user-blocking priority or greater are considered
        // discrete, even inside a discrete event.
        (priorityLevel === UserBlockingPriority ||
            priorityLevel === ImmediatePriority)
    ) {
        // This is the result of a discrete event. Track the lowest priority
        // discrete update per root so we can flush them early, if needed.
        if (rootsWithPendingDiscreteUpdates === null) {
            rootsWithPendingDiscreteUpdates = new Map([[root, expirationTime]]);
        } else {
            const lastDiscreteTime = rootsWithPendingDiscreteUpdates.get(root);
            if (
                lastDiscreteTime === undefined ||
                lastDiscreteTime > expirationTime
            ) {
                rootsWithPendingDiscreteUpdates.set(root, expirationTime);
            }
        }
    }
}
export const scheduleWork = scheduleUpdateOnFiber;
