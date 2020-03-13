import { Model } from "./index.d";
import invariant from "invariant";
import isPlainObject from "lodash/isPlainObject";
import prefixNamespace from "./prefixNamespace";

export interface ModelMap {
    [propName: string]: Model;
}

export default function getModels() {
    const models: ModelMap = {};
    // 需要@types/webpack-env才能支持require.context
    const context = require.context("../models", true, /\.ts$/);
    const keys: string[] = context.keys();

    let model = null;
    keys.forEach((key: string) => {
        model = context(key).default;
        if (context(key) && model) {
            if (process.env.NODE_ENV !== "production") {
                checkModel(model, models);
            }
            models[key] = prefixNamespace({ ...model});
        }
    });
    return models;
}

function checkModel(m: Model, existModels: ModelMap) {
    const { namespace, reducers, effects, subscriptions } = m;
    // namespace 必须被定义
    invariant(namespace, `[app.model] namespace should be defined`);

    // 并且是字符串
    invariant(
        typeof namespace === "string",
        `[app.model] namespace should be string, but got ${typeof namespace}`
    );

    // 并且唯一
    invariant(
        existModels.hasOwnProperty(namespace),
        `[app.model] namespace should be unique`
    );

    // state 可以为任意值

    // reducers 可以为空，PlainObject 或者数组
    if (reducers) {
        invariant(
            isPlainObject(reducers) || Array.isArray(reducers),
            `[app.model] reducers should be plain object or array, but got ${typeof reducers}`
        );
        // 数组的 reducers 必须是 [Object, Function] 的格式
        invariant(
            !Array.isArray(reducers) ||
                (isPlainObject(reducers[0]) && isFunction(reducers[1])),
            `[app.model] reducers with array should be [Object, Function]`
        );
    }

    // effects 可以为空，PlainObject
    if (effects) {
        invariant(
            isPlainObject(effects),
            `[app.model] effects should be plain object, but got ${typeof effects}`
        );
    }

    if (subscriptions) {
        // subscriptions 可以为空，PlainObject
        invariant(
            isPlainObject(subscriptions),
            `[app.model] subscriptions should be plain object, but got ${typeof subscriptions}`
        );

        // subscription 必须为函数
        invariant(
            isAllFunction(subscriptions),
            `[app.model] subscription should be function`
        );
    }
}

function isAllFunction(obj: Record<string, any>) {
    if (obj) {
        return Object.keys(obj).every(key => isFunction(obj[key]));
    }
    return false;
}

function isFunction(obj: any) {
    return typeof obj === "function";
}
