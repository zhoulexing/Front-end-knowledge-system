import { handleActions } from "redux-actions";

type initialState = {};
const initialState = {};

export default handleActions(
    {
        "SETTING_TEST": (state: initialState, action?: any) => {
            return {
                ...state,
                ...action.payload
            }
        }
    },
    initialState
);

