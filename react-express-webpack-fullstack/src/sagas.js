import { delay } from "redux-saga";
import { takeEvery, put, fork, select } from "redux-saga/effects";
import request from "utils/request";

export function* incrementAsync(action) {
    const state = yield select();
    console.log(action, state);
    yield delay(1000);
    yield put({ type: "INCREMENT" });
}

export function* getDataAsync(action) {
    try {
        yield put({ type: "SHOW_LOADING" });
        const result = yield request("/api/demo/saveToMongo");
        yield put({ type: "GET_DATA", payload: result });
    } finally {
        yield put({ type: "HIDE_LOADING" });
    }
    
}

export function* watchIncrementAsync() {
    yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

export function* watchGetDataAsync() {
    yield takeEvery("GET_DATA_ASYNC", getDataAsync);
}

export default function* rootSaga() {
    yield fork(watchIncrementAsync);
    yield fork(watchGetDataAsync);
}