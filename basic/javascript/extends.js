/* 原型链继承 */
function Animal1() {}
Animal1.prototype.eat1 = function() {
    console.log('eating1');
}
function Cat1() {}
Cat1.prototype = new Animal1();
Cat1.prototype.constructor = Cat1;
Cat1.prototype.run1 = function() {
    console.log('runing');
}

var cat1 = new Cat1();
cat1.eat1();  // eating1
cat1.run1(); // runing
console.log(
    'cat1 ~ Animal1:', 
    cat1 instanceof Cat1,  // true
    cat1 instanceof Animal1,  // true
    Cat1 instanceof Animal1 // false
);
/* 
原型链继承有一个问题，如果父类含有引用类型的值，子类的实例化后改变这个属性，则另一个实例的这个引用值也会受影响。
*/
function Animal1() {
    this.books = ['js', 'html', 'css'];
}
function Cat1() {}
Cat1.prototype = new Animal1();
var c1 = new Cat1();
var c2 = new Cat1();
c1.books.push('java');
console.log(c2.books);


/* 构造继承 */
function Animal2() {}

function Cat2(name) {
    Animal2.call(this);
    this.name = name;
}
Cat2.prototype.getName2 = function() {
    console.log(this.name);
}

var cat2 = new Cat2('Tom');
cat2.getName2(); // Tom
console.log(
    'cat2 ~ Animal2:', 
    cat2 instanceof Cat2,  // true
    cat2 instanceof Animal2 // false
);
/* 
构造函数继承有一个问题，就是父类原型上的方法不可继承。
*/


/* 实例继承 */
function Animal3() {}
Animal3.prototype.eat3 = function() {
    console.log('eating3');
}

function Cat3(name) {
    var instance = new Animal3();
    instance.name = name;
    instance.getName3 = function() {
        console.log(this.name);
    }
    return instance;
}

var cat3 = new Cat3('Bob');
cat3.eat3(); // eating3
cat3.getName3(); // Bob
console.log(
    'cat3 ~ Animal3:',
    cat3 instanceof Cat3, // false
    cat3 instanceof Animal3,  // true
);


/* 拷贝继承 */
function Animal4() {}
Animal4.prototype.eat4 = function() {
    console.log('eating4');
}

function Cat4(name) {
    var animal4 = new Animal4();
    for(var key in animal4) {
        Cat4.prototype[key] = animal4[key];
    }
    this.name = name;
}
Cat4.prototype.getName4 = function() {
    console.log(this.name);
}

var cat4 = new Cat4('Ellen');
cat4.eat4(); // eating4
cat4.getName4(); // Ellen


/* 组合继承 */
function Animal5(name) {
    this.name = name;
}
Animal5.prototype.eat5 = function() {
    console.log('eating5');
}

function Cat5(name) {
    Animal5.call(this, name);
}
Cat5.prototype = new Animal5();
Cat5.prototype.constructor = Cat5;
var cat5 = new Cat5('Jim');
cat5.eat5(); // eating5
console.log(cat5.name); // Jim
console.log(
    'cat5 ~ Animal5:',
    cat5 instanceof Cat5, // true
    cat5 instanceof Animal5,  // true
);


/* 寄生组合继承 */
function Animal6(name) {
    this.name = name;
}
Animal6.prototype.eat6 = function() {
    console.log('eating6');
}

function Cat6(name) {
    Animal6.call(this);
    this.name = name;
}
(function() {
    var Super = function() {};
    Super.prototype = Animal6.prototype;
    Cat6.prototype = new Super();
    Cat6.prototype.constructor = Cat6;
})();

var cat6 = new Cat6('Bill');
cat6.eat6(); // eating6
console.log(
    'cat6 ~ Animal6:',
    cat6 instanceof Cat6, // true
    cat6 instanceof Animal6,  // true
);


/* ES6类继承 */
class Animal7 {
    constructor(name) {
        this.name = name;
    }
    eat7() {
        console.log('eating7');
    }
}

class Cat7 extends Animal7 {
    constructor(name) {
        super(name);
    }
}

var cat7 = new Cat7('Siri');
cat7.eat7(); // eating7
console.log(cat7.name); // Siri
