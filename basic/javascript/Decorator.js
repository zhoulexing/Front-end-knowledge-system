/* 
装饰器（Decorator）是一种与类（class）相关的语法，用来注释或修改类和类方法。
它是一种函数，写成@+函数名。它可以放在类和类方法的定义前面。类装饰器的第一个
参数就是所要装饰的目标类。方法装饰器可以接受三个参数，等同于Object.defineProperty
函数的三个参数。
*/
@testable
class MyTestableClass {}
function testable(target) {
    target.isTestable = true;
}
console.log(MyTestableClass.isTestable); // true

function testable(isTestable) {
    return function(target) {
        target.isTestable = isTestable;
    }
}
@testable(true)
class MyTestableClass {}
console.log(MyTestableClass.isTestable); // true
@testable(false)
class MyTestableClass {}
console.log(MyTestableClass.isTestable); // false

class Person {
    @readonly
    name() {
        return 'Hello World';
    }
}
function readonly(target, name, descriptor) {
    descriptor.writable = false;
    return descriptor;
}


/* 
因为方法的变量提升的原因，装饰器不能用在方法上。接下来通过装饰器实现一个自动发布事件的例子。
*/
class Event {
    constructor() {
        this.subscribes = {};
    }
    add(key, callback) {
        this.subscribes[key] = callback;
    }
    publish(key, value) {
        var fn = this.subscribes[key];
        fn(value);
    }
}
function publish(topic) {
    var event = new Event();
    event.add(topic, v => {
        console.log('事件', topic);
        console.log('数据', v.name);
    });
    return function(target, name, descriptor) {
        var fn = descriptor.value;
        descriptor.value = function() {
            var value = fn.apply(this, arguments);
            event.publish(topic, value);
        }
    }
}
class MyComponent {
    @publish('someMethod')
    someMethod() {
        return { name: 'zlx' };
    }
}


/* 
总结：Decorator提案经过了大幅修改，目前还没有定案，但是在上面的例子中，可以看出使用它的优势，如果在项目中使用，需要借助babel插件，可以体验下。
*/