/* 示例 */
function Animal1(name, age) {
    this.name = name;
    this.age = age;
}
Animal1.prototype.run1 = function() {
    console.log('running1');
}
var animal1 = new Animal1('dog', 12);
animal1.run1(); // running1
console.log(animal1); // { name: 'dog', age: 12 }


function Animal2(name, age) {
    this.name = name;
    this.age = age;
    return {
        name: 'cat',
        age: 10
    };
}
var animal2 = new Animal2('dog', 12);
console.log(animal2); // { name: 'cat', age: 10 }


function Animal3(name, age) {
    this.name = name;
    this.age = age;
    return 'cat';
}
var animal3 = new Animal3('dog', 12);
console.log(animal3); // { name: 'dog', age: 12 }


/* 
new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。通过这句话可以看出new关键字有
两个作用，一个是创建用户定义的对象类型的实例，这个比较好理解，另一个是如果构造函数返回一个对象，则new的
作用是返回此对象。具体可通过以下示例来理解。


通过以上示例发现new干了这几件事，
1. 创建了一个新的对象；
2. 新对象的__proto__属性指向构造函数的原型对象；
3. 改变构造函数的this指向到新建的对象，这样新对象就可以访问到构造函数中的属性；
4. 如果构造函数返回的是对象，则返回此对象，否则返回新对象。
*/
function Animal(name, age) {
    this.name = name;
    this.age = age;
}
Animal.prototype.getMsg = function() {
    console.log(`the ${this.name} age is ${this.age}`);
}
function ObjectFactory() {
    var obj = new Object();
    var Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    // 如果构造函数返回的是对象，则返回构造函数的对象
    return typeof ret === 'object' ? ret : obj;
}
var animal = ObjectFactory(Animal, 'dog', 20);
animal.getMsg(); // the dog age is 20
