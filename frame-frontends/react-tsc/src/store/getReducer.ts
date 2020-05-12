import { handleActions } from "redux-actions";
import { ReducersMapObjectWithEnhancer } from "./index.d";


export default function getReducer(reducers: ReducersMapObjectWithEnhancer | undefined, state: any) {
    if(Array.isArray(reducers)) {
        return reducers[1](handleActions(reducers[0], state));
    }
    return handleActions(reducers || {}, state);
}