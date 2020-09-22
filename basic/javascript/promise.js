/* 
Promise对象是JavaScript的异步操作解决方案，为异步操作提供统一接口。它起到代理作用（proxy），充当异步操作与回调函数之间的中介，使得异步操作具备同步操作的接口。
解决了之前异步回调地狱问题，也可以很好的解决并行异步操作的问题。
*/

/* 
想模拟实现promise就得了解它的功能和特性，首先通过下面的示例了解它的基本用法。通过下面的例子，
可以看出，Promise是一个构造函数，接收一个回调函数作为参数，回调函数在实例化的时候就开始调用了，并将resolve函数作为参数。
通过new Promise()获取的实例，含有then方法属性，then方法接受一个回调函数作为参数。基本的Promise模拟见下面示例后的Promise函数。
*/
function getData() {
    return new MockPromise((resolve) => {
        setTimeout(() => {
            resolve({ value: 100 });
        }, 100);
    });
}
var promise = getData();
promise.then(res => {
    console.log(res); // { value: 100 }
});

function MockPromise(fn) {
    var callbacks = [];
    function resolve(value) {
        callbacks.forEach(callback => {
            callback(value);
        });
    }
    this.then = function(onFulfilled) {
        callbacks.push(onFulfilled);
    }
    fn(resolve);
}


/* 
修改上面的示例，在Promise构造函数中直接resolve一个值，具体如下, 这个时候我们发现，并没有打印res。
因为在执行resolve的时候，then方法的回调函数还没有添加到callbacks数组里，修改MockPromise如下。
*/
function getData() {
    return new MockPromise((resolve) => {
        resolve({ value: 100 });
    });
}
var promise = getData();
promise.then(res => {
    console.log(res); // { value: 100 }
});

function MockPromise(fn) {
    var callbacks = [];
    function resolve(value) {
        setTimeout(() => {
            callbacks.forEach(callback => {
                callback(value);
            });
        }, 0);
    }
    this.then = function(onFulfilled) {
        callbacks.push(onFulfilled);
    }
    fn(resolve);
}


/* 
上面的例子是在执行getData()方法后，立即执行then方法，如果很久再执行then方法，这个时候resolve方法已经执行完了，然后then方法的回调函数
再添加到callbacks数组里，这个时候还是不会打印res，需要添加状态，修改MockPromise如下。
*/
function getData() {
    return new MockPromise((resolve) => {
        resolve({ value: 100 });
    });
}
var promise = getData();
setTimeout(() => {
    promise.then(res => {
        console.log(res); // { value: 100 }
    });
}, 1000);

function MockPromise(fn) {
    var callbacks = [];
    var state = 'pending';
    var value = null;
    function resolve(newValue) {
        value = newValue;
        state = 'fulfilled';
        setTimeout(() => {
            callbacks.forEach(callback => {
                callback(value);
            });
        }, 0);
    }
    this.then = function(onFulfilled) {
        if(state === 'pending') {
            callbacks.push(onFulfilled);
            return;
        }
        onFulfilled(value);
    };
    fn(resolve);
}


/* 
在调用then函数之后，还可以继续调用then函数，形成一个链式调用，所以then函数要返回一个Promise,并且在调用then函数中
的回调函数后，需要将返回值再resolve回去，修改MockPromise如下。
*/
function getData() {
    return new MockPromise((resolve) => {
        resolve({ value: 100 });
    });
}
var promise = getData();
promise.then(res => {
    console.log(res); // { value: 100 }
    return res;
}).then(res => {
    console.log(res); // { value: 100 }
});

function MockPromise(fn) {
    var callbacks = [];
    var state = 'pending';
    var value = null;
    function resolve(newValue) {
        value = newValue;
        state = 'fulfilled';
        setTimeout(() => {
            callbacks.forEach(callback => {
                callback(value);
            });
        }, 0);
    }
    this.then = function(onFulfilled) {
        return new MockPromise(resolve => {
            handle({
                onFulfilled: onFulfilled || null,
                resolve: resolve
            });
        });
    };
    function handle(callback) {
        if(!callback.onFulfilled) {
            callback.resolve(value);
            return;
        }
        if(state === 'pending') {
            callbacks.push(callback.onFulfilled);
            return this;
        }
        var ret = callback.onFulfilled(value);
        callback.resolve(ret);
    }
    fn(resolve);
}


/* 
在上面的模拟中，还没有处理异常情况, 通过下面的例子，可以看出在Promise构造函数中reject一个结果，
则then方法中回调函数中的resolve参数方法不会执行, 如果既有reject又有catch，则只会执行reject，修改MockPromise如下。
*/
function getData() {
    return new MockPromise((resolve, reject) => {
        reject({ error: '出错了' });
    });
}
var promise = getData();
promise.then(res => {
    console.log(res); // 不会执行
    return res;
}, err => {
    console.log(err); // { error: '出错了' }
});
promise.then(res => {
    console.log(res); // 不会执行
    return res;
}).catch(err => {
    console.log(err); // { error: '出错了' }
});
promise.then(res => {
    console.log(res); // 不会执行
    return res;
}, err => {
    console.log(err); // { error: '出错了' }
    return err;
}).catch(err => {
    console.log(err); // 不会执行
});

