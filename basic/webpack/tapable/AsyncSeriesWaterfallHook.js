const { AsyncSeriesWaterfallHook } = require('tapable');


class AsyncSeriesWaterfallHookV2 {
    constructor() {
        this.tasks = [];
    }

    tapAsync(name, fn) {
        this.tasks.push(fn);
    }

    callAsync(...args) {
        let index = 0;

        let finalCallBack = args.pop();
        let next = (err, data) => {
            let task = this.tasks[index];

            if(!task) return finalCallBack();

            if(index === 0) {
                task(...args, next);
            } else {
                task(data, next);
            }
            index++;
        }
        next();
    }

    tapPromise(name, fn) {
        this.tasks.push(fn);
    }

    promise(...args) {
        let [first, ...others] = this.tasks;

        return others.reduce((l, n) => {
            return l.then(data => {
                return n(data);
            })
        }, first(...args))
    }
}

class Hook {
    constructor() {
        this.hooks = new AsyncSeriesWaterfallHookV2(['name']);
    }

    tap() {
        this.hooks.tapAsync('node', function(name, cb) {
            setTimeout(() => {
                console.log('node:', name);
                cb(null, '第一步返回第二步的结果')
            }, 1000);
        });

        this.hooks.tapAsync('react', function(data, cb) {
            setTimeout(() => {
                console.log('react:', data);
                cb();
            }, 1000);
        });
    }

    start() {
        this.hooks.callAsync('call end.', function() {
            console.log('最终的回调');
        });
    }

    tapPromise() {
        this.hooks.tapPromise('node', function(name) {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('node:', name);
                    resolve('第一步返回第二步的结果')
                }, 1000);
            });
        });

        this.hooks.tapPromise('react', function(name) {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('react:', name);
                    resolve()
                }, 1000);
            });
        });
    }

    promise() {
        this.hooks.promise('call end.').then(function() {
            console.log('最终的回调');
        });
    }
}


let hook = new Hook();
hook.tapPromise();
hook.promise();