import { Dispatch } from 'redux';
import prefixedDispatch from "./prefixedDispatch";
import { SubscriptionsMapObject } from "./index.d";


export function run(subs: SubscriptionsMapObject, model: Model, store: any, history: History.PoorMansUnknown, onError: Function) {
    const funcs = [];
    const nonFuncs = [];
    for (const key in subs) {
        if (Object.prototype.hasOwnProperty.call(subs, key)) {
            const sub = subs[key];
            const unlistener = sub(
                {
                    dispatch: prefixedDispatch(store.dispatch, model) as Dispatch,
                    history: history,
                },
                onError,
            );
            if (typeof unlistener === "function") {
                funcs.push(unlistener);
            } else {
                nonFuncs.push(key);
            }
        }
    }
    return { funcs, nonFuncs };
}