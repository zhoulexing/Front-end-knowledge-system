import { enableUserTimingAPI } from "../../shared/ReactFeatureFlags";

let currentPhase = null;
let currentPhaseFiber = null;
let hasScheduledUpdateInCurrentPhase = false;

const supportsUserTiming =
    typeof performance !== "undefined" &&
    typeof performance.mark === "function" &&
    typeof performance.clearMarks === "function" &&
    typeof performance.measure === "function" &&
    typeof performance.clearMeasures === "function";

export function startPhaseTimer(fiber, phase) {
    if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
            return;
        }
        clearPendingPhaseMeasurement();
        if (!beginFiberMark(fiber, phase)) {
            return;
        }
        currentPhaseFiber = fiber;
        currentPhase = phase;
    }
}

export function stopPhaseTimer() {
    if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
            return;
        }
        if (currentPhase !== null && currentPhaseFiber !== null) {
            const warning = hasScheduledUpdateInCurrentPhase
                ? "Scheduled a cascading update"
                : null;
            endFiberMark(currentPhaseFiber, currentPhase, warning);
        }
        currentPhase = null;
        currentPhaseFiber = null;
    }
}

export function recordScheduleUpdate() {
    if (enableUserTimingAPI) {
        if (isCommitting) {
            hasScheduledUpdateInCurrentCommit = true;
        }
        if (
            currentPhase !== null &&
            currentPhase !== "componentWillMount" &&
            currentPhase !== "componentWillReceiveProps"
        ) {
            hasScheduledUpdateInCurrentPhase = true;
        }
    }
}
