import { createStore, applyMiddleware, combineReducers } from "redux";
import { takeEvery, takeLatest, fork, put } from "redux-saga/effects";
import { routerMiddleware, connectRouter } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { handleActions } from "redux-actions";
import { createHashHistory } from "history";

const models: ModelsType = readModels();
const sagaMiddleware = createSagaMiddleware();

export const history = createHashHistory();

export default configureStore();

interface ModelsType {
    [propName:string]: any;
};

type MiddlewareFunction = (store: any) => (next: any) => (action: any) => any;

type Sagas = { 
    [key: string]: any;
};

type Reducers = {
    [key: string]: any;
};

function configureStore() {
    const reducers: Reducers = {};
    const sagas: Sagas = [];
    Object.values(models).forEach((model: any) => {
        reducers[model.namespace] = getReducer(model);
        sagas.push(getSaga(model));
    });
    const middlewares: Array<MiddlewareFunction> = [
        routerMiddleware(history),
        sagaMiddleware,
    ].filter(Boolean);
    if(process.env.NODE_ENV === "development") {
        middlewares.push(createLogger());
    }
    const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
    const _store: any = createStore(
        combineReducers({ ...reducers, router: connectRouter(history) }),
        enhancer
    );
    sagas.forEach(sagaMiddleware.run);
    return _store;
}

function getSaga({ namespace, effects }: ModelsType) {
    return function*() {
        for (const key in effects) {
            if (Object.prototype.hasOwnProperty.call(effects, key)) {
                const watcher = getWatcher(namespace, key, effects[key]);
                yield fork(watcher);
            }
        }
    };
}

function getWatcher(namespace: string, key: string, saga: any) {
    let _saga = saga;
    let _type = "takeEvery";
    let opts: any = {};

    if (Array.isArray(saga)) {
        [_saga, opts] = saga;
        _type = opts.type;
    }

    function onError(e: Error) {
        console.error(e);
    }

    function putEnhancer(namespace: string) {
        return function*(params: any) {
            if (params.type) {
                params.type = `${namespace}/${params.type}`;
            }
            yield put(params);
        };
    }

    let _put = putEnhancer(namespace);
    function* sagaWithErrorCatch(...arg: any) {
        try {
            yield _saga(...arg, { fork, put: _put });
        } catch (e) {
            onError(e);
        }
    }

    let k = `${namespace}/${key}`;
    if (_type === "watcher") {
        return sagaWithErrorCatch;
    }
    if (_type === "takeEvery") {
        return function*() {
            yield takeEvery(k, sagaWithErrorCatch);
        };
    }
    return function*() {
        yield takeLatest(k, sagaWithErrorCatch);
    };
}

function getReducer({ state, reducers, namespace }: ModelsType) {
    const reducerEnhancer: any = {};
    Object.keys(reducers).forEach((key: string) => {
        reducerEnhancer[`${namespace}/${key}`] = reducers[key];
    });
    return handleActions(reducerEnhancer, state);
}

function readModels() {
    const models: ModelsType = {};
    // 需要@types/webpack-env才能支持require.context
    const context = require.context("../models", true, /\.ts$/);
    const keys: string[] = context.keys();
    keys.forEach((key: string) => {
        if (context(key) && !key.indexOf("index")) {
            models[key] = context(key).default;
        }
    });
    return models;
}