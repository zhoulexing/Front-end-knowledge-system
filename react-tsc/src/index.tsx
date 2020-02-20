import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { takeEvery, takeLatest, fork, put } from "redux-saga/effects";
import { routerMiddleware, connectRouter } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import { createHashHistory } from "history";
import { createLogger } from "redux-logger";
import { handleActions } from "redux-actions";
import { composeWithDevTools } from "redux-devtools-extension";

const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();
const models = readModels();
const store = getStore(models);


let render = () => {
    const Routes = require("./router").default;
    ReactDOM.render(
        <Provider store={store}>
            <Routes history={history} />
        </Provider>,
        document.getElementById("root")
    );
}

render();

if (module.hot) {
    const renderNormally = render;
    const renderException = (error: Error) => {
        const RedBox = require("redbox-react");
        ReactDOM.render(
            <RedBox error={error} />,
            document.getElementById("root")
        );
    };
    render = () => {
        try {
            renderNormally();
        } catch (error) {
            renderException(error);
        }
    };
    module.hot.accept("./router", () => {
        render();
    });
}

function readModels() {
    const models: any = {};
    // 需要@types/webpack-env
    const context = require.context("./models", true, /\.ts$/);
    const keys = context.keys();
    keys.forEach((key: string) => {
        if (context(key)) {
            models[key] = context(key).default;
        }
    });
    return models;
}

function getStore(models: any, initialState = {}) {
    const reducers: any = {};
    const sagas: any = [];
    Object.values(models).forEach((model: any) => {
        reducers[model.namespace] = getReducer(model);
        sagas.push(getSaga(model));
    });
    const middlewares: any = [
        routerMiddleware(history),
        sagaMiddleware,
        process.env.NODE_ENV === "development" && createLogger()
    ].filter(Boolean);
    const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
    const _store = createStore(
        combineReducers({ ...reducers, router: connectRouter(history) }),
        initialState,
        enhancer
    );
    sagas.forEach(sagaMiddleware.run);
    return _store;
}

function getSaga({ namespace, effects }: any) {
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

    function onError(e: any) {
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

function getReducer({ state, reducers, namespace }: any) {
    const reducerEnhancer: any = {};
    Object.keys(reducers).forEach((key: string) => {
        reducerEnhancer[`${namespace}/${key}`] = reducers[key];
    });
    return handleActions(reducerEnhancer, state);
}
