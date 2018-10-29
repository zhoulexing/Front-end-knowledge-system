import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";


export default combineReducers({
    test: function(state = { count: 2 }, action) { 
        switch(action.type) {
            case "INCREMENT":
                state.count += 1;
                return state;
            default:
                return state;
        }
    },
    router: routerReducer 
});