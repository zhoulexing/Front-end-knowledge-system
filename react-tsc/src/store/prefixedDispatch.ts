import prefixType from "./prefixType";
import { Dispatch, AnyAction } from "redux";
import { Model } from "./index.d";


export default function prefixedDispatch(dispatch: Dispatch, model: Model) {
    return (action: AnyAction) => {
        const { type } = action;
        return dispatch({ ...action, type: prefixType(type, model) });
    };
}
