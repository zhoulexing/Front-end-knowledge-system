/* 
技巧型设计模式
技巧型设计模式是通过一些特定技巧来解决组件的某些方面的问题，这类技巧一般通过实践经验总结得到。
*/

/* 
链模式
通过在对象方法中将当前对象返回，实现对同一个对象多个方法的链式调用。从而简化对该对象的多个方法的多次调用。

使用链模式最经典的库就是jQuery，接下来通过一个例子来了解链模式和jQuery的实现方式。首先创建一个A对象，并重写它的原型对象，这个时候如果想
访问对象的length，需要实例化A对象，调用size方法或者通过length属性获取。
*/
function A() {}
A.prototype = {
    length: 2,
    size() {
        return this.length
    }
}
var a = new A();
console.log(a.size(), a.length);// 2 2

/* 
如果通过A.size()或A().size()获取就会报错，因为原型对象上的属性和方法必须通过实例化后才能获取。但是在使用jQuery的时候，并没有实例化，
而是直接调用方法获取。
*/
function A() {
    return A.fn;
}
A.fn = A.prototype = {
    length: 2,
    size() {
        return this.length
    }
}
console.log(A().size(), A.fn.size()); // 2 2

/* 
jQuery返回的是一个元素簇，但A方法返回的是一个A.fn对象，所以需要在A.fn对象中添加init方法，来获取元素。
*/
function A(selector) {
    return A.fn.init(selector);
}
A.fn = A.prototype = {
    length: 2,
    size() {
        return this.length
    },
    init(selector) {
        return document.getElementById(selector);
    }
}
console.log(A('demo')); // <div id="demo"></div>

/* 
经过改写之后，虽然可以返回元素，但是不能进行链式调用，比如执行A方法后继续执行size方法。所以在需要修改返回对象，
并且在返回对象上能够获取到元素。
*/
function A(selector) {
    return A.fn.init(selector);
}
A.fn = A.prototype = {
    length: 2,
    size() {
        return this.length
    },
    init(selector) {
        this[0] = document.getElementById(selector);
        this.length = 1;
        return this;
    }
}
var demo = A('demo');
var test = A('test');
console.log(demo[0]); // <div id="test"></div>
console.log(test[0]); // <div id="test"></div>

/* 
现在A方法技能获取到元素，又可以进行链式调用。但是如果通过A方法获取多个元素，则后面会覆盖掉前面，因为它们都是共享同一个对象A.fn。
为了让A方法返回对应的对象，需要对init方法进行实例化。
*/
function A(selector) {
    return new A.fn.init(selector);
}
A.fn = A.prototype = {
    length: 2,
    size() {
        return this.length
    },
    init: function(selector) {
        this[0] = document.getElementById(selector);
        this.length = 1;
        return this;
    }
}
console.log(A('demo').size()); // Uncaught TypeError

/* 
实例化init对象，可以解决对象覆盖的问题，但是A.fn对象上的size方法就获取不到了。为了使init方法在实例化后还能够获取到A.fn对象上的属性，
需要将A.fn对象赋值给init.property。
*/
function A(selector) {
    return new A.fn.init(selector);
}
A.fn = A.prototype = {
    constructor: A,
    length: 2,
    size() {
        return this.length
    },
    init: function(selector) {
        this[0] = document.getElementById(selector);
        this.length = 1;
        return this;
    }
}
A.fn.init.prototype = A.fn;
console.log(A('demo').size()); // 1

/* 
在jQuery中获取的元素更像一个数组，但是A方法的返回值是一个对象。为了使A方法的返回值类似数组，需要添加数组的一些方法。
*/
function A(selector) {
    return new A.fn.init(selector);
}
A.fn = A.prototype = {
    constructor: A,
    length: 2,
    size() {
        return this.length
    },
    init: function(selector) {
        this[0] = document.getElementById(selector);
        this.selector = selector;
        this.length = 1;
        return this;
    },
    push: [].push,
    sort: [].sort,
    splice: [].splice
}
A.fn.init.prototype = A.fn;
console.log(A('demo')); // [...]



/* 
委托模式
多个对象接收并处理同一请求，他们将请求委托给另一个对象统一处理请求。

javascript中的事件代理就是用委托模式将子元素的事件委托给更高层面上的父元素去绑定执行。委托模式和代理模式很像，区别不是很大。
但是我个人觉得委托模式强调的是替代目标完成某种功能，代理模式只是代理，功能的完成还是在目标对象上。
*/
// 委托翻译
function ChineseTranslater() {
    var dictionray = {
        'hello': '你好',
        'world': '世界'
    };
    this.translate = function(source) {
        return dictionray[source];
    }
}
var translater = new ChineseTranslater();
translater.translate('hello'); // 你好


