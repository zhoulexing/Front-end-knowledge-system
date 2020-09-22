/* 
ES2017标准引入了async函数，使得异步操作变得更加方便。如果要问async是什么？它就是Generator函数的语法糖。
*/
function getData(value) {
    return new Promise(resolve => {
        resolve(value);
    });
}
function* gen() {
    var v1 = yield getData(1);
    var v2 = yield getData(2);
    var v3 = yield getData(3);
    console.log(v1, v2, v3);
}
var g = gen();
g.next();
g.next(1);
g.next(2);
g.next(3);  // 1, 2, 3

async function gen() {
    var v1 = await getData(1);
    var v2 = await getData(2);
    var v3 = await getData(3);
    console.log(v1, v2, v3);
}
gen(); // 1, 2, 3
/* 
通过上面的例子可以看出async函数就是将"*"号替换成了async，yield换成了await。它们之间不同的是，async内置了Generator执行器，
类似于co模块，直接调用即可；另外yield命令后面只能是Thunk函数或Promise函数，而await后面可以是Promise函数和原始对象的值；
最后Generator返回的是一个迭代器，async返回的是一个Promise。
*/


/* 
接下来看下async的基本用法。
*/
async function getData() {
    return 'Hello World';
}
getData().then(data => {
    console.log(data); // Hello World
});

var getData = async function() {
    return 'Hello World';
}
getData().then(data => {
    console.log(data); // Hello World
});

var obj = { 
    async getData() {
        return 'Hello World';
    } 
}
var obj = new Basic();
obj.getData().then(data => {
    console.log(data); // Hello World
});

class Basic {
    async getData() {
        return 'Hello World';
    }
}
var obj = new Basic();
obj.getData().then(data => {
    console.log(data); // Hello World
});


/* 
如果async函数内部跑出错误或者Promise的状态变为reject，则会进入then函数的reject方法，
如果没有reject，则会进入catch。如果await后面的Promise对象变为reject状态，那么整个
async都会中断执行。
*/
async function getData() {
    throw new Error('出错了');
}
getData().then(() => {

}, error => {
    console.log(error); // 出错了
});
getData().then(() => {

}).catch(error => {
    console.log(error); // 出错了
});

async function getData() {
    await Promise.reject('出错了');
    await Promise.resolve('Hello World');
}
getData().then(data => {
    console.log(data); // undefined
}, error => {
    console.log(error); // 出错了
});


/* 
有时我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个await放在try...catch
结构里，这样不管第一个异步操作是否成功，第二个await都会执行。
*/
async function getData() {
    try {
        await Promise.reject('出错了');
    } catch (error) {
        return error;
    }
    await Promise.resolve('Hello World');
}
getData().then(data => {
    console.log(data); // Hello World
});





/* 
总结：async函数就是将Generator函数和自动执行器，包装在一个函数里。
*/