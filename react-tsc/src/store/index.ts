import {
    createStore,
    applyMiddleware,
    combineReducers,
    Reducer,
} from "redux";
import { routerMiddleware, connectRouter } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import { ReduxCompatibleReducer } from "redux-actions";
import { Model, MiddlewareFunction } from "./index.d";
import { createHashHistory } from "history";
import getModels, { ModelMap } from "./getModels";
import getReducer from "./getReducer";
import getSaga from "./getSaga";
import { run as runSubscription } from "./subscription";

export type Options = {
    initialReducer?: Reducer;
    initialState?: Object;
    history?: History;
};


function onError(err?: Error) {
    if (err) {
        if (typeof err === "string") err = new Error(err);
        throw err;
    }
}

function configureStore(opts?: Options, hooksAndOpts?: any) {
    const { initialReducer, history = createHashHistory(), initialState = {} } = opts || {};
    const { onEffect = [] } = hooksAndOpts || {};
    const models: ModelMap = getModels();
    const sagaMiddleware = createSagaMiddleware();
    const reducers: { [key: string]: ReduxCompatibleReducer<any, any> } = {
        ...initialReducer
    };
    const sagas: any = [];
    Object.values(models).forEach((model: Model) => {
        reducers[model.namespace] = getReducer(
            model.reducers,
            model.state
        ) as ReduxCompatibleReducer<any, any>;
        if (model.effects) {
            sagas.push(getSaga(model.effects, model, onError, onEffect, hooksAndOpts));
        }
    });

    const middlewares: MiddlewareFunction[] = [
        routerMiddleware(history as any),
        sagaMiddleware,
    ].filter(Boolean);
    if(process.env.NODE_ENV !== "production") {
        middlewares.push(createLogger());
    }
    const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
    const store: any = createStore(
        combineReducers({ ...reducers, router: connectRouter(history as any) }),
        initialState,
        enhancer
    );

    const unlisteners: { [key: string]: any } = {};
    let model: Model;
    for (const key in models) {
        model = models[key];
      if (model.subscriptions) {
        unlisteners[model.namespace] = runSubscription(model.subscriptions, model, store, history, onError);
      }
    }

    sagas.forEach(sagaMiddleware.run);
    return store;
}

export default configureStore;
