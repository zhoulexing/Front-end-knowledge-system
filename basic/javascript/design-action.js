/* 
行为型设计模式：用于不同对象之间职责划分或算法抽象，行为型设计模式不仅仅涉及类和对象，还涉及类或对象之间的交流模式并加以实现。
*/

/* 
模版方法模式
父类中定义一组操作算法骨架，而将一些实现步骤延迟到子类中，使得子类可以不改变父类的算法结构的同时可重新定义算法中某些实现步骤。

模版方法是基于继承的设计模式，类似于java中的抽象类。比如说泡茶这个事件，虽然不同种类的茶有不同的泡法，但它们大体的流程是一样的，
基于此种情况我们可以将泡茶流程抽象到父类中，然后子类继承父类并根据自身种类定义细节。
*/
class Tea {
    constructor(type) {
        this.init = () => {
            this.boilWater();
            this.brew();
            this.pourInCup();
            console.log(type);
        }
    }

    boilWater() {
        console.log('把水煮沸');
    }

    brew() {
        throw new Error('子类必须重新');
    }

    pourInCup() {
        throw new Error('子类必须重写');
    }
}

class GreenTea extends Tea {
    constructor(type) {
        super(type);
    }

    brew() {
        console.log('用100度水泡茶');
    }

    pourInCup() {
        console.log('倒完水之后摇晃三圈');
    }
}

var greenTea = new GreenTea('GreenTea');
greenTea.init();


/* 
观察者模式
又被称作发布-订阅模式或消息机制，定义了一种依赖关系，解决了主体对象与观察者之间功能的耦合。

观察者模式在实际编码过程中用的还是蛮多的，尤其是在框架设计中，比如vue的双向绑定原理、redux中的监听函数还有浏览器的事件机制，用的都是观察者模式或者叫
发布-订阅模式。其实观察者模式并不等于发布-订阅模式，它们之间的区别就在于调度中心的位置不一样。
*/
// 观察者模式
class Subject {
    constructor(name) {
        this.observers = [];
    }

    add(observer) {
        this.observers.push(observer);
    }

    remove(observer) {
        let index = this.observers.findIndex(item => item === observer);
        index >=0 && this.observers.splice(index, 1);
    }

    notify() {
        for(let observer of this.observers) {
            observer.update();
        }
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }

    update() {
        console.log(this.name);
    }
}

let subject = new Subject();
let obs1 = new Observer('前端开发者');
let obs2 = new Observer('后端开发者');
subject.add(obs1);
subject.add(obs2);
subject.notify();

// 发布-订阅模式
const pubSub = {
    list: {},

    subscribe(key, fn) {
        if(!this.list[key]) {
            this.list[key] = [];
        }
        this.list[key].push(fn);
    },

    unSubscribe(key, fn) {
        let fnList = this.list[key];
        if(!fnList) return false;
        if(!fn) {
            fnList.length = 0;
        } else {
            let index = fnList.findIndex(item => item === fn);
            fnList.splice(index, 1);
        }
        return true;
    },

    publish(key, ...args) {
        for(let fn of this.list[key]) {
            fn.call(this, ...args);
        }
    }
};

pubSub.subscribe('onWork', function(time) {
    console.log('上班了:', time);
});
pubSub.subscribe('offWork', function(time) {
    console.log('下班了:', time);
});

pubSub.publish('onWork', '8:00:00'); 
pubSub.publish('offWork', '18:00:00');


/* 
状态模式
当一个对象的内部状态改变时，会导致其行为的改变，这看起来像是改变了对象。

在工作过程中，经常会碰到这样的业务，根据不同的状态做不同的处理，常见的实现方式就是通过if else。这样状态多了就不好维护，而且对于不同
状态的行为组合也不好处理。比如说我们小时候经常玩的超级玛丽游戏：它有各种各种的动作，跳跃、移动、射击、蹲下等。除此之外可以跳起来再射击。
针对这种情况，可以用状态模式实现如下。
*/
function MarryState() {
    let currentState = {};

    const states = {
        jump() {
            console.log('jump');
        },
        move() {
            console.log('move');
        },
        shoot() {
            console.log('shoot');
        },
        squat() {
            console.log('squat');
        }
    }

    const changeState = function () {
        let arg = arguments;
        currentState = {};
        if(arg.length) {
            for(let i = 0, length = arg.length; i < length; i++) {
                currentState[arg[i]] = true;
            }
        }
        return this;
    }

    const goes = function() {
        for(let key in currentState) {
            states[key] && states[key]();
        }
        return this;
    }

    return {
        changeState,
        goes
    }
}
MarryState()
    .changeState('jump', 'shoot')
    .goes() // jump shoot
    .goes() // jump shoot
    .changeState('squat', 'move')
    .goes(); // squat, move


