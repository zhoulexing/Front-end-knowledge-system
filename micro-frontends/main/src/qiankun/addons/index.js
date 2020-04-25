import { concat, mergeWith } from "lodash";

import getRuntimePublicPathAddOn from "./runtimePublicPath";

export default function getAddOns(global, publicPath) {
    return mergeWith(
        {},
        getRuntimePublicPathAddOn(global, publicPath),
        (v1, v2) => concat(v1 ?? [], v2 ?? [])
    );
}
