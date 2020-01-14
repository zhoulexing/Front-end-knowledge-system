import { Store, createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducers/index";
import { createLogger } from "redux-logger";
import { routerMiddleware } from "connected-react-router";
import { createHashHistory } from "history";
import { composeWithDevTools } from 'redux-devtools-extension';

export const history = createHashHistory();

const middlewares = composeWithDevTools([
    routerMiddleware(history),
    process.env.NODE_ENV === "development" && createLogger(),
].filter(Boolean));

const enhancer = compose(
    applyMiddleware(middlewares),
);

export function configureStore(initialState = {}): Store<any> {
    return createStore(reducers, initialState, enhancer) as Store<any, any>;
}
