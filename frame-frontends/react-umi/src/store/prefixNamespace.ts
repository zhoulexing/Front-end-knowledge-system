import { ReducersMapObject } from "redux";
import { Model } from ".";
import { NAMESPACE_SEP } from "./constants";


function prefix<T>(obj: { [key: string]: T }, namespace: string): { [key: string]: T } {
  return Object.keys(obj).reduce((memo: { [key: string]: T}, key: string) => {
    const newKey: string = `${namespace}${NAMESPACE_SEP}${key}`;
    memo[newKey] = obj[key];
    return memo;
  }, {});
}

export default function prefixNamespace(model: Model): Model {
  const { namespace, reducers, effects } = model;

  if (reducers) {
    if (Array.isArray(reducers)) {
      (model.reducers as ReducersMapObject[])[0] = prefix(reducers[0], namespace);
    } else {
      model.reducers = prefix(reducers, namespace);
    }
  }
  if (effects) {
    model.effects = prefix(effects, namespace);
  }

  return model;
}
