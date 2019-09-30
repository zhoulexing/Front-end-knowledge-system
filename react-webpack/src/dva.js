import { createHashHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { handleActions } from 'redux-actions';
import { createLogger } from 'redux-logger';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import {
    takeEvery, takeLatest, fork, call, put,
} from 'redux-saga/effects';
import {
    createStore, compose, applyMiddleware, combineReducers,
} from 'redux';


function dva(opts = {}) {
    const sagaMiddleware = createSagaMiddleware();
    const app = {
        _history: opts.history || createHashHistory(),
        _models: [],
        _store: {},
        model: model,
        start: start
    };

    function start(initialState = {}) {
        const reducers = getReducers(app._models, app._history);
        const sagas = getSagas(app._models);
        const middlewares = [
            routerMiddleware(app._history),
            sagaMiddleware,
            process.env.NODE_ENV === 'development' && createLogger(),
        ].filter(Boolean);
        const enhancer = compose(
            applyMiddleware(...middlewares),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : args => args,
        );
        app._store = createStore(
            combineReducers({ ...reducers }),
            initialState,
            enhancer,
        );
        sagas.forEach(sagaMiddleware.run);
        runSubscriptions(app._models);
    }

    // 执行model中的监听函数
    function runSubscriptions(models) {
        models.forEach(({ subscriptions }) => {
            if (subscriptions) {
                Object.values(subscriptions).forEach((func) => {
                    func({ ...app._store, history });
                });
            }
        });
    }

    // 获取reducers
    function getReducers(models, history) {
        const reducers = {
            router: connectRouter(history),
        };
        let _reducers = null;
        models.forEach((model) => {
            _reducers = reducerEnhancer(model.namespace, model.reducers);
            reducers[model.namespace] = handleActions(_reducers, model.state);
        });
        return reducers;
    }

    function reducerEnhancer(namespace, reducers) {
        const reducerEnhancer = {};
        if (reducers) {
            Object.keys(reducers).forEach((key) => {
                reducerEnhancer[`${namespace}/${key}`] = reducers[key];
            });
        }
        return reducerEnhancer;
    }    

    function model(m) {
        if(!app._models.some(item => item === m)) {
            app._models.push(m);
        }
    }

    function getSagas(models) {
        return models.map(model => getSaga(model.namespace, model.effects));
    }

    function getSaga(namespace, effects) {
        return function* () {
            for (const key in effects) {
                if (Object.prototype.hasOwnProperty.call(effects, key)) {
                    const watcher = getWatcher(namespace, key, effects[key]);
                    yield fork(watcher);
                }
            }
        };
    }
    
    function getWatcher(namespace, key, saga) {
        let _saga = saga;
        let _type = 'takeEvery';
    
        if (Array.isArray(saga)) {
            [_saga, opts] = saga;
            _type = opts.type;
        }
    
        function putEnhancer(namespace) {
            return function* (params) {
                if (params.type) {
                    params.type = `${namespace}/${params.type}`;
                }
                yield put(params);
            }
        }
    
        let _put = putEnhancer(namespace);
        function* sagaWithErrorCatch(...arg) {
            try {
                yield _saga(...arg, { call, put: _put });
            } catch (e) {
                onError(e);
            }
        }
    
        let k = `${namespace}/${key}`;
        if (_type === 'watcher') {
            return sagaWithErrorCatch;
        } if (_type === 'takeEvery') {
            return function* () {
                yield takeEvery(k, sagaWithErrorCatch);
            };
        }
        return function* () {
            yield takeLatest(k, sagaWithErrorCatch);
        };
    }
    
    function onError(e) {
        console.error(e);
    }

    return app;
}

export default dva;