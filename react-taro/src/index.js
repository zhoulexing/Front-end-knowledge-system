import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {
  takeEvery, takeLatest, fork, call, put,
} from 'redux-saga/effects'
import models from './models/index'
import { handleActions } from 'redux-actions'

const sagaMiddleware = createSagaMiddleware()
const initialState = getInitialState()
const reducers = getReducers(models, history)
const sagas = getSagas(models)
const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose

const middlewares = [
  sagaMiddleware,
]

if (process.env.NODE_ENV === 'development' && process.env.TARO_ENV !== 'quickapp') {
  middlewares.push(require('redux-logger').createLogger())
}

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
)

function getInitialState() {
  return {};
}

function getReducers(models) {
  const reducers = {};
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
      if(params.type) {
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

export default function configStore() {
  const store = createStore(combineReducers({ ...reducers }), initialState, enhancer)
  sagas.forEach(sagaMiddleware.run);
  return store
}
