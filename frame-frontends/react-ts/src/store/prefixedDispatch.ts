import { Dispatch, AnyAction } from "redux";
import prefixType from "./prefixType";
import { Model } from ".";


export default function prefixedDispatch(dispatch: Dispatch, model: Model) {
  return (action: AnyAction) => {
    const { type } = action;
    return dispatch({ ...action, type: prefixType(type, model) });
  };
}
