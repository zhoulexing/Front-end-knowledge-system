/* 
遍历器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制。
任何数据结构只要部署Iterator接口，就可以完成遍历操作。
Iterator的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；
二是使得数据结构的成员能够按某种次序排列；三是ES6创造了一种新的遍历命令
for...of循环，Iterator接口主要供for...of消费。模拟Iterator如下。
*/
function mockIterator(array) {
    var nextIndex = 0;
    return {
        next: function () {
            if (nextIndex >= array.length) {
                return { done: true, value: undefined };
            }
            return { done: false, value: array[nextIndex++] };
        }
    }
}
var it = mockIterator(['a', 'b']);
it.next(); // {done: false, value: "a"}
it.next(); // {done: false, value: "b"}
it.next(); // {done: true, value: undefined}

/* 
除了上面的模拟方式，利用Generator函数实现更简单
*/
function* mockIterator(array) {
    for (var i = 0, length = array.length; i < length; i++) {
        yield array[i];
    }
}
var it = mockIterator(['a', 'b']);
it.next(); // {done: false, value: "a"}
it.next(); // {done: false, value: "b"}
it.next(); // {done: true, value: undefined}

/* 
由于Iterator只是把接口规格加到数据结构之上，所以，遍历器与它所遍历的那个数据结构，
实际上是分开的，完全可以写出没有对应数据结构的遍历器对象，或者说用遍历器对象模拟出
数据结构。下面是一个无限运行的遍历器对象的例子。
*/
function idMaker() {
    var id = 0;
    return {
        next: function () {
            return { done: false, value: id++ };
        }
    }
}
var it = idMaker();
it.next(); // {done: false, value: 0}
it.next(); // {done: false, value: 0}
it.next(); // {done: false, value: 0}

/* 
一种数据结构只要部署了Iterator接口，我们就称这种数据结构是"可遍历的"。ES6规定，默认的Iterator
接口部署在数据结构的Symbol.iterator属性上，也可以通过Symbol.iterator获取迭代器。或者说，一个数据结构只要具有Symbol.iterator
属性，就可以认为是"可遍历的"。具体情况如下所示。原生具备Iterator
的数据结构如下：Array,Map,Set,String,TypedArray,arguments,NodeList。
*/
var iterator = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (var value of iterator) {
    console.log(value); // a, b, c
}

var arr = ['a', 'b', 'c'];
var it = arr[Symbol.iterator]();
it.next(); // {value: "a", done: false}
it.next(); // {value: "b", done: false}


/* 
遍历器对象除了具有next方法，还可以具有return方法和throw方法。如果你自己写遍历器对象生成函数，
那么next方法是必须部署的，return方法和throw方法是否部署是可选的, 下面的两种情况都会触发return方法
throw方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。
*/
function iterator() {
    return {
        0: 'a',
        1: 'b',
        2: 'c',
        [Symbol.iterator]() {
            var that = this;
            var nextIndex = 0;
            return {
                next() {
                    var value = that[nextIndex++];
                    if(value) {
                        return { done: false, value: value };
                    }
                    return { done: true };
                },
                return() {
                    console.log('end');
                    return { done: true };
                }
            };
        },
    };
}
for (var value of iterator()) {
    console.log(value); // a
    break;
}
for (var value of iterator()) {
    console.log(value); // a
    throw new Error();
}