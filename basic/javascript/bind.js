/* 初版 */
var animal1 = {
    speed: 10
};
function run1() {
    console.log(this.speed);
}
var func1_1 = run1.bind(animal1);
func1_1(); // 10

Function.prototype.bind1 = function(context) {
    var self = this;
    return function() {
        self.apply(context);
    }
}
var func1_2 = run1.bind1(animal1);
func1_2(); // 10


/* 带有参数 */
var animal2 = {
    speed: 10
};
function run2(name) {
    console.log(`${name} running speed ${this.speed}`);
}
var func2_1 = run2.bind(animal2, 'dog');
func2_1(); // dog running speed 10
var func2_2 = run2.bind(animal2);
func2_2('dog'); // dog running speed 10

Function.prototype.bind2 = function(context) {
    var self = this;
    var args = [].slice.call(arguments, 1);
    return function() {
        const bindArgs = [].slice.call(arguments);
        self.apply(context, args.concat(bindArgs));
    }
}
var func2_3 = run2.bind2(animal2, 'dog');
func2_3(); // dog running speed 10
var func2_4 = run2.bind2(animal2);
func2_4('dog'); // dog running speed 10


/* 将bind后的函数当作构造函数 */
var animal3 = {
    speed: 10
}
function run3(name) {
    this.name = name;
}
var func3_1 = run3.bind(animal3, 'dog');
var result = new func3_1();
console.log(result.name); // dog
var func3_2 = run3.bind(animal3);
var result = new func3_2('dog');
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