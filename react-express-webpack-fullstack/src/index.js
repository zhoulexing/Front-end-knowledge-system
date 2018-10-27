import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { routerReducer, routerMiddleware } from "react-router-redux";
import createLogger from "redux-loger";
import { Provider } from "react-redux";
import createHistory from "history/createHashHistory";
import RouterConfig from "./router";

const history = createHistory();

const middlewares = [
    routerMiddleware(history),
    process.env.NODE_ENV === "development" && createLogger()
].filter(Boolean);
const enhancer = compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : args => args
);

const reducers = combineReducers({
    a: function(state = { a: "a" }) { return state; },
    b: function(state = { b: "b"} ) { return state; },
    router: routerReducer
});

const store = createStore(
    reducers,
    enhancer
);


ReactDOM.render(
    <Provider store={ store }>
        <RouterConfig history={ history }/>
    </Provider>, 
    document.querySelector("#root")
);