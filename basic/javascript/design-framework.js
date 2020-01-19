/* 
架构型设计模式
架构型设计模式是一类框架结构，通过提供一些子系统，指定他们的职责，并将它们条理清晰地组织在一起。
*/

/* 
同步模块模式
请求发出后，无论模块是否存在，立即执行后续的逻辑，实现模块开发中对模块的立即引用。。
*/
var F = F || {};

// 定义模块方法
F.define = function(str, fn) {
    var parts = str.split(".");
    var old = parent = this;
    var i = len = 0;
    if(parts[0] === "F") {
        parts = parts.slice(1);
    }
    if(parts[0] === "define" || parts[0] === "module") {
        return;
    } 
    for(len = parts.length; i < len; i++) {
        if(typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        old = parent;
        parent = parent[parts[i]];
    }
    if(fn) {
        old[parts[--i]] = fn();
    }
    return this;
} 

// 调用模块方法
F.module = function() {
    var args = [].slice.apply(arguments);
    var fn = args.pop();
    var parts = args[0] && args[0] instanceof Array ? args[0] : args;
    var modules = [];
    var modIDs = "";
    var parent, i = 0, ilen = parts.length, j, jlen;
    while(i < ilen) {
        if(typeof parts[i] === "string") {
            parent = this;
            modIDs = parts[i].replace(/^F\./, '').split(".");
            for(j = 0, jlen = modIDs.length; j < jlen; j++) {
                parent = parent[modIDs[j]] || false;
            }
            modules.push(parent);
        } else {
            modules.push(parts[i]);
        }
        i++;
    }
    fn.apply(null, modules);
}

F.define("time", function() {
    return {
        getDate() {
            return new Date();
        },
        getTime() {
            return +new Date();
        }
    }
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
        if(len) {
            while(i < len) {
                (function(i) {
                    depsCount++;
                    loadModule(deps[i], function(mod) {
                        params[i] = mod;
                        depsCount--;
                        if(depsCount === 0) {
                            setModule(url, params, callback)
                        }
                    });
                })(i);
                i++;
            }
        } else {
            setModule(url, [], callback);
        }
    }

    var loadModule = function(moduleName, callback) {
        var _module;
        if(moduleCache[moduleName]) {
            _module = moduleCache[moduleName];
            if(_module.status === "loaded") {
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
    }

    var getUrl = function(moduleName) {
        return String(moduleName).replace(/\.js$/g, "") + ".js";
    }

    var loadScript = function(src) {
        var _script = document.createElement("script");
        _script.type = "text/javascript";
        _script.charset = "UTF-8";
        _script.async = true;
        _script.src = src;
        document.getElementsByTagName("head")[0].appendChild(_script);
    }

    var setModule = function(moduleName, params, callback) {
        var _module, fn;
        if(moduleCache[moduleName]) {
            _module = moduleCache[moduleName];
            _module.status = "loaded";
            _module.exports = callback ? callback.apply(_module, params) : null;
            while(fn = _module.onload.shift()) {
                fn(_module.exports);
            }
        } else {
            callback && callback.apply(null, params);
        }
    }
})((function() {
    return window.F = {};
})());

// 应用
F.module("lib/dom", [], function() {
    return {
        g: function(id) {
            return document.getElementsById(id);
        },
        html: function(id, html) {
            if(html) {
                this.g(id).innerHTML = html;
            } else {
                return this.g(id).innerHTML;
            }
        }
    }
});
F.module("lib/event", ["lib/dom"], function(dom) {
    var events = {
        on: function(id, type, fn) {
            dom.g(id)['on' + type] = fn;
        }
    } 
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

/* 

*/