import { createStore, combineReducers } from "redux";

function initReducer(state = 0, action) {
    switch (action.type) {
        case "ADD":
            return ++state;
        default:
            return state;
    }
}

export default createStore(combineReducers({ init: initReducer }));
