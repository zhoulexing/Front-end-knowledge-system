/* 
bind()方法会创建一个新函数。当这个新函数被调用时，bind()的第一个参数将作为它运行时的this，之后的一序列参数将会在传递的实参前传入作为它的参数。
根据它的定义可以看出，bind()方法返回一个函数，可以传入参数，并且此方法返回的函数可以当作构造函数。先来看下它的基本使用情况和它的模拟方法。
*/

/* 返回函数的模拟实现 */
var animal = {
    speed: 10
};
function run() {
    console.log(this.speed);
}
var func = run.bind(animal);
func(); // 10

Function.prototype.bind1 = function(context) {
    var self = this;
    return function() {
        self.apply(context);
    }
}
var func = run.bind1(animal);
func(); // 10


/* 传参的模拟实现 */
var animal = {
    speed: 10
};
function run(name) {
    console.log(`${name} running speed ${this.speed}`);
}
var func = run.bind(animal, 'dog');
func(); // dog running speed 10
var func = run.bind(animal);
func('dog'); // dog running speed 10

Function.prototype.bind2 = function(context) {
    var self = this;
    var args = [].slice.call(arguments, 1);
    return function() {
        const bindArgs = [].slice.call(arguments);
        self.apply(context, args.concat(bindArgs));
    }
}
var func = run.bind2(animal, 'dog');
func(); // dog running speed 10
var func = run.bind2(animal);
func('dog'); // dog running speed 10


/* 构造函数效果的模拟实现，这个部分最难，把原函数当成构造器，提供的this值被忽略，但是传入的参数有效。 */
var animal = {
    speed: 10
}
function run(name) {
    this.name = name;
}
var func = run.bind(animal, 'dog');
var result = new func();
console.log(result.name); // dog
var func = run.bind(animal);
var result = new func('dog');
console.log(result.name); // dog

Function.prototype.bind3 = function(context) {
    var self = this;
    var args = [].slice.call(arguments, 1);
    var fbound = function() {
        const bindArgs = [].slice.call(arguments);
        self.apply(this instanceof self ? this : context, args.concat(bindArgs));
    }
    // 去除this函数中的实例属性
    var fNOP = function() {};
    fNOP.prototype = this.prototype;
    fbound.prototype = new fNOP();
    return fbound;
}
var func = run.bind3(animal, 'dog');
var result = new func();
console.log(result.name); // dog
var func = run.bind3(animal);
var result = new func('dog');
console.log(result.name); // dog
