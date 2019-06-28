import "./polyfill";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { createHashHistory } from "history";
import RedBox from "redbox-react";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { takeEvery, takeLatest, fork, call, put } from "redux-saga/effects";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { routerMiddleware, connectRouter } from "connected-react-router";
import { handleActions } from "redux-actions";
import Routes from "./router";

import zhCN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import { LocaleProvider } from "antd";
moment.locale("zh-cn");


const app = ((opts) => {
    opts = opts || {};
    const _history = opts.history || createHashHistory();
    const _models = [];
    let _routes = null;
    return {
        model,
        _store: null,
        _models,
        router,
        start,
    }

    function router(routes) {
        _routes = routes;
    }

    function model(model) {
        _models.push(model);
    }

    function start(container) {
        const sagaMiddleware = createSagaMiddleware();
        let reducers = {
            router: connectRouter(_history),
        };
        let sagas = [];
        _models.forEach(model => {
            reducers[model.namespace] = handleActions(reducerEnhancer(model.namespace, model.reducers || {}), model.state);
            if(model.effects) {
                sagas.push(getSaga(model.namespace, model.effects));
            }
        });

        // 初始化store
        const middlewares = [
            routerMiddleware(_history),
            sagaMiddleware,
            process.env.NODE_ENV === "development" && createLogger(),
        ].filter(Boolean);
        const enhancer = compose(
            applyMiddleware(...middlewares),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : args => args
        );
        const initialState = opts.initialState || {};
        const store = app.store = createStore(
            combineReducers({ ...reducers }), initialState, enhancer
        );
        
        sagas.forEach(sagaMiddleware.run);

        // 执行model中的监听函数
        _models.forEach(({ subscriptions }) => {
            if (subscriptions) {
                Object.values(subscriptions).forEach(func => {
                    func({ ...store, history: _history });
                });
            }
        });

        if(container) {
            render();
        } else {
            const Routes = _routes;
            return () => (
                <Provider store={store}>
                    {/* <LocaleProvider locale={zhCN}> */}
                        <Routes history={_history} />
                    {/* </LocaleProvider> */}
                </Provider>
            );
        }

        function reducerEnhancer(namespace, reducers) {
            const reducerEnhancer = {};
            Object.keys(reducers).forEach(key => {
                reducerEnhancer[`${namespace}/${key}`] = reducers[key];
            });
            return reducerEnhancer;
        }
        
        function getSaga(namespace, effects) {
            return function*() {
                for(const key in effects) {
                    if (Object.prototype.hasOwnProperty.call(effects, key)) {
                        const watcher = getWatcher(`${namespace}/${key}`, effects[key]);
                        yield fork(watcher);
                    }
                }
            }
        }    

        function getWatcher(k, saga) {
            let _saga = saga;
            let _type = "takeEvery";
            if (Array.isArray(saga)) {
                [ _saga, opts ] = saga;
                _type = opts.type;
            }

            function* sagaWithErrorCatch(...arg) {
                try {
                    yield _saga(...arg, { call, put });
                } catch (e) {
                    onError(e);
                }
            }

            if(_type === "watcher") {
                return sagaWithErrorCatch;
            } else if(_type === "takeEvery") {
                return function*() {
                    yield takeEvery(k, sagaWithErrorCatch);
                }
            } else {
                return function*() {
                    yield takeLatest(k, sagaWithErrorCatch);
                };
            }
        }

        function onError(e) {
            console.error(e);
        }

        function render() {
            ReactDOM.render(
                <Provider store={store}>
                    <Routes history={_history}></Routes>
                </Provider>,
                container
            );
        }
    }
})();


const context = require.context("./models", true, /\.js$/);
const keys = context.keys();
keys.forEach(key => {
    if(context(key)) {
        app.model(context(key).default);
    }
});
app.router(Routes);
app.start(document.getElementById("root"));

export default app._store;