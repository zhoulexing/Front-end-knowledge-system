/* 
Generator函数是ES6提供的一种异步编程方案，它是一个状态机，封装了多个内部状态，
除了状态机，还是一个遍历器生成函数，返回遍历器对象。
*/
function* helloWorld() {
    yield 'hello';
    yield 'world';
    return 'end';
}
var hw = helloWorld();
hw.next(); // { value: 'hello', done: false }
hw.next(); // { value: 'world', done: false }
hw.next(); // { value: 'end', done: true }
hw.next(); // { value: undefined, done: true }

/* 
for...of循环可以自动遍历Generator函数运行时生成的Iterator对象，且此时不再需要调用next方法。
这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回
对象。
*/
function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}
for (var v of foo()) {
    console.log(v); // 1, 2, 3, 4, 5
}

/* 
利用for...of循环，可以写出遍历任意对象（object）的方法。原生的JavaScript对象没有遍历接口，无
法使用for...of循环，通过Generator函数为它加上这个接口，就可以用了。
*/
function* objectEntries(obj) {
    var keys = Reflect.ownKeys(obj);
    for (var key of keys) {
        yield [key, obj[key]];
    }
}
var jane = { first: 'Jane', last: 'Doe' };
for (var [key, value] of objectEntries(jane)) {
    console.log(`${key}: ${value}`);
}

/* 
yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，
该参数就会被当作上一个yield表达式的返回值。
*/
function* f() {
    for (var i = 0; true; i++) {
        var reset = yield i;
        if (reset) {
            i = -1;
        }
    }
}
var g = f();
g.next(); // {value: 0, done: false}
g.next(); // {value: 1, done: false}
g.next(true); // {value: 0, done: false}

function* foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
}
var b = foo(5);
b.next(); // {value: 6, done: false}
b.next(12); // { value: 8, done: false }
b.next(13) // { value: 42, done: true }


/* 
Generator函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在Generator函数体内捕获。
如下例，第一个错误被Generator函数体内的catch语句捕获。第二次抛出错误，由于Generato函数内部的catch语句已经执
行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了Generator函数体，被函数体外的catch语句捕获。
*/
var g = function* () {
    try {
        yield;
    } catch (error) {
        console.log('内部错误', error);
    }
}
var i = g();
i.next();
try {
    i.throw('a');
    i.throw('b');
} catch (error) {
    console.log('外部错误', error);
}
// 内部错误 a
// 外部错误 b

/* 
Generator函数体外抛出的错误，可以在函数体内捕获；反过来，Generator函数体内抛出的错误，也可以被函数体外的catch捕获,
一旦Generator执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，将返回一个value属性
等于undefined、done属性等于true的对象，即JavaScript引擎认为这个Generator已经运行结束了。
*/
function* foo() {
    var x = yield 3;
    var y = x.toUpperCase();
    yield y;
    yield 'end';
}
var it = foo();
it.next(); // { value:3, done:false }

try {
    it.next(42);
} catch (err) {
    console.log(err); // x.toUpperCase is not a function
    it.next(); // { value:undefined, done:true }
}


/* 
Generator函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历Generator函数。
如果Generator函数内部有try...finally代码块，且正在执行try代码块，那么return方法会导致立刻进入
finally代码块，执行完以后，整个函数才会结束。
*/
function* gen() {
    yield 1;
    yield 2;
    yield 3;
}
var g = gen();
g.next(); // { value: 1, done: false }
g.return('foo'); // { value: 'foo', done: true }
g.next(); // { value: undefined, done: true }

function* numbers() {
    yield 1;
    try {
        yield 2;
        yield 3;
    } finally {
        yield 4;
        yield 5;
    }
    yield 6;
}
var n = numbers();
n.next(); // {value: 1, done: false}
n.next(); // {value: 2, done: false}
n.return(7); // {value: 4, done: false}
n.next(); // {value: 5, done: false}
n.next(); // {value: 7, done: true}


/* 
如果在Generator函数内部调用另外一个Generator函数，就需要通过遍历的方式进行处理，比较麻烦。
ES6提出的yield*表达式，就是用来执行Generator中另一个Generator函数的。
*/
function* inner() {
    yield 'hello';
}
function* outer1() {
    yield 'open';
    yield inner();
    yield 'close';
}
var o1 = outer1();
o1.next(); // {value: "open", done: false}
o1.next(); // 返回一个遍历器对象
o1.next(); // {value: "close", done: false}

function* outer2() {
    yield 'open';
    yield* inner();
    yield 'close';
}
var o2 = outer2();
o2.next(); // {value: "open", done: false}
o2.next(); // {value: "hello", done: false}
o2.next(); // {value: "close", done: false}

/* 
如果yield*后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员,
任何数据结构只要有Iterator接口，就可以被yield*遍历。
*/
function* gen() {
    yield* ["a", "b", "c"];
}
var g = gen();
g.next(); // {value: "a", done: false}
g.next(); // {value: "b", done: false}
g.next(); // {value: "c", done: false}

/* 
Generator函数总是返回一个遍历器，ES6规定这个遍历器是Generator函数的实例，
也继承了Generator函数的prototype对象上的方法。
*/
function* gen() {
    yield 1;
} 
gen.prototype.hello = function() {
    return 'hi!';
}
var g = gen();
g.hello(); // 'hi!' 


/* 
Generator函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。
接下来看一下Generator函数的流程自动管理，以及co模块的实现。
*/
function* gen() {
    var y = yield 1;
    var z = yield (y + 2);
    return y + z;
}
function runGen(fn) {
    var it = fn();
    var res = it.next();
    while(!res.done) {
        console.log(res.value);
        res = it.next(res.value);
    }
}
runGen(gen);


/* 
上面是针对同步情况的自动流程控制，接下来了解一下co的异步流程控制模拟实现。
*/
function co(gen) {
    var ctx = this;
    return new Promise((resolve, reject) => {
        if(typeof gen === 'function') gen = gen.call(ctx);
        if(!gen || typeof gen.next !== 'function') resolve(gen);
        onFulfilled();
        function onFulfilled(res) {
            var ret;
            try {
                ret = gen.next(res);
            } catch (error) {
                return reject(error);   
            }
            next(ret);
        }
        function onRejected(reason) {
            return reject(reason);
        }
        function next(ret) {
            if(ret.done) return resolve(ret.value);
            if(isPromise(ret.value)) {
                return ret.value.then(onFulfilled, onRejected);
            }
        }
        function isPromise(obj) {
            return (
                !!obj &&
                (typeof obj === 'object' || typeof obj === 'function') &&
                typeof obj.then === 'function'
            );
        }
    });
}
co(function* () {
    var a = yield Promise.resolve('a');
    var b = yield Promise.resolve('b');
    var c = yield Promise.resolve('c');
    return a + b + c;
}).then(result => {
    console.log('resolve', result); // resolve abc
}, err => {
    console.log('reject', err);
});