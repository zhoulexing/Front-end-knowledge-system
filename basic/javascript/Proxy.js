/* 
最近vue3.0已经出来了，在3.0之前的版本，vue的双向绑定是利用Object.defineProperty方法实现的；
3.0之后采用的是es6的Proxy构造函数实现的。接下来了解一下Object.defineProperty和Proxy两个函数。
*/

/*  
Object.defineProperty方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
此方法包含三个属性，分别是要在其上定义属性的对象、要定义或修改的属性的名称和将被定义或修改的属性描述符。
*/
var obj = {};
obj.a = 1;
Object.defineProperty(obj, 'b', {
    value: 2
});
console.log(Object.getOwnPropertyDescriptor(obj, 'a'));
// {value: 1, writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(obj, 'b'));
// {value: 2, writable: false, enumerable: false, configurable: false}


/* 
对于第三个参数对象，除了value属性，还有writable、enumerable和configurable。
*/
var obj = {};
Object.defineProperty(obj, 'name', {
    value: 'zlx',
    writable: false, // 不能再次赋值
    enumerable: false, // 不能遍历
    configurable: false // 不能删除和不能重新修改特性
});
obj.name = 'yww';
console.log(obj.name); // zlx
console.log(Object.keys(obj)); // []
delete obj.name;
console.log(obj.name); // zlx


/* 
如果第三个对象有getter和setter，则不能定义value和writable属性。
*/
var obj = {};
var initValue = 'hello';
Object.defineProperty(obj, 'name', {
    // value: 'zlx', 
    // writable: true, 
    enumerable: true,
    configurable: true,
    get() {
        return initValue;
    },
    set(value) {
        initValue = value;
    }
});
console.log(obj.name); // hello
obj.name = 'world';
console.log(obj.name); // world


/* 
如果要在一个对象上定义多个属性，则可以用Object.defineProperties方法，此方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
*/
var obj = {};
Object.defineProperties(obj, {
    'name': {
        value: 'zlx',
        writable: true
    },
    'age': {
        value: 108,
        writable: false
    },
    // ...
});


/* 
Proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”，即对编程语言进行编程。
Proxy是一个构造函数，接受两个参数，一个是代理对象target，一个是拦截行为handler。
*/
var obj = new Proxy({}, {
    get(target, key, receiver) {
        console.log(`target: ${JSON.stringify(target)}, key: ${key}`);
        return Reflect.get(target, key, receiver);
    }, 
    set(target, key, value, receiver) {
        console.log(receiver);
        console.log(`target: ${JSON.stringify(target)}, key: ${key}, value: ${value}`);
        return Reflect.set(target, key, value, receiver);
    }
});
obj.name = 'zlx'; // target: {}, key: name, value: zlx
obj.age = 108; // target: {"name":"zlx"}, key: age, value: 108


/* 
具体能拦截的行为有如下13种。
*/
var handler = {
    // 拦截对象属性的读取, receiver为Proxy的实例
    get(target, propKey, receiver) { 
        if(propKey === 'property') {
            return Object.prototype;
        }
        return 'Hello, ' + propKey;
    },
    // 拦截对象属性的设置
    set(target, propKey, value, receiver) { 
        return Reflect.set(target, propKey, value, receiver);
    },
    // 拦截propKey in proxy的操作，返回一个布尔值
    has(target, propKey) {
        return propKey in target;
    },
    // 拦截delete proxy[propKey]的操作，返回一个布尔值
    deleteProperty(target, propKey) {
        delete target[propKey];
        return true;
    },
    // 拦截所有获取key的方法，返回一个数组
    ownKeys(target) { Reflect.ownKeys(target); },
    // 拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象
    getOwnPropertyDescriptor(target, propKey) {
        return Object.getOwnPropertyDescriptor(target, propKey);
    },
    // 拦截defineProperty和defineProperties方法，返回一个布尔值
    defineProperty(target, propKey, propDesc) {
        return Object.defineProperty(target, propKey, propDesc);
    },
    // 拦截Object.preventExtensions(proxy)，返回一个布尔值
    preventExtensions(target) { Object.preventExtensions(target); },
    // 拦截Object.getPrototypeOf(proxy)，返回一个对象
    getPrototypeOf(target) { return target.__proto__; },
    // 拦截Object.isExtensible(proxy)，返回一个布尔值
    isExtensible(target) { return Object.isExtensible(target); },
    // 拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值
    setPrototypeOf(target, proto) {},
    // 拦截Proxy实例作为函数调用的操作，比如proxy(...args)、
    // proxy.call(object, ...args)、proxy.apply(...)
    apply(target, object, args) { return Reflect.apply(...arguments); },
    // 拦截Proxy实例作为构造函数调用的操作，比如new proxy(...args)
    construct(target, args) { return new target(...args); }
};
var fproxy = new Proxy({} || function() {}, handler);


/* 
有些原生对象的内部属性，只有通过正确的this才能拿到，所以Proxy也无法代理这些原生对象的属性。
*/
var target = {
    m() {
        console.log(this === proxy);
    }
};
var proxy = new Proxy(target, {});
target.m(); // false
proxy.m(); // true

var _name = new WeakMap();
class Person {
    constructor(name) {
        _name.set(this, name);
    }
    get name() {
        _name.get(this);
    }
}
var jane = new Person('jane');
console.log(jane.name); // jane
var proxy = new Proxy(jane, {});
console.log(jane.name); // undefined


/* 
总结：Object.defineProperty和Proxy都是属于元编程，本篇文章主要是了解基本用法，
具体该如何使用还是要根据具体情况，这样才能了解其精髓。
*/