/* 
数据访问对象模式
抽象和封装对数据源的访问与存储，DAO通过对数据源的管理方便对数据的访问与存储。

如下对本地存储localStorage的封装, 网上有很多例子，这里只是简单封装一下。
*/
function BaseLocalStorage(preId, timeSign) {
    this.preId = preId;
    this.timeSign = timeSign || '|-|';
}
BaseLocalStorage.prototype = {
    status: {
        SUCCESS: 0, // 成功
        FAILURE: 1, // 失败
        OVERFLOW: 2, // 移除
        TIMEOUT: 3, // 过期
    },
    storage: localStorage || window.localStorage,
    getKey: function(key) {
        return this.preId + key;
    },
    set: function(key, value, callback, time) {

    },
    get: function(key, callback) {

    },
    remove: function(key, callback) {

    }
}
BaseLocalStorage.prototype = {
    status: {
        SUCCESS: 0, // 成功
        FAILURE: 1, // 失败
        OVERFLOW: 2, // 移除
        TIMEOUT: 3, // 过期
    },
    storage: localStorage || window.localStorage,
    getKey: function(key) {
        return this.preId + key;
    },
    set: function(key, value, callback, time) {
        var status = this.status.SUCCESS;
        var key = this.getKey(key);
        try {
            time = new Date(time).getTime() || time.getTime();
        } catch (error) {
            time = new Date().getTime() + 1000 * 60 * 60 * 24 * 31;
        }
        try {
            this.storage.setItem(key, time + this.timeSign + value);
        } catch (error) {
            status = this.status.OVERFLOW;
        }
        callback && callback.call(this, status, key, value);
    },
    get: function(key, callback) {
        var status = this.status.SUCCESS;
        var key = this.getKey(key);
        var value = null;
        var timeSignLen = this.timeSign.length;
        var that = this;
        var index;
        var time;
        var result;
        try {
            value = that.storage.getItem(key);
        } catch (error) {
            result = {
                status: that.status.FAILURE,
                value: null,
            };
            callback && callback.call(this, result.status, result.value);
            return result;
        }
        if(value) {
            index = value.indexOf(that.timeSign);
            time = +value.slice(0, index);
            if(new Date(time).getTime() > new Date().getTime() || time == 0) {
                value = value.slice(index + timeSignLen);
            } else {
                value = null;
                status = that.status.TIMEOUT;
                that.remove(key);
            }
        } else {
            status = that.status.FAILURE;
        }
        result = {
            status: status,
            value: value
        }
        callback && callback.call(this, result.status, result.value);
        return result;
    },
    remove: function(key, callback) {
        var status = this.status.FAILURE;
        var key = this.getKey(key);
        value = null;
        try {
            value = this.storage.getItem(key);
        } catch (error) {
            
        }
        if(value) {
            try {
                this.storage.removeItem(key);
                status = this.status.SUCCESS;
            } catch (error) {
                
            }
        }
        callback && callback.call(this, status, status > 0 ? null : value.slice(value.indexOf(this.timeSign) + this.timeSign.length));
    }
}
var LS = new BaseLocalStorage('LS_');
LS.set('name', 'xiaoming', function() {
     console.log(arguments);
});
LS.get('name', function() {
    console.log(arguments);
});
LS.remove('name', function() {
    console.log(arguments);
});


/* 
节流模式
对重复的业务逻辑进行节流控制，执行最后一次操作并取消其他操作，以提高性能。

在javascript中节流模式解决了页面中的一些简单交互造成事件重复触发的问题。有时也可屏蔽掉一些无意触发的事件。与节流函数对应的是防抖函数。
*/
// 防抖函数的简单实现
function debounce(func, wait) {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, arguments);
        }, wait);
    }
}

// 节流函数的简单实现
function throttle(func, wait) {
    let timer;
    return function() {
        if(timer) return;
        timer = setTimeout(() => {
            func.apply(this, arguments);
            timer = null;
        }, wait);
    }
}

// 节流函数的时间戳版简单实现
function throttle(func, wait) {
    let last = 0;
    return function() {
        const currentTime = +new Date();
        if(currentTime - last > wait) {
            func.apply(this, arguments);
            last = +new Date();
        }
    }
}


/* 
简单模版模式
通过格式化字符串拼凑出视图避免创建视图时大量节点操作。

简单模版模式在意解决运用DOM操作创建视图时造成资源消耗大、性能低下、操作复杂等问题。这种方式常备用于大型框架创建视图操作中，如react中的jsx和vue中的template。
*/
function formateString(str, data) {
    return str.replace(/\{#(\w+)#\}/g, function(match, key) {
        return typeof data[key] === undefined ? '' : data[key];
    });
}
var _html = `<div><strong>{#strong#}</strong><span>{#span#}</span></div>`;
// <div><strong>a</strong><span>b</span></div>
console.log(formateString(_html, {strong: 'a', span: 'b'})); 


/* 
惰性模式
减少每次代码执行时的重复性的分支判断，通过对对象重定义来屏蔽原对象中的分支判断。
*/
var addEnent = function(dom, type, fn) {
    if(dom.addEventListener) {
        addEnent = function(dom, type, fn) {
            dom.addEventListener(type, fn, false);
        }
    } else if(dom.attachEvent) {
        addEnent = function(dom, type, fn) {
            dom.attachEvent('on'+type, fn);
        }
    } else {
        addEnent = function(dom, type, fn){
            dom['on'+type] = fn;
        }
    }
    addEnent(dom, type, fn);
};


/* 
参与者模式
在特定的作用域中执行给定的函数，并将参数原封不动地传递。

参与者模式利用闭包将参数保存下来，最常用的就是bind函数。
*/
// bind的简易版
function bind(fn, context) {
    return function() {
        return fn.apply(context, arguments);
    }
}


/* 
等待者模式
通过对多个异步进程监听，来触发未来发生的动作。

在Promise出来之前，对于多个异步请求的处理不是很方便。因为你不知道哪个异步请求会先返回值，也不好确定是否所有
的请求都返回了，一般的做法是进行深层次嵌套，请求多的话就变成了回调地狱。Promise通过链式的调用方式和all函数
很好的解决了这个问题。这里就不举例子了，有兴趣的可以看看Promise的模拟实现。
*/


/* 
总结
技巧型模式都是前人在工作过程中，通过大量的经验总结而形成的模式，比如jQuery库的设计、对数据的访问DAO等。
*/