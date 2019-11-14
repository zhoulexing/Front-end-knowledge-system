import React from "react";

const ReactSharedInternals =
    React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

if (!ReactSharedInternals.hasOwnProperty("ReactCurrentDispatcher")) {
    ReactSharedInternals.ReactCurrentDispatcher = {
        current: null
    };
}
if (!ReactSharedInternals.hasOwnProperty("ReactCurrentBatchConfig")) {
    ReactSharedInternals.ReactCurrentBatchConfig = {
        suspense: null
    };
}

export default ReactSharedInternals;
