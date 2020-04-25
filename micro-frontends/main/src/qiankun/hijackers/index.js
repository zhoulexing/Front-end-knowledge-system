/**
 * @author Kuitos
 * @since 2019-04-11
 */

import { noop } from "lodash";
import hijackDynamicAppend from "./dynamicHeadAppend";
import hijackHistoryListener from "./historyListener";
import hijackTimer from "./timer";
import hijackWindowListener from "./windowListener";

export function hijackAtMounting(appName, proxy) {
    return [
        hijackTimer(),
        hijackWindowListener(),
        hijackHistoryListener(),
        hijackDynamicAppend(appName, proxy),
    ];
}

export function hijackAtBootstrapping(appName, proxy) {
    return [
        process.env.NODE_ENV === "development"
            ? hijackDynamicAppend(appName, proxy, false)
            : () => () => noop,
    ];
}
