/* 
架构型设计模式
架构型设计模式是一类框架结构，通过提供一些子系统，指定他们的职责，并将它们条理清晰地组织在一起。
*/

/* 
同步模块模式
请求发出后，无论模块是否存在，立即执行后续的逻辑，实现模块开发中对模块的立即引用。
*/
var F = F || {};

// 定义模块方法
F.define = function(str, fn) {
    var parts = str.split(".");
    var old = (parent = this);
    var i = (len = 0);
    if (parts[0] === "F") {
        parts = parts.slice(1);
    }
    if (parts[0] === "define" || parts[0] === "module") {
        return;
    }
    for (len = parts.length; i < len; i++) {
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        old = parent;
        parent = parent[parts[i]];
    }
    if (fn) {
        old[parts[--i]] = fn();
    }
    return this;
};

// 调用模块方法
F.module = function() {
    var args = [].slice.apply(arguments);
    var fn = args.pop();
    var parts = args[0] && args[0] instanceof Array ? args[0] : args;
    var modules = [];
    var modIDs = "";
    var parent,
        i = 0,
        ilen = parts.length,
        j,
        jlen;
    while (i < ilen) {
        if (typeof parts[i] === "string") {
            parent = this;
            modIDs = parts[i].replace(/^F\./, "").split(".");
            for (j = 0, jlen = modIDs.length; j < jlen; j++) {
                parent = parent[modIDs[j]] || false;
            }
            modules.push(parent);
        } else {
            modules.push(parts[i]);
        }
        i++;
    }
    fn.apply(null, modules);
};

F.define("time", function() {
    return {
        getDate() {
            return new Date();
        },
        getTime() {
            return +new Date();
        }
    };
});
F.module("time", function(t) {
    console.log(t.getDate(), t.getTime());
});
F.module(["time", window], function(t, w) {
    console.log(t, w);
});

/* 
异步模块模式
请求发出后，继续其他业务逻辑，直到模块加载完成执行后续的逻辑，实现模块开发中对模块加载完成后的引用。
*/
(function(F) {
    var moduleCache = {};

    F.module = function(url, deps, callback) {
        var params = [];
        var depsCount = 0;
        var i = 0;
        var len = deps.length;
        if (len) {
            while (i < len) {
                (function(i) {
                    depsCount++;
                    loadModule(deps[i], function(mod) {
                        params[i] = mod;
                        depsCount--;
                        if (depsCount === 0) {
                            setModule(url, params, callback);
                        }
                    });
                })(i);
                i++;
            }
        } else {
            setModule(url, [], callback);
        }
    };

    var loadModule = function(moduleName, callback) {
        var _module;
        if (moduleCache[moduleName]) {
            _module = moduleCache[moduleName];
            if (_module.status === "loaded") {
                setTimeout(() => {
                    callback(_module.exports);
                }, 0);
            } else {
                _module.onload.push(callback);
            }
        } else {
            moduleCache[moduleName] = {
                moduleName: moduleName,
                status: "loading",
                exports: null,
                onload: [callback]
            };
            loadScript(getUrl(moduleName));
        }
    };

    var getUrl = function(moduleName) {
        return String(moduleName).replace(/\.js$/g, "") + ".js";
    };

    var loadScript = function(src) {
        var _script = document.createElement("script");
        _script.type = "text/javascript";
        _script.charset = "UTF-8";
        _script.async = true;
        _script.src = src;
        document.getElementsByTagName("head")[0].appendChild(_script);
    };

    var setModule = function(moduleName, params, callback) {
        var _module, fn;
        if (moduleCache[moduleName]) {
            _module = moduleCache[moduleName];
            _module.status = "loaded";
            _module.exports = callback ? callback.apply(_module, params) : null;
            while ((fn = _module.onload.shift())) {
                fn(_module.exports);
            }
        } else {
            callback && callback.apply(null, params);
        }
    };
})(
    (function() {
        return (window.F = {});
    })()
);

// 应用
F.module("lib/dom", [], function() {
    return {
        g: function(id) {
            return document.getElementsById(id);
        },
        html: function(id, html) {
            if (html) {
                this.g(id).innerHTML = html;
            } else {
                return this.g(id).innerHTML;
            }
        }
    };
});
F.module("lib/event", ["lib/dom"], function(dom) {
    var events = {
        on: function(id, type, fn) {
            dom.g(id)["on" + type] = fn;
        }
    };
    return events;
});
F.module(null, ["lib/event", "lib/dom"], function(events, dom) {
    events.on("demo", "click", function() {
        dom.html("demo", "success");
    });
});

/* 
widget模式
widget模式是指借用web widget思想将页面分解成部件，针对部件开发，最终组合成完整的页面。

widget模式就是将数据填充到模版引擎中，以数据驱动的方式完成一个最小化的页面组件。以前主要的实现方式就是规定一个模版，数据内容通过占位符来确定，
然后通过模版编译引擎将其编译成html。现在的主流框架react和vue都是通过虚拟dom来实现。
*/
function tplEngine(str, data) {
    if (Array.isArray(data)) {
        let html = "";
        data.forEach(item => {
            html += compileTpl(str)(item);
        });
        return html;
    }
    return compileTpl(str)(data);
}

function compileTpl(str) {
    // 将字符串转为方法实体
    const fnBody = `
        var template_array=[];
        template_array.push(' ${dealTpl(str)} ');
        return template_array.join('');
    `;
    return new Function("templateData", fnBody);
}

