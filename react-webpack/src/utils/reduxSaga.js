function channel() {
    let taker;
    function take(cb) {
        taker = cb;
    }
    function put(input) {
        if (taker) {
            const tempTaker = taker;
            taker = null;
            tempTaker(input);
        }
    }
    return {
        put,
        take,
    };
}
const chan = channel();




function runTakeEffect(effect, cb) {
    chan.take(input => {
        cb(input);
    });
}

function runForkEffect(effect, cb) {
    task(effect.fn || effect);
    cb();
}
function runCancelEffect() {

}
function call(genPromise) {
    return {
        isEffect: true,
        type: 'CALL',
        fn: genPromise
    }
}
function take() {
    return {
      type: 'TAKE'
    };
}
function fork(cb) {
    return {
        type: 'FORK',
        fn: cb,
    };
}
function cancel() {
    return {
        type: 'CANCEL',
    }
}
function* takeEvery(worker) {
    yield fork(function* () {
        while(true) {
            const action = yield take();
            worker(action);
        }
    });
}
function* mainSaga() {
    yield takeEvery(action => {
        $result.innerHTML = action;
    });
}
function task(iterator) {
    const iter = typeof iterator === 'function' ? iterator() : iterator;
    function next(args) {
        const result = iter.next(args);
        if (!result.done) {
            const effect = result.value;
    
            // 判断effect是否是iterator
            if (typeof effect[Symbol.iterator] === 'function') {
                runForkEffect(effect, next);
            } else if (effect.type) {
                switch (effect.type) {
                    case 'CANCEL':
                        runCancelEffect();
                        break;
                    case 'TAKE':
                        runTakeEffect(effect, next);
                        break;
                    case 'FORK':
                        runForkEffect(effect, next);
                        break;
                    default:
                }
            }
        }
    }
    next();
}
task(mainSaga);

let i = 0;
$btn.addEventListener('click', () => {
    const action =`action data${i++}`;
    chan.put(action);
}, false);


  
  

  

