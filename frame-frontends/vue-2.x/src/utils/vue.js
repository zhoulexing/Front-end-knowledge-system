/* 
    vue是基于Object.defineProperty实现响应式系统的 
    obj: 目标对象
    prop: 需要操作的目标对象的属性名
    descriptor: 描述符号

    return value 传入对象

    Object.defineProperty(obj, prop, descriptor)
*/

/* 第一步： 实现最基本的双向绑定 */
let v = new Vue({
    data: {
        test: 'I am test'
    }
});
v._data.test = 'Hello world';

class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data);
    }
}

function observer(obj) {
    if(!obj || (typeof obj != 'object')) {
        return;
    }
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key]);
    });
}

function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true, // 属性可枚举
        configurable: true, // 属性可被修改
        get: function reactiveGetter() {
            return val;
        },
        set: function reactiveSetter(newVal) {
            if(newVal === val) return;
            cb(newVal);
        }
    });
}

function cb(val) {
    /* 渲染视图 */
    console.log('视图更新啦～');
}




/* 第二步：处理依赖收集 */
// example1: 修改text3并不需要重新渲染
new Vue({
    template: 
        `<div>
            <span>{{text1}}</span>
            <span>{{text2}}</span>
        </div>`,
    data: {
        text1: 'text1',
        text2: 'text2',
        text3: 'text3'
    }
});

// example2: 改变globalObj的text1，v1， v2都需要进行改变
let globalObj = {
    text1: 'text1'
};
let v1 = new Vue({
    template: 
        `<div>
            <span>{{text1}}</span>
        </div>`,
    data: globalObj
});
let v2 = new Vue({
    template: 
        `<div>
            <span>{{text1}}</span>
        </div>`,
    data: globalObj
});


class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data);
        new Watcher();
        // 模拟render的过程， 为了触发test属性的get函数
        console.log('render~', this._data.test);
    }
}
function observer(obj) {
    if(!obj || (typeof obj != 'object')) {
        return;
    }
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key]);
    });
}
function defineReactive(obj, key, val) {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true, // 属性可枚举
        configurable: true, // 属性可被修改
        get: function reactiveGetter() {
            dep.addSub(Dep.target);
            return val;
        },
        set: function reactiveSetter(newVal) {
            if(newVal === val) return;
            dep.notify();
        }
    });
}
class Dep {
    constructor() { this.subs = [];}
    addSub(sub) { this.subs.push(sub); }
    notify() {
        this.subs.forEach(sub => {
            sub.update();
        });
    }
}
class Watcher {
    constructor() { Dep.target = this; }
    update() { console.log('视图更新啦~'); }
}
Dep.target = null;


/* 
    总结响应式系统原理
    1. 响应式的原理就是实现一个观察者，接受一个对象参数
    2. 观察者遍历对象的所有参数，然后通过Object.defineProperty去设置set和get方法
    3. defineProperty中的get方法，会将Watcher对象添加到订阅者中
    4. defineProperty中的set方法，会遍历所有的订阅者，并执行订阅者的更新方法
*/

/* 第三步： 实现一个VNode */
class VNode {
    constructor(tag, data, children, text, elm) {
        this.tag = tag;
        this.data = data;
        this.children = children;
        this.text = text;
        this.elm = elm;
    }
}

function createEmptyVNode() {
    const node = new VNode();
    node.text = '';
    return node;
}

function createTextVNode(val) {
    return new VNode(undefined, undefined, undefined, String(val));
}

function cloneVNode(node) {
    const cloneVNode = new VNode(
        node.tag,
        node.data,
        node.children,
        node.text,
        node.elm
    );
    return cloneVNode;
}

/*
    第四步： 模版编译 
    编译分为parse、optimize与generate三个阶段
    1. parse
        parse会用正则方式将template模版进行字符串解析，得到指令、class、style等数据，形成AST（抽象语法树），这个过程与浏览器解析html类似
    2. optimize
        优化，这个涉及到后面patch的过程，因为patch的过程实际上是将VNode节点进行一层一层的比对，然后将差异更新到视图上。
        那么对于一些静态节点是不需要根据数据变化而产生变化的，这些节点我们没有比对的需求，可以跳过这些静态节点的比对，
        optimize就是用来标记静态节点的。
    3. generate
        generate会将AST转化成render function字符串，最终得到render的字符串以及staticRenderFns字符串
*/

/* 
    第五步： patch的核心diff算法 
    diff是通过同层的树节点进行比较而非对树进行逐层搜索遍历模式，所以时间复杂度是O(n)
*/

/* 
    第六步： 批量异步更新策略及nextTick原理
    简单回顾一下，其实就是一个“setter -> Dep -> Watcher -> patch -> 视图”的过程。
    至此，我们可以想象一个场景，当我们点击一个按钮后，将data中的数据改变100次，那是不是会重复渲染100次呢？
    vue肯定不会以如此低效的方法来处理。在默认情况下，每次触发某个数据的setter方法后，对应的Watcher对象其实
    会被push进一个队列中，在下一个tick的时候将这个队列全部拿出来run一遍。
*/
class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data);
        new Watcher();
        // 模拟render的过程， 为了触发test属性的get函数
        console.log('render~', this._data.test);
    }
}
function observer(obj) {
    if(!obj || (typeof obj != 'object')) {
        return;
    }
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key]);
    });
}
function defineReactive(obj, key, val) {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true, // 属性可枚举
        configurable: true, // 属性可被修改
        get: function reactiveGetter() {
            dep.addSub(Dep.target);
            return val;
        },
        set: function reactiveSetter(newVal) {
            if(newVal === val) return;
            dep.notify();
        }
    });
}
class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    notify() {
        this.subs.forEach(sub => {
            sub.update();
        });
    }
}
Dep.target = null;

let uid = 0;
class Watcher {
    constructor() {
        Dep.target = this;
        this.id = ++uid;
    }
    update() {
        console.log('watch' + this.id + ' update');
        queueWatcher(this);
    }
    run() {
        console.log('watch' + this.id + ' 视图更新啦～');
    }
}

let has = {};
let queue = [];
let waiting = false;
function queueWatcher(watcher) {
    const id = watcher.id;
    if(has[id] == null) {
        has[id] = true;
        queue.push(watcher);

        if(!waiting) {
            waiting = true;
            nextTick(flushSchedulerQueue);
        }
    }
}
let callbacks = [];
let pending = false;
function nextTick(cb) {
    callbacks.push(cb);
    if(!pending) {
        pending = true;
        setTimeout(flushCallbacks, 0);
    }
}
function flushCallbacks() {
    pending = false;
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for(let i = 0; i < copies.length; i++) {
        copies[i]();
    } 
}
function flushSchedulerQueue() {
    let watcher, id;
    for(let index = 0; index < queue.length; index++) {
        watcher = queue[index];
        has[id] = null;
        watcher.run();
    }
    waiting = false;
}



/* 
    第七步：  vuex状态管理
    在Store的构造函数中对state进行响应式化
*/
class Store {
    constructor() {
        this._vm = new Vue({
            data: {
                $$state: this.state
            }
        });
    }
}