function dealTpl(str) {
    const _left = "{%";
    const _right = "%}";
    return String(str)
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/[\r\t\n]/g, "")
        .replace(
            new RegExp(_left + "=(.*?)" + _right, "g"),
            "',typeof($1) === 'undefined' ? '' : $1, '"
        )
        .replace(new RegExp(_left, "g"), "');")
        .replace(new RegExp(_right, "g"), "template_array.push('");
}

var data = {
    tagCloud: [
        { is_selected: true, title: "这是一本设计模式书", text: "设计模式" },
        { is_selected: false, title: "这是一本HTML", text: "HTML" },
        { is_selected: null, title: "这是一本CSS", text: "CSS" },
        { is_selected: "", title: "这是一本javascript", text: "javascript" }
    ]
};
// 模板
var str = [
    '<div id="tag_cloud">',
    "{% for(var i = 0; i < tagCloud.length; i++){",
    " var ctx = tagCloud[i]; %}",
    '<a href="#" class="tag_item {% if(ctx["is_selected"]){ %}',
    "selected",
    '{% } %}" title="{%=ctx["title"]%}">',
    '{%=ctx["text"]%}',
    "</a>",
    "{% } %}",
    "</div>"
].join("");
tplEngine(str, data);

/* 
MVC & MVP & MVVM模式
这三种模式都是常见的软件架构设计模式，它主要通过分离关注点来改进代码的组织方式，以达到解耦的目的。
通过字面可以看出这三种模式的相同之处是MV部分，不同的是C、P和VM。C主要是手动控制M，在M中通过观察者
模式的方式自动触发V的更新；P是既要手动控制M的改变，也要手动控制V的更新；VM是M和V的部分都有框架去实
现，自动更新，只要保证M和V的一一对应即可。具体通过下面的例子来了解它们之间的区别。
*/
// MVC
const app = {};
app.Model = function() {
    let value = 0;
    this.add = function() {
        value++;
    };
    this.sub = function() {
        value--;
    };
    this.getValue = function() {
        return value;
    };

    const views = [];
    this.register = function(view) {
        views.push(view);
    };
    this.notify = function() {
        views.forEach(view => {
            view.render(this);
        });
    };
};
app.View = function(controller) {
    const dom = document.getElementsById("#root");
    const btnAdd = document.getElementsById("#add");
    const btnSub = document.getElementsById("#sub");

    this.render = function(model) {
        dom.innerHTML = model.getValue();
    };
    btnAdd.onclick = controller.increase;
    btnSub.onclick = controller.decrease;
};
app.Controller = function() {
    let model, view;
    this.init = function() {
        model = new app.Model();
        view = new app.View(this);
        model.register(view);
        model.notify();
    };

    this.increase = function() {
        model.add(1);
        model.notify();
    };
    this.decrease = function() {
        model.sub(1);
        model.notify();
    };
};
const controller = new app.Controller();
controller.init();

// MVP
const app = {};
app.Model = function() {
    let value = 0;
    this.add = function() {
        value++;
    };
    this.sub = function() {
        value--;
    };
    this.getValue = function() {
        return value;
    };
};
app.View = function() {
    const dom = document.getElementsById("#root");
    const btnAdd = document.getElementsById("#add");
    const btnSub = document.getElementsById("#sub");

    this.render = function(model) {
        dom.innerHTML = model.getValue();
    };
    this.init = function() {
        const presenter = new app.Presenter(this);
        btnAdd.onclick = presenter.increase;
        btnSub.onclick = presenter.decrease;
    };
};
app.Presenter = function(view) {
    let model = new app.Model();
    view.render(model);

    this.increase = function() {
        model.add(1);
        view.render(model);
    };
    this.decrease = function() {
        model.sub(1);
        view.render(model);
    };
};
const view = new app.View();
view.init();

// MVVM
const app = {};
app.Model = function(view) {
    var data = { value: 0 };

    this.init = function() {
        const view = new app.View();
        view.render(data.value);
        observer(data);
    };

    function observer(obj) {
        if (!obj || typeof obj != "object") {
            return;
        }
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key]);
        });
    }

    function defineReactive(obj, key, val) {
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function reactiveGetter() {
                return val;
            },
            set: function reactiveSetter(newVal) {
                if (newVal === val) return;
                view.render(newVal);
            }
        });
    }
};
app.View = function(model) {
    const dom = document.getElementsById("#root");
    const btnAdd = document.getElementsById("#add");
    const btnSub = document.getElementsById("#sub");

    this.render = function(value) {
        dom.innerHTML = value;
    };

    btnAdd.onclick = function() {
        model.data.value += 1;
    };
    btnSub.onclick = function() {
        model.data.value -= 1;
    };
};
const model = new app.Model();
model.init();

/* 
总结
架构型设计模式是为了在编写代码的过程中，更好的帮助我们组织代码进行解耦。

关于javascript设计模式，大概就这些，包含五大类，分别是创建型、结构型、行为型、技巧性和架构型。
大部分的内容和例子基本都是书上的，我只是在此基础上通过自己的理解总结了一下，并加以输出，希望能
够帮助到大家。也希望大家通过这几篇文章能够得其神而忘其行，结合自己项目找到适合的设计模式，构建出高性能、
高可用、高可扩展性、高可维护性的代码。另外，关于设计模式不能为了用而用，否则会适得其反，使代码
机构更加的混乱，不容易阅读。毕竟这些模式都是前人通过大量的经验总结而来，理解加应用需要一个缓慢
的过程，最重要的还是从基础做起，再结合自己的理解和经验慢慢提升。对于我来说，这些模式我也没有完
全的理解和应用，让我们一起在今后的工作中一起慢慢领悟吧。
*/
