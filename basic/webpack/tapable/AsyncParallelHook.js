const { AsyncParallelHook } = require("tapable");

// 模拟实现
class AsyncParallelHookV2 {
    constructor(args) {
        this.tasks = [];
    }

    tapAsync(name, fn) {
        this.tasks.push(fn);
    }

    callAsync(...args) {
        let index = 0;
        let finalCallBack = args.pop();

        let done = () => {
            index++;

            if (index === this.tasks.length) {
                finalCallBack();
            }
        };

        this.tasks.forEach((task) => {
            task(...args, done);
        });
    }

    tapPromise(name, fn) {
        this.tasks.push(fn);
    }

    promise(...args) {
        let tasks = this.tasks.map(task => {
            return task(...args);
        });
        return Promise.all(tasks);
    }
}

class Hook {
    constructor() {
        this.hooks = new AsyncParallelHookV2(["name"]);
    }

    tap() {
        this.hooks.tapAsync("node", function (name, cb) {
            setTimeout(() => {
                console.log("node:", name);
                cb();
            }, 1000);
        });

        this.hooks.tapAsync("react", function (name, cb) {
            setTimeout(() => {
                console.log("react:", name);
                cb();
            }, 1000);
        });
    }

    start() {
        this.hooks.callAsync("call end.", function () {
            console.log("最终的回调");
        });
    }

    tapPromise() {
        this.hooks.tapPromise("node", function (name) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log("node:", name);
                    resolve();
                }, 1000);
            });
        });

        this.hooks.tapPromise("react", function (name, cb) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    setTimeout(() => {
                        console.log("react:", name);
                        resolve();
                    }, 1000);
                }, 1000);
            });
            
        });
    }

    startPromise() {
        this.hooks.promise("call end.").then(function() {
            console.log("最终的回调");
        });
    };
}

let hook = new Hook();
hook.tapPromise();
hook.startPromise();
