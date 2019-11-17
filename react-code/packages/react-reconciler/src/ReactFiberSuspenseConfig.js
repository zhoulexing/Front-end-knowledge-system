import ReactSharedInternals from "../../shared/ReactSharedInternals";

const { ReactCurrentBatchConfig } = ReactSharedInternals;

export function requestCurrentSuspenseConfig() {
    return ReactCurrentBatchConfig.suspense;
}
