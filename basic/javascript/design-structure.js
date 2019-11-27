/* 
结构型设计模式：结构型设计模式关注于如何将类或者对象组合成更大、更复杂的结构，以简化设计。主要包含以下几类。
*/

/* 
外观模式： 也叫门面模式。为一组复杂的子系统提供统一的访问接口，通过这个接口使得访问子系统更加的方便。在javascript中最常见的就是对浏览器兼容性处理的封装。

比如在家看电影，需要打开音响，再打开投影仪，再打开播放器等。如果引用外观模式，则直接打开电影设备即可。简单理解就是将一系列简单的操作封装成一个操作，对外提供。
这种方式不仅可以简化复杂接口，还可以屏蔽使用者对子系统的直接访问。具体见下面对DOM添加事件的封装和阻止事件的默认行为以及取消冒泡的封装。
*/
function addEvent(el, type, fn) {
    if(el.addEventListener) {
        el.addEventListener(type, fn, false);
    } else if(el.addEvent) {
        el.addEvent(`on${type}`, fn);
    } else {
        el[`on${type}`] = fn;
    }
}

var tools = {
    stopPropagation(e) {
        if(e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    },
    preventDefault(e) {
        if(e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    },
    stopEvent(e) {
        this.stopPropagation(e);
        this.preventDefault(e);
    }
}

// TODO：适配器、桥接、装饰者、代理

/* 
适配器模式：将一个类或者对象的接口翻译成某个指定的系统可以使用的另一个接口。生活中最常见的适配器如插线板，转接口等。
在前端项目中，适配器的模式适用场景一般有以下三种情况：库的适配、参数的适配和数据的适配。
*/

/* 
库的适配：比如说我们需要对用户的操作行为进行记录，好提升产品的质量。最初用的是我们系统自定义的一套接口，在系统的各个地方都有调用到。
*/
// A页面
LT.log('module', 'user', 'ip', 'time');

// B页面
LT.log('module', 'user', 'ip', 'time');
LT.log('module', 'user', 'ip', 'time');


// C页面
LT.log('module', 'user', 'ip', 'time');

/* 
现在这一块的工作交到其他部门来做，所以需要将埋点的接口换成其他部门踢空的库如MT，但MT库的方法名和参数于LT都不一样，这个时候就用到库的适配。
如下，只需要添加一个适配器，就不用去每个页面修改代码了。
*/
var LT = {
    log(module, user, ip, time) {
        MT.track(module, {
            username: user,
            userip: ip,
            operationTime: time 
        });
    }
}

/* 
参数的适配：参数的适配主要是针对方法的调用，比如某个方法接受一个对象作为参数，这个对象中某些属性有默认值，所以不是每次调用都需要传相应的值。
这时可以通过参数适配器进行简化。
*/
function doSomeThing(config) {
    const defaultConfig = {
        name: 'lt',
        title: '参数适配',
        desc: null,
        os: null
    }
    for(let key in config) {
        defaultConfig[key] = config[key] || defaultConfig[key];
    }
    // doSomeThing
}

/* 
数据的适配：数据的适配是最为常见的场景，通常情况是后端返回的数据格式不符合我们的要求，需要对其进行转化才能适配前端的应用。
*/

// 后端返回的数据
var data = [
    {
        day: '周一',
        count: 100
    },
    {
        day: '周二',
        count: 87
    },
    {
        day: '周三',
        count: 34
    },
    {
        day: '周四',
        count: 130
    },
    {
        day: '周五',
        count: 69
    },
]

// echarts需要的x轴的数据和y轴的数据
var x = ['周一', '周二', '周三', '周四', '周五'];
var y = [100, 87, 34, 130, 69];

// x轴和y轴的适配器
function xAdapter(data) {
    return data.map(item => item.day);
}
function yAdapter(data) {
    return data.map(item => item.count);
}


/* 
代理模式：为一个对象提供一个替代品或者占位符，以便控制对它的访问。当我们不方便或者不满足访问这个对象时，可考虑使用一个替身对象来控制对象的访问，如代购、经纪人等。

javascript中常见的是虚拟代理和缓存代理还有ES6新出来的Proxy，接下来通过图片的懒加载、数据计算缓存和ES6对对象的代理3个示例了解代理模式。
*/

// 图片懒加载
const myImage = (function() {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc(src) {
            imgNode.src = src;
        }
    }
})();
const imageProxy = (function() {
    const img = new Image();
    img.onload = function() {
        myImage.setSrc(this.src);
    };
    return {
        setSrc(src) {
            myImage.setSrc('./loading.gif');
            img.src = src;
        }
    }
})();
imageProxy.setSrc('./user.png');

// 数据计算缓存
function sum(numList) {
    return numList.reduce((total, num) => {
        total += num;
        return total;
    }, 0);
}
const sumProxy = (function() {
    const totalCache = {};
    return function(numList) {
        var key = numList.join('-');
        if(totalCache[key]) {
            return totalCache[key];
        } else {
            return totalCache[key] = sum(numList);
        }
    }
})();

// ES6Proxy
const obj = {
    name: 'Tom',
    age: 20
};
const proxyObj = new Proxy(obj, {
    get(target, key) {
        if(key === 'name') {
            return 'Tom';
        } else {
            return target[key];
        }
    },
    set(target, key, value) {
        if(key === 'name') {
            return;
        } else {
            target[key] = value;
        }
    }
});
console.log(proxyObj.name); // Tom
console.log(proxyObj.age); // 20
proxyObj.name = 'Bob';
proxyObj.age = 27;
console.log(proxyObj.name); // Tom
console.log(proxyObj.age); // 27


/* 
装饰者模式：在不改变原有对象的基础上，通过对其进行包装扩展（添加属性或者方法）使原有对象可以满足用户的更复杂需求。

假如现在在某个系统中每个插入日志的地方之前，输出插入时间, 具体如下。通过装饰者模式，不需要改动之前的代码，就很简单的实现功能。除了这个例子，装饰者模式在react中用的还是蛮多的，最常见的就是高阶组件。
*/
// utils.js
export const insertLog = function(params) {
    console.log('插入日志');
}
// A页面
import { insertLog } from './utils';
insertLog(params);
// B页面
import { insertLog } from './utils';
insertLog(params);

// utils.js
const insertLogDecorator = function(_insertLog) {
    return function() {
        const now = new Date();
        console.log('插入时间：', now);
        return _insertLog.apply(this, arguments);
    }
}
// A页面
import { insertLog, insertLogDecorator } from './utils';
insertLog = insertLogDecorator(insertLog);
insertLog(params);
// B页面
import { insertLog, insertLogDecorator } from './utils';
insertLog = insertLogDecorator(insertLog);
insertLog(params);


/* 
桥接模式：将抽象部分和它的实现部分分离，使它们都可以独立的变化。javascript中最常用的就是通过回调函数来进行桥接。

比如对事件的处理，如下，通过桥接模式可以将getDataById方法抽离出来，没有和事件绑在一起，给了更大的设计自由。除此之外，react中对于父子
组件方法的调用大量的用到了桥接模式。
*/
function getDataById(id, callback) {
    asyncRequest('GET', `data/uri?id=${id}`, function(resp) {
        callback(resp);
    });
}
window.addEventListener('load', getDataByIdBridge, false);
function getDataByIdBridge(e) {
    getDataById('acb', function() {
        // do some things
    });
}


/* 
组合模式：又称部分整体模式，将对象组合成树形结构以表示“部分整体”的层级结构。组合模式使得用户对单个对象和组合对象的使用性一致。

具体以扫描文件夹为例，如果在扫描的过程中，发现是文件夹继续扫描，如果是文件则打印出文件名称。
*/
class Folder {
    constructor(name) {
        this.name = name;
        this.fileList = [];
    }

    add(file) {
        this.fileList.push(file);
    }

    scan() {
        this.fileList.forEach(file => {
            file.scan();
        });
    }
}

class File {
    constructor(name) {
        this.name = name;
    }

    add(file) {
        console.log(`${file}不能再加了`);
    }

    scan() {
        console.log(`开始扫描: ${this.name}`);
    }
}
let totalFolder = new Folder('总文件夹');
let folder1 = new Folder('电影');
let folder2 = new Folder('音乐');

let file1 = new File('a.mp4');
let file2 = new File('b.mp3');

folder1.add(file1);
folder2.add(file2);
totalFolder.add(folder1);
totalFolder.add(folder2);
totalFolder.scan(); 
// 开始扫描: a.mp4
// 开始扫描：b.mp3


/* 
享元模式：是一种用于性能优化的模式，运用共享的技术有效的支持大量的细粒度的对象，避免对象间拥有相同内容造成多余的开销。享元对象要求将对象的属性划分为内部状态和外部状态，
内部状态存储于对象内部，可以被一些对象共享，独立于具体场景，外部状态取决于具体的场景，根据场景变化。

通过下面的例子，计算一下使用享元模式和不使用享元模式的情况下花费时间的比较。
*/
function Car(type, alias, owner) {
    this.type = type;
    this.alias = alias;
    this.owner = owner;
}
function addCar() {
    const cars = [];
    for(let i = 0; i < 1000000; i++) {
        cars.push(new Car('BMW', '宝马', 'own'));
    };
}
function addCarDecorator(method) {
    return function() {
        let start = new Date().getTime();
        method.apply(null, arguments);
        let end = new Date().getTime();
        console.log(end - start);
    }
}
addCarDecorator(addCar)(); // 222


const carFactory = (function() {
    const car = {};
    return function(type, alias, owner) {
        if(car[type + alias + owner]) {
            return car[type + alias + owner];
        } else {
            return car[type + alias + owner] = new Car(type, alias, owner);
        }
    }
})();
function addCar2() {
    const cars = [];
    for(let i = 0; i < 1000000; i++) {
        cars.push(carFactory('BMW', '宝马', 'own'));
    };
}
addCarDecorator(addCar2)(); // 41


/* 
总结：以上讲了7种设计模式，外观模式、组合模式和享元模式比较好理解，主要是对代码的拆解和重新组合，以达到代码的最小化和性能的最大化。
适配器模式、代理模式、装饰者模式和桥接模式是处理俩个对象之间的关系，以达到行为的新增、控制以及转化。
*/


