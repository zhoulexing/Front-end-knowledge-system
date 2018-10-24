import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { routerReducer, routerMiddleware } from "react-router-redux";
import { Provider } from "react-redux";
import createHistory from "history/createHashHistory";
import RouterConfig from "./router";

const history = createHistory();

const middleware = routerMiddleware(history);

const reducers = combineReducers({
    a: function(state = { a: "a" }) { return state; },
    b: function(state = { b: "b"} ) { return state; },
    router: routerReducer
});

const store = createStore(
    reducers,
    applyMiddleware(middleware)
);


ReactDOM.render(
    <Provider store={ store }>
        <RouterConfig history={ history }/>
    </Provider>, 
    document.querySelector("#root")
);