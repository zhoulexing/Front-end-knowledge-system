const { AsyncSeriesWaterfallHook } = require("tapable");

const hooks = [
    {
        plugin: '1',
        stage: 0,
        before: () => {},
        opts: { a: 'a' }
    }
];

function getData(opts, arg) {
    console.log("opts:", opts, "arg:", arg);
    return new Promise(resolve => {
        resolve(opts);
    });
}


async function test(initialVal) {
    const waterfall = new AsyncSeriesWaterfallHook(["arg"]);
    for (const hook of hooks) {
        waterfall.tapPromise({
            name: hook.plugin,
            stage: hook.stage || 0,
            before: hook.before
        }, async arg => {
            console.log('---->', arg);
            const res = await getData(hook.opts, arg);
            return res;
        })
    }
    return await waterfall.promise(initialVal);
}
test(0);