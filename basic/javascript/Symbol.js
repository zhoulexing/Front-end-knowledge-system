/* 
Symbol是ES6引入的一种新的类型，表示独一无二的值，主要的作用是避免属性名的冲突，
基本用法如下。
*/

// 类型
var symbolProp = Symbol();
typeof symbolProp === 'symbol'; // true

// 作为属性名
var symbolProp = Symbol();
var symbolObj = {};
symbolObj[symbolProp] = 'dog';

// Symbol创建的值是唯一的
var s1 = Symbol();
var s2 = Symbol();
s1 === s2; // flase
var s1 = Symbol('foo'); // Symbol(foo)
var s2 = Symbol('bar'); // Symbol(bar)
s1 === s2; // flase

// ES2019提供了description属性，返回Symbol的描述
var s = Symbol('foo');
sym.description; // 'foo'

// Symbol值不能与其他类型的值进行运算, 可以通过toString()转化成字符串进行运算
var sym = Symbol('My symbol');
s2.toString(); // "Symbol(My symbol)"
"your symbol is " + sym; // TypeError: can't convert symbol to string
`your symbol is ${sym}`; // TypeError: can't convert symbol to string
"your symbol is " + sym.toString(); // your symbol is Symbol(My symbol)
`your symbol is ${sym.toString()}`; // your symbol is Symbol(My symbol)

/* 
Symbol作为属性名，该属性不会出现在for...in、for...of循环中，
也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定
对象的所有Symbol属性名。
*/
var obj = {};
var a = Symbol();
var b = Symbol();
obj[a] = 'a';
obj[b] = 'b';
for(var key in obj) {
    console.log(key); // 无输出
}
obj.getOwnPropertyNames(obj); // []
obj.getOwnPropertySymbols(obj); // [Symbol(a), Symbol(b)]

/* 
有时，我们希望重新使用同一个Symbol值，Symbol.for方法可以做到这一点。它接受一个字
符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，
否则就新建并返回一个以该字符串为名称的Symbol值。
*/
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');
s1 === s2; // true

//Symbol.keyFor方法返回一个已登记的Symbol类型值的key
var s1 = Symbol.for('foo');
Symbol.keyFor(s1); // 'foo'
var s2 = Symbol('foo');
Symbol.keyFor(s2); // undefined

/* 
除了定义自己使用的Symbol值以外，ES6还提供了11个内置的Symbol值，指向语言内部使用的方法，下面列举了两个用法示例，
除此之外还有Symbol.isConcatSpreadable、Symbol.species、Symbol.match、Symbol.replace、Symbol.search
、Symbol.split、Symbol.unscopables、Symbol.toStringTag、Symbol.toPrimitive。
*/

/* 
Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。
*/
class MyClass {
    [Symbol.hasInstance](foo) {
        return foo instanceof Array;
    }
}
[1, 2, 3] instanceof new MyClass(); // true

class Even {
    static [Symbol.hasInstance](obj) {
        return Number(obj) % 2 === 0;
    }
}
// 等同于
var Even = {
    [Symbol.hasInstance](obj) {
        return Number(obj) % 2 === 0;
    }
}
1 instanceof Even; // false
2 instanceof Even; // true

/* 
Symbol.iterator属性，指向该对象的默认遍历器方法。
*/
var myIterable = {};
myIterable[Symbol.iterator] = function* ()  {
    yield 1;
    yield 2;
    yield 3;
}
var arr = [...myIterable]; // [1, 2, 3]
for(var value of myIterable) {
    console.log(value); // 1, 2, 3
}
