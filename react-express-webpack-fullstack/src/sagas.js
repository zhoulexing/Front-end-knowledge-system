import { delay } from "redux-saga";
import { takeEvery, put, fork, select } from "redux-saga/effects";

export function* incrementAsync(action) {
    const state = yield select();
    console.log(action, state);
    yield delay(1000);
    yield put({ type: "INCREMENT" });
}

export function* watchIncrementAsync() {
    yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

export default function* rootSaga() {
    yield fork(watchIncrementAsync);
}