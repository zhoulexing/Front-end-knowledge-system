/* 
在团队项目开发过程中，经常会以同样的模式去解决类似的问题，将这些模式提炼出来，会发现复杂的问题简单很多，
并且书写的代码思路清晰且结构简明。最近正好在看javascript设计模式这本书，所以对于书中的设计模式做一个回顾和总结。主要分为以下几篇：
创建型设计模式、结构型设计模式、行为型设计模式、技巧型设计模式、架构型设计模式六篇。今天先来看下第一篇创建型设计模式。

创建型设计模式是一类处理对象的设计模式，通过某种方法控制对象的创建来避免基本对象创建时可能导致设计上的问题或增加设计上的复杂度。
先来看最基本也最简单的简单工厂模式。
*/

/* 
简单工厂模式：又叫静态工厂方法，由一个工厂对象决定创建某一种产品对象类的实例，主要用来创建同一类对象。
举个例子：比如体育商品店卖体育器材，需要介绍各个体育用品，比如说篮球和足球，每个用品对应的是一个类，具体如下。
*/
function Basketball() {
    this.intro = '篮球盛行于美国';
}
Basketball.prototype.getMember = function() {
    console.log('每个队需要5名队员');
}
Basketball.prototype.getBallSize = function() {
    console.log('篮球很大');
}

function Football() {
    this.intro = '足球在世界范围内都很流行';
}
Football.prototype.getMember = function() {
    console.log('每个队需要11名队员');
}
Football.prototype.getBallSize = function() {
    console.log('足球很大');
}

/* 
现在介绍每个体育用品的时候，都需要找到对应的类进行实例化，比较麻烦，所以通过下面的工厂类就可以更方便的实例化各个用品，而不需要再找到对应的实例。
*/
function SportsFactory(name) {
    switch(name) {
        case 'NBA':
            return new Basketball();
        case 'wordCup':
            return new Football();
    } 
}


/* 
针对上面的情况，如果再加一类体育用品，既需要添加一个用品类，又需要修改工厂类，比较麻烦。解决这个问题，可以看下工厂方法模式。
工厂方法模式：通过对产品类的抽象使其创建业务主要负责用于创建多类产品的实例。
这样如果再添加某类体育用品，直接添加相应的类即可。
*/
function SportsFactory(type, intro) {
    if(this instanceof SportsFactory) {
        return new this[type](intro);
    }
    return new SportsFactory(type, intro);
}
SportsFactory.prototype.Basketball = function(intro) {
    this.intro = intro;
    console.log('每个队需要5名队员');
}
SportsFactory.prototype.Football = function(intro) {
    this.intro = intro;
    console.log('每个队需要11名队员');
}
var basketball = new SportsFactory('Basketball', '篮球盛行于美国');
var football = new SportsFactory('Football', '足球在世界范围内都很流行');


/* 
无论是简单工厂模式还是工厂方法模式，都只能适用于同类，如果是类簇的话，上面的模式就不行了。接下来了解下抽象工厂模式。
抽象工厂模式：通过对类的工厂抽象使其业务用于对产品类簇的创建，而不负责创建某一类产品的实例。
简单理解就是子类继承父类，并重新实现父类的抽象方法，否则调用的话会报错。
*/
function SportsFactory(subType, superType) {
    if(typeof SportsFactory[superType] === 'function') {
        function F() {};
        F.prototype = new SportsFactory[superType]();
        subType.constructor = subType;
        subType.prototype = new F();
    } else {
        throw new Error('未创建该抽象类');
    }
}
SportsFactory.Ball = function() {
    this.type = 'ball';
}
SportsFactory.Ball.prototype.getSize = function() {
    return new Error('抽象方法不能调用');
}

SportsFactory.Tool = function() {
    this.type = 'tool';
}
SportsFactory.Tool.prototype.getWeight= function() {
    return new Error('抽象方法不能调用');
}

