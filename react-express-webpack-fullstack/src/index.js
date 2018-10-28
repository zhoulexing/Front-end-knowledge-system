import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { routerReducer, routerMiddleware } from "react-router-redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import createHistory from "history/createHashHistory";
import RouterConfig from "./router";
import rootSaga from "./saga";

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    process.env.NODE_ENV === "development" && createLogger()
].filter(Boolean);

const enhancer = compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : args => args
);

const reducers = combineReducers({
    test: function(state = { count: 1 }, action) { 
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

const store = createStore(
    reducers,
    enhancer
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={ store }>
        <RouterConfig history={ history }/>
    </Provider>, 
    document.querySelector("#root")
);