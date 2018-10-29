import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { routerMiddleware } from "react-router-redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import RedBox from "redbox-react";
import createHistory from "history/createHashHistory";
import reducers from "./reducers";
import rootSaga from "./sagas";

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

const store = createStore(
    reducers,
    enhancer
);

sagaMiddleware.run(rootSaga);

let render = () => { 
    const RouterConfig = require("./router").default;
    ReactDOM.render(
        <Provider store={ store }>
            <RouterConfig history={ history }/>
        </Provider>, 
        document.querySelector("#root")
    );
}
render();

if(module.hot) {
    const renderNormally = render;
    const renderException = (error) => {
        ReactDOM.render(<RedBox error={error}/>, document.querySelector("#root"));
    };
    render = () => {
        try {
            renderNormally();
        } catch (error) {
            renderException(error);
        }
    };
    module.hot.accept("./router", () => {
        render()
    });
}