function MockPromise(fn) {
    var callbacks = [];
    var state = 'pending';
    var value = null;
    function resolve(newValue) {
        value = newValue;
        state = 'fulfilled';
        setTimeout(() => {
            callbacks.forEach(callback => {
                callback(value);
            });
        }, 0);
    }
    function reject(error) {
        value = error;
        state = 'rejected';
        setTimeout(() => {
            callbacks.forEach(callback => {
                callback(value);
            });
        }, 0);
    }
    this.then = function(onFulfilled, onRejected) {
        return new MockPromise((resolve, reject) => {
            handle({
                onFulfilled: onFulfilled || null,
                onRejected: onRejected || null,
                resolve: resolve,
                reject: reject
            });
        });

    };
    this.catch = function(onRejected) {
        return this.then(null, onRejected);
    };
    function handle(callback) {
        callback.onFulfilled = typeof callback.onFulfilled === 'function' 
            ? callback.onFulfilled : value => value;
        callback.onRejected = typeof callback.onRejected === 'function' 
            ? callback.onRejected : reason => { throw reason };

        if(state === 'pending') {
            callbacks.push(callback.onFulfilled);
            return this;
        }
        var cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
        if(cb === null) {
            state === 'fulfilled' ? callback.resolve(value) : callback.reject(value);
            return;
        }
        try {
            var ret = cb(value);
            callback.resolve(ret);
        } catch (error) {
            callback.reject(error);
        }
    }
    fn(resolve, reject);
}


/* 
至此，Promise的核心功能基本模拟完了，但是我们知道，Promise还有一些方法，如Promise.resolve(), Promise.reject(), Promise.all(), Promise.race()。
具体实现如下。
*/
MockPromise.resolve = function(value) {
    return new MockPromise((resolve) => {
        resolve(value);
    });
}
MockPromise.reject = function(reason) {
    return new MockPromise((resolve, reject) => {
        reject(reason);
    });
}
MockPromise.all = function(promises) {
    return new MockPromise((resolve, reject) => {
        var arr = [];
        var j = 0;
        function processData(i, data) {
            arr[i] = data;
            if(++j === promises.length) {
                resolve(arr);
            }
        }
        for(var i = 0; i < promises.length; i++) {
            promises[i].then(data => {
                processData(i, data);
            }, reject); // 如果有一个失败，整体就会失败
        }
    });
}
MockPromise.race = function(promises) {
    return new MockPromise((resolve, reject) => {
        for(var i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject); // 返回第一个有结果的
        }
    });
}


function test(arr) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            for(let i = 0; i < arr.length; i++) {
                let item = arr[i];
                if(item === 10) {
                    reject(item);
                    break;
                }
            }
            resolve("success");
        }, 1000);
    });
}

function test5(value) {
    return new Promise((resolve, reject) => {
        if(value === 1) {
            resolve('123');
        }
    })
}
test5(1).then((value) => {
    console.log(value);
    test([1]).then(value => {
        console.log('345');
    });
}).then(() => {
    console.log('end');
})


function test4() {
    test([10]).then(value => {
        return value;
    }).catch(err => {
        // return err;
    }).then(value => {
        console.log(value);
    })
}
test4()

function test3() {
    test([1]).then(value => {
        return value;
    }).catch((err) => {
        console.log('catch err:', err);
        return 'error';
    }).finally(value => {
        console.log('finally:', value);
    });
}
test3();

function test2() {
    return test([1]).then(value => {
        return value;
    }).then(() => {
        return Promise.reject('error');
    }).catch(err => {
        return Promise.reject(err);
    }).finally(() => {
        console.log('finish');
    });
}

test2().then(value => {
    console.log('then:', value);
}).catch(err => {
    console.log('catch err:', err);
})


test([1]).then(value => {
    if(value === 'success') {
        return test([2]);
    }
    return Promise.reject('错误了');
}).then(() => {
    return test([10]);
}).then(() => {
    console.log("空的");
}).catch(err => {
    console.error(err);
});


function test1() {
    return test([20]).then(res => {
        console.log(res);
        return Promise.resolve("456");
    });
}

test1().then((res) => {
    console.log("123:", res);
}).finally(() => {
    
});


test([10, 20, 30]).then(item => {

}).catch(err => {
    console.log("error:", err);
});


Promise.allSettled([
    test([3]),
    test([4]),
    test([5]),
    test([10]),
]).then(res => {
    console.log("then:", res);
}).catch(err => {
    console.log("catch:", err);
});

Promise.all([
    test([3]),
    test([10]),
    test([4]),
    test([5]),
]).then(res => {
    console.log("then:", res);
}).catch(err => {
    console.log("catch:", err);
});