function Basketball(size, price) {
    this.size = size;
    this.price = price;
}
SportsFactory(Basketball, 'Ball');
Basketball.prototype.getSize = function() {
    return this.size;
}
var basketball = new Basketball(25);
console.log(basketball.type, basketball.getSize()); // ball, 25

function Dumbbell(weight) {
    this.weight = weight;
}
SportsFactory(Dumbbell, 'Tool');
Dumbbell.prototype.getWeight= function() {
    return this.weight;
}
var dumbbell = new Dumbbell(38);
console.log(dumbbell.type, dumbbell.getWeight()); // ball, 38

/* 
工厂模式主要是为了创建对象实例或类簇，不关心你创建的整个过程，关心的是最终产出的是什么。如果创建对象的过程比较复杂，比如说构建一个人，不仅要知道性别，
年龄，还有兴趣爱好等。虽然最终也会创建一个对象，但是更关心的是创建的过程。这个时候要用到建造者模式了。
建造者模式：将一个复杂对象的构建层与其表示层相互分离，同样的构建过程可采用不同的表示。
下面的例子比较简单，但是可以发现它与工厂模式不同的地方在于它更关注对象的创建过程。
*/
function Human(sex, age) {
    this.sex = sex;
    this.age = age;
}
function Basketball() {
    this.type = 'basketball';
    this.intro = '每个队需要5名队员';
}
function Football() {
    this.type = 'football';
    this.intro = '每个队需要11名队员';
}
function Sports(name) {
    switch(name) {
        case 'NBA':
            return new Basketball();
        case 'wordCup':
            return new Football();
    }
}
function Person(sex, age, name) {
    var _person = new Human(sex, age);
    _person.sport = Sports(name);
    _person.height = 180;
    _person.name = 'Tom';
    // ...
    return _person;
}

/* 
在创建对象的过程中，对于差别类似的对象其实有很多的属性和方法是可以共享的，对于这种情况最常见的实现方式是继承，而对应的模式就是原型模式。
原型模式：用原型实例指向创建对象的类，使用于创建新的对象的类共享原型对象的属性以及方法。
*/
function Sports(price, weight) {
    this.price = price;
    this.weight = weight;
}
Sports.prototype.running = function() {
    return 'running';
}

function Basketball(price, weight) {
    Sports.call(this, price, weight);
}
Basketball.prototype = new Sports();
Basketball.prototype.running = function() {
    return 'basketball running';
}
function Football(price, weight) {
    Sports.call(this, price, weight);
    this.intro = '足球在世界范围内都很流行';
}
Football.prototype = new Sports();
Football.prototype.running = function() {
    return 'football running';
}
var basketball = new Basketball(100, 25);
console.log(
    basketball.price, 
    basketball.weight, 
    basketball.running()
); // 100, 50, basketball running
var fontball = new Football(200, 50);
console.log(
    fontball.price, 
    fontball.weight, 
    fontball.running()
); // 200 50 football running

/* 
关于单例模式，在实际工作过程中应该是最常见的了，比如经常用的第三方库如jQuery，在全局中只有一个实例。这种模式最明显的好处就是为它提供了一个命名空间，除此之外，
还有一个作用就是来管理代码库的各个模块。
单例模式：又被称为单体模式，是只允许实例化一次的对象类，有时我们也用一个对象来规划一个命名空间，井井有条地管理对象上的属性和方法。
接下来看一下，单例模式对静态变量的管理和惰性单例。
*/
var Conf = (function() {
    var conf = {
        MAX_NUM: 100,
        MIN_NUM: 1,
        COUNT: 1000
    }
    return {
        get: function(name) {
            return conf[name] ? conf[name] : null
        }
    }
})();
console.log(Conf.get('COUNT')); // 1000

var LazySingle = (function() {
    var _instance = null;
    function Single() {
        return {
            getName() {},
            age: 25,
        }
    }
    return function() {
        if(!_instance) {
            _instance = Single();
        }
        return _instance;
    }
})();


/* 
总结：关于创建型设计模式介绍了以下几类，分别为简单工厂模式、工厂方法模式、抽象工厂模式、建造者模式、原型模式和单例模式。
*/