/* 
策略模式
将定义的一组算法封装起来，使其相互之间可以替换。封装的算法具有一定的独立性，不会随客户端变化而变化。

策略模式和状态模式很像，但是本质不同。策略模式强调动态选择行为，不同策略之间是平行的关系，可相互替换。状态模式重在抽象数据，
调用的时候因为状态的不同而表现出不同的行为，且行为之间不可替代，状态可实现转移。
*/
const PriceStrategy = (function() {
    const stragtegy = {
        return30(price) {
            return +price + parseInt(price / 100) * 30;
        },
        return50(price) {
            return +price + parseInt(price / 100) * 50;
        },
        percent80(price) {
            return price * 100 * 80 / 1000;
        },
        percent90() {
            return price * 100 * 90 / 1000;
        }
    };
    return function(algorithm, price) {
        return stragtegy[algorithm] && stragtegy[algorithm](price);
    }
});


/* 
职责链模式
解决请求的发送者与请求的接受者之间的耦合，通过职责链上的多个对象对分解请求流程，实现请求在多个对象之间的传递，直到最后一个对象完成请求的处理。

职责链主要就是明确各个部分的功能，将各个部分串联起来形成一条职责链完成某个功能。比如说我们需要对输入框中的内容进行验证，一般会通过各种if语句
来进行判断，这样维护起来比较麻烦，所以可以通过职责链模式进行优化。下面的这个例子中的判断逻辑比较简单，如果复杂的话，职责链模式的优势就能很好的
体现出来，尤其是要添加判断逻辑的时候。
*/
// 检验逻辑 
function check(message) {
    if(!message) {
        return '不能为空';
    }
    if(message.length < 8 || message.length > 20) {
        return '长度要介于8-2之间';
    }
    if(/傻逼/.test(message)) {
        return '不能有敏感词汇';
    }
}

// 职责链模式
function Chain(fn) {
    this.fn = fn;
    this.next = null;
}
Chain.prototype.setNext = function(next) {
    this.next = next;
}
Chain.prototype.check = function() {
    const result = this.fn.apply(this, arguments);
    if(result === 'nextSuccessor') {
        return this.next && this.next.check.apply(this.next, arguments);
    }
    return result;
}
function checkEmpty(message) {
    if(!message) {
        return '不能为空';
    }
    return 'nextSuccessor';
}
function checkLength(message) {
    if(message.length < 8 || message.length > 100) {
        return '长度要介于8-2之间';
    }
    return 'nextSuccessor';
}
function checkSensitiveWord(message) {
    if(/傻逼/.test(message)) {
        return '不能有敏感词汇';
    }
    return 'nextSuccessor';
}
var chainEmpty = new Chain(checkEmpty);
var chainLength = new Chain(checkLength);
var chainSensitiveWord= new Chain(checkSensitiveWord);
chainEmpty.setNext(chainLength);
chainLength.setNext(chainSensitiveWord);
chainEmpty.check(''); // 不能为空
chainEmpty.check('111'); // 长度要介于8-2之间
chainEmpty.check('12345674傻逼43'); // 不能有敏感词汇


/* 
命令模式
将请求与实现解耦并封装成独立对象，从而使不同的请求对客户端的实现参数化。

命令模式把请求模块和实现模块解偶。命令模式把创建模块的逻辑封装在一个对象里，并让这个对象提供一个参数化
的请求接口，通过调用这个接口实现该对象内部方法的调用。
*/
var CanvasCommand = (function() {
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    return {
        // 填充色彩
        fillStyle(c) {
            ctx.fillStyle = c;
        },
        // 填充矩形
        fillRect(x, y, width, height) {
            ctx.fillRect(x, y, width, height);
        },
        // 填充字体
        fillText(text, x, y) {
            ctx.fillText(text, x, y);
        }
    }
})();
CanvasCommand.fillStyle('red');
CanvasCommand.fillRect(0, 0, 100, 100);
CanvasCommand.fillText('Hello', 100, 100);


