import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";


export default combineReducers({
    test: function(state = {}, { type, payload }) { 
        switch(type) {
            case "INCREMENT":
                state.count += 1;
                return state;
            case "GET_DATA":
                state.result = payload;
                return state;
            case "SHOW_LOADING":
                state.loading = 1;
                return { ...state };
            case "HIDE_LOADING":
                state.loading = 0;
                return state;
            default:
                return state;
        }
    },
    router: routerReducer 
});