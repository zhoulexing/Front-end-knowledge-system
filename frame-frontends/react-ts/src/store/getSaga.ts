import {
    EffectsMapObject,
    Effect,
    EffectWithType,
    Model,
    EffectsCommandMap
} from ".";
import * as sagaEffects from "redux-saga/effects";
import { NAMESPACE_SEP } from "./constants";
import prefixType from "./prefixType";
import { AnyAction } from "redux";

export default function getSaga(
    effects: EffectsMapObject,
    model: Model,
    onError: Function,
    onEffect: Function[],
    opts = {}
) {
    return function*() {
        for (const key in effects) {
            const watcher = getWatcher(
                key,
                effects[key],
                model,
                onError,
                onEffect,
                opts
            );
            const task = yield sagaEffects.fork(watcher);
            yield sagaEffects.fork(function*() {
                yield sagaEffects.take(`${model.namespace}${NAMESPACE_SEP}@@CANCEL_EFFECTS`);
                yield sagaEffects.cancel(task);
            });
        }
    };
}

function getWatcher(
    key: any,
    _effect: Effect | EffectWithType,
    model: Model,
    onError: Function,
    onEffect: Function[],
    opts: any
) {
    let effect = _effect;
    let type = "takeEvery";
    let ms: number;
    let delayMs: number;

    if (Array.isArray(_effect)) {
        [effect] = _effect;
        opts = _effect[1];
        if (opts && opts.type) {
            type = opts.type;
            if (type === "throttle") {
                ms = opts.ms;
            }
            if (type === "poll") {
                delayMs = opts.delay;
            }
        }
    }

    const sagaWithOnEffect: any = applyOnEffect(
        onEffect,
        sagaWithCatch,
        model,
        key
    );

    switch (type) {
        case "watcher":
            return sagaWithCatch;
        case "takeLatest":
            return function*() {
                yield sagaEffects.takeLatest(key, sagaWithOnEffect);
            };
        case "throttle":
            return function*() {
                yield sagaEffects.throttle(ms, key, sagaWithOnEffect);
            };
        case "poll":
            return function*() {
                function delay(timeout: number) {
                    return new Promise(resolve => setTimeout(resolve, timeout));
                }
                function* pollSagaWorker(
                    sagaEffects: EffectsCommandMap,
                    action: AnyAction
                ) {
                    const { call } = sagaEffects;
                    while (true) {
                        yield call(sagaWithOnEffect, action);
                        yield call(delay, delayMs);
                    }
                }
                const { call, take, race } = sagaEffects;
                while (true) {
                    const action = yield take(`${key}-start`);
                    yield race([
                        call(pollSagaWorker, sagaEffects, action),
                        take(`${key}-stop`)
                    ]);
                }
            };
        default:
            return function*() {
                yield sagaEffects.takeEvery(key, sagaWithOnEffect);
            };
    }

    function* sagaWithCatch(...args: any) {
        console.log("args:", args, effect);
        try {
            yield sagaEffects.put({ type: `${key}${NAMESPACE_SEP}@@start` });
            yield (effect as Effect)(...args, createEffects(model));
            yield sagaEffects.put({ type: `${key}${NAMESPACE_SEP}@@end` });
        } catch (e) {
            onError(e);
        }
    }
}

function createEffects(model: Model) {
    function put(action: AnyAction) {
        const { type } = action;
        return sagaEffects.put({ ...action, type: prefixType(type, model) });
    }

    function take(type: string | string[]) {
        if (typeof type === "string") {
            return sagaEffects.take(prefixType(type, model));
        } else if (Array.isArray(type)) {
            return sagaEffects.take(
                type.map(t => {
                    if (typeof t === "string") {
                        return prefixType(t, model);
                    }
                    return t;
                })
            );
        } else {
            return sagaEffects.take(type);
        }
    }
    return { ...sagaEffects, put, take };
}

function applyOnEffect(
    fns: Function[],
    effect: Function,
    model: Model,
    key: string
) {
    for (const fn of fns) {
        effect = fn(effect, sagaEffects, model, key);
    }
    return effect;
}
