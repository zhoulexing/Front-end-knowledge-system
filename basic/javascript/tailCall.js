/* 
尾调用是函数式编程的一个重要概念，就是指某个函数的最后一步是调用另一个函数。
如下，只有第一种情况属于尾调用，其他的都不是，都属于调用之后还有操作, 第四种情况等同于第五种情况。
*/
function f(x) {
    return g(x);
}
function f(x) {
    var y = g(x);
    return y;
}
function f(x) {
    return g(x) + 1;
}
function f(x) {
    g(x);
}
// 等同
function f(x) {
    g(x);
    return undefined;
}


/* 
尾调用不一定出现在函数尾部，只要是最后一步操作即可，如下，也是属于尾调用。
*/
function f(x) {
    if (x > 0) {
        return m(x);
    }
    return n(x);
}


/* 
接下来我们了解一下，尾调用和非尾调用有什么区别？我们知道函数调用会在内存形成一个调用记录，又称调用帧，
保存调用位置和变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方，会形成一个B的调用帧。等
到B运行结束，将结果返回给A，则B的调用帧才会消失。如果函数B内部还调用函数C，那就还有一个C的调用帧，
以此类推。所有的调用帧，就形成一个调用栈。
尾调用由于是函数的最后一步，所以外部函数的调用帧就不用保存了，因为调用位置和变量信息都不会再用到了，
只要直接用内存函数的调用帧，取代外层函数的调用帧即可，具体如下。
*/
function f() {
    let m = 1;
    let n = 2;
    return g(m + n);
}
f();

// 等同于
function f() {
    return g(3);
}
f();

// 等同于
g(3);


/* 
只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行尾调用优化，
如下，就无法进行尾调用优化，因为inner函数用到了one变量。
*/
function addOne(a) {
    var one = 1;
    function inner(b) {
        return b + one;
    }
    return inner(a);
}


/* 
函数调用自身，称为递归。如果尾调用自身，就称为尾递归。
递归非常消耗内存，因为需要同时保存成千上百个调用帧，很容易发生调用栈溢出，如果换成尾递归调用，
主要是把所有用到的内部变量改写成函数的参数，则永远不会发生调用栈溢出，具体对比如下。
*/
function factorial(n) {
    if(n === 1) return 1;
    return n * factorial(n - 1);
}
// 优化
function factorial(n, total) {
    if(n === 1) return total;
    return factorial(n - 1, n * total);
}

function fibonacci(n) {
    if(n <= 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
// 优化
function fibonacci(n, ac1 = 1 , ac2 = 1) {
    if(n <= 1) return ac2;
    return fibonacci(n - 1, ac2, ac1 + ac2);
}


/* 
递归函数除了利用尾函数进行优化外，还可以使用蹦床函数，具体如下。
*/

function trampoline(f) {
    while(f && f instanceof Function) {
        f = f();
    }
    return f;
}
function sum(x, y) {
    if(y > 0) {
        return sum.bind(null, x + 1, y - 1);
    } else {
        return x;
    }
}
trampoline(sum(1, 100000));