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

*/