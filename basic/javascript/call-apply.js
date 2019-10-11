/* 
call和apply方法在使用一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法, call和apply方法的区别就是传递参数的方式不同。
首先了解下call的基本使用情况和基本的模拟实现。
*/

/* 基础版本 */
var animal1 = {
    speed: 10
};
function run1() {
    console.log(this.speed);
}
run1.call(animal1); // 10

Function.prototype.call1 = function(context) {
    context.fn = this;
    context.fn();
    delete context.fn;
}
run1.call1(animal1); // 1


/* 
基于以上情况的模拟实现，无法进行传参，所以修改如下。 
*/
var animal2 = {
    speed: 10
};
function run2(name) {
    console.log(`${name} running speed ${this.speed}`);
}
run2.call(animal2, 'dog'); // dog running speed 10

Function.prototype.call2 = function(context) {
    context.fn = this;
    var args = [];
    for(var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    context.fn(...args);
    delete context.fn;
}
run2.call2(animal2, 'dog'); // dog running speed 10



/* 
在调用call函数的时候，this参数可以传null，且可以有返回值，所以升级版如下。
*/
var speed = 20;
var animal3 = {
    speed: 10
};
function run3(name) {
    console.log(`${name} running speed ${this.speed}`);
    return speed;
}
var result3 = run3.call(null, 'dog'); // dog running speed 20
console.log(result3); // 20

Function.prototype.call3 = function(context) {
    context = context || window;
    context.fn = this;
    var args = [];
    for(var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    var result = context.fn(...args);
    delete context.fn;
    return result;
}
var result3 = run3.call3(null, 'dog'); // dog running speed 20
console.log(result3); // 20


/* 
apply与call类似，只是传参方式不一样，所以apply的模拟实现如下。
*/
Function.prototype.apply3 = function(context, arr) {
    context = context || window;
    context.fn = this;
    var result;
    if(arr) {
        result = context.fn(context, arr);
    } else {
        result = context.fn(context);
    }
    delete context.fn;
    return result;
}