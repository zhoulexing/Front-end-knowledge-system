// import './polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { createHashHistory } from 'history';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {
    takeEvery, takeLatest, fork, call, put,
} from 'redux-saga/effects';
import {
    createStore, compose, applyMiddleware, combineReducers,
} from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { handleActions } from 'redux-actions';

import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { LocaleProvider } from 'antd';

moment.locale('zh-cn');

const sagaMiddleware = createSagaMiddleware();
const history = createHashHistory();
const models = getModels();
const initialState = getInitialState();
const reducers = getReducers(models, history);
const sagas = getSagas(models);


// 初始化store
const middlewares = [
    routerMiddleware(history),
    sagaMiddleware,
    process.env.NODE_ENV === 'development' && createLogger(),
].filter(Boolean);
const enhancer = compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : args => args,
);
const store = createStore(
    combineReducers({ ...reducers }),
    initialState,
    enhancer,
);
sagas.forEach(sagaMiddleware.run);
runSubscriptions(models);


render();
if (module.hot) {
    const renderNormally = render;
    const renderException = (error) => {
        const RedBox = require('redbox-react');
        ReactDOM.render(<RedBox error={error} />, document.getElementById('root'));
    };
    render = () => {
        try {
            renderNormally();
        } catch (error) {
            renderException(error);
        }
    };
    module.hot.accept('./router', () => {
        render();
    });
}


// module.hot.accept("../reducers", () => {
//     const nextRootReducer = require("../reducers/index");
//     store.replaceReducer(nextRootReducer);
// });
// module.hot.accept("../sagas", () => {
//     const getNewSagas = require("../sagas");
//     sagaTask.cancel()
//     sagaTask.done.then(() => {
//         sagaTask = sagaMiddleware.run(function* replacedSaga(action) {
//             yield getNewSagas()
//         })
//     })
// });


function render() {
    const Routes = require('./router').default;
    ReactDOM.render(
        <Provider store={store}>
            <LocaleProvider locale={zhCN}>
                <Routes history={history} />
            </LocaleProvider>
        </Provider>,
        document.getElementById('root'),
    );
}

// 执行model中的监听函数
function runSubscriptions(models) {
    models.forEach(({ subscriptions }) => {
        if (subscriptions) {
            Object.values(subscriptions).forEach((func) => {
                func({ ...store, history });
            });
        }
    });
}

function getModels() {
    const context = require.context('./models', true, /\.js$/);
    const keys = context.keys();
    const models = [];
    keys.forEach((key) => {
        if (context(key)) {
            models.push(context(key).default);
        }
    });
    return models;
}

function getInitialState() {
    return {};
}

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

export default store;
