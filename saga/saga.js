import { takeEvery } from 'redux-saga'
import { put, call, take } from 'redux-saga/effects'

const delay = ms => new Promise(resolve => {console.log(ms); setTimeout(resolve("Hello World"), 5000)})

// Our worker Saga: 将异步执行 increment 任务
export function* incrementAsync() {
    try {
        const data = yield call(delay, 5000);
        console.log("data:", data);
        yield put({ type: 'INCREMENT' });
    } catch(e) {
    
    }
    
}

export default function* watchIncrementAsync(getState) {
    yield* takeEvery('INCREMENT_ASYNC', incrementAsync);
    /*while(true) {
        const action = yield take('*');
        console.log('action', action);
    }*/
}