/* 
访问者模式
针对于对象结构的元素，定义在不改变该对象的前提下访问结构中元素的新方法。

这种模式主要是在不改变原对象的情况下，增加愿对象的功能。这样原对象的新功能可以随着访问者改变而改变。
解决了稳定的数据结构和易变的操作耦合问题。比如在js中利用call和apply方法在不改变原对象的功能下，使对象拥有数组的push、pop和splice方法。
*/
var Visitor = (function() {
    return {
        splice() {
            var args = Array.prototype.splice.call(arguments, 1);
            return Array.prototype.splice.apply(arguments[0], args);
        },
        push() {
            var len = arguments[0].length || 0;
            var args = this.splice(arguments, 1);
            arguments[0].length = len + arguments.length - 1;
            return Array.prototype.push.apply(arguments[0], args);
        },
        pop() {
            return Array.prototype.pop.apply(arguments[0]);
        }
    }
})();
var obj = new Object();
console.log(obj.length); // undefined
Visitor.push(obj, 1, 2, 3);
console.log(obj.length); // 3
Visitor.push(obj, 4, 5);
console.log(Visitor.pop(obj)); // 5
console.log(Visitor.splice(obj, 2)); // 3, 4 


/* 
中介者模式
通过中介者对象封装一些列对象之间的交互，使对象之间不再相互引用，降低他们之间的耦合。有时中介者对象也可改变对象之间的交互。

中介，也就是第三方，本来是双方直接交互，引入中介之后，所有交互都必须通过第三方来完成。中介者模式和发布/订阅模式很像，甚至不仔细看就发现不了差异。
主要区别如下：1）中介者模式中每个模块都可以发布消息，而发布/订阅模式中观察者只能被动接收消息；2）中介者是星状结构，发布/订阅机制是一个控制层。
*/
var mediator = (function() {
    let topics = {};
    let subUid = -1;
    
    function publish(topic, args) {
        if(!topics[topic]) {
            return false;
        }
        let subscribers = topics[topic];
        let len = subscribers ? subscribers.length : 0;
        while (len--) {
            subscribers[len].func(topic, args);
        }
        return true;
    }

    function subscribe(topic, func) {
        if (!topics[topic]) {
            topics[topic] = [];
        }
        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };

    return {
        publish: publish,
        subscribe: subscribe,
        installTo(obj) {
            obj.publish = publish;
            obj.subscribe = subscribe;
        }
    }
})();

var mod1 = {
    run(arg) {
        console.log('mod1 received ' + arg);
    }
};
var mod2 = {};
mediator.installTo(mod1);
mediator.installTo(mod2);

// mod1订阅消息
mod1.subscribe('topic', function(topic, arg) {
    mod1.run(arg);
});

// mod2发布消息
mod2.publish('topic', 'data');


/* 
备忘录模式
在不破坏对象的封装性的前提下，在对象之外捕获并保存该对象内部的状态以便日后对象使用或者对象恢复到以前的某个状态。

备忘录模式就是将数据或状态缓存，与之前讲的单例模式和享元模式类似。
*/
function Page() {
    var cache = {};
    return function(page, fn) {
        if(cache[page]) {
            fn(cache[page]);
        } else {
            $.post('/url', data => {
                cache[page] = data;
                fn(data);
            });
        }
    }
}


/* 
迭代器模式
在不暴露对象内部结构的同时，可以顺序地访问聚合对象内部的元素。

javascript中的Array、Map、Set原声就部署了迭代器，下面自己实现一个简单的迭代器。
*/
function each(arr, callback) {
    for (var i = 0, l = arr.length; i < l; i++){
        callback.call(arr[i], i, arr[i]); 
    }
}
each([1, 2, 3], function(i, n){
    console.log(i, n);// 0 1,  1 2,  2 3
});


/* 
解释器模式
对于一种语言，给出其文法表示形式，并定义一种解释器，通过使用这种解释器来解释语言中定义的句子。

Chrome的v8引擎就是javascript语言的解释器，还有把虚拟dom翻译为真实dom的解释器。
*/
// 模拟示例
var vnode = {
    tag: 'div',
    key: '001',
    props: {
        class: 'container',
        style: ''
    },
    children: []
}
function createDom(vnode) {
    const dom = document.createElement(vnode.tag);
    if(vnode.props){
        Object.keys(vnode.props).forEach(key => {
            const value = vnode.props[key];
            setAttribute(dom, key, value);
        } );
    }
    vnode.children.forEach(child => render(child, dom));  
    return dom ;
}