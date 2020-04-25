import { registerApplication, start as startSingleSpa } from "single-spa";
import { importEntry } from "import-html-entry";
import { concat, mergeWith, identity, flow, isFunction } from "lodash";
import { prefetchAfterFirstMounted, prefetchAll } from "./prefetch";
import { getDefaultTplWrapper } from "./utils";
import { genSandbox } from "./sandbox";
import getAddOns from "./addons";

function toArray(array) {
    return Array.isArray(array) ? array : [array];
}

function execHooksChain(hooks, app) {
    if (hooks.length) {
        return hooks.reduce(
            (chain, hook) => chain.then(() => hook(app)),
            Promise.resolve()
        );
    }

    return Promise.resolve();
}

async function validateSingularMode(validate, app) {
    return typeof validate === "function" ? validate(app) : !!validate;
}

class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

let microApps = [];
let singularMode = false;
let useJsSandbox = false;
const frameworkStartedDefer = new Deferred();

export function registerMicroApps(apps, lifeCycles, opts) {
    // 设置全局属性，方便子应用根据情况做处理
    window.__POWERED_BY_QIANKUN__ = true;

    // 过滤还没注册的app
    const unregisteredApps = apps.filter(
        (app) =>
            !microApps.some((registeredApp) => registeredApp.name === app.name)
    );
    microApps = [...microApps, ...unregisteredApps];

    let prevAppUnmountedDeferred;

    unregisteredApps.forEach((app) => {
        const { name, entry, render, activeRule, props = {} } = app;
        registerApplication(
            name,
            async ({ name: appName }) => {
                await frameworkStartedDefer.promise;

                const { getTemplate = identity, ...settings } = opts || {};
                const {
                    template: appContent,
                    execScripts,
                    assetPublicPath,
                } = await importEntry(entry, {
                    getTemplate: flow(
                        getTemplate,
                        getDefaultTplWrapper(appName)
                    ),
                    ...settings,
                });

                if (await validateSingularMode(singularMode, app)) {
                    await (prevAppUnmountedDeferred &&
                        prevAppUnmountedDeferred.promise);
                }

                render({ appContent, loading: true });

                let jsSandbox = window;
                let mountSandbox = () => Promise.resolve();
                let unmountSandbox = () => Promise.resolve();
                if (useJsSandbox) {
                    const sandbox = genSandbox(appName);
                    jsSandbox = sandbox.sandbox;
                    mountSandbox = sandbox.mount;
                    unmountSandbox = sandbox.unmount;
                }

                const {
                    beforeUnmount = [],
                    afterUnmount = [],
                    afterMount = [],
                    beforeMount = [],
                    beforeLoad = [],
                } = mergeWith(
                    {},
                    getAddOns(jsSandbox, assetPublicPath),
                    lifeCycles,
                    (v1, v2) => concat(v1 ?? [], v2 ?? [])
                );

                await execHooksChain(toArray(beforeLoad), app);
                let {
                    bootstrap: bootstrapApp,
                    mount,
                    unmount,
                } = await execScripts(window);

                if (
                    !isFunction(bootstrapApp) ||
                    !isFunction(mount) ||
                    !isFunction(unmount)
                ) {
                    if (process.env.NODE_ENV === "development") {
                        console.warn(
                            `LifeCycles are not found from ${appName} entry exports, fallback to get them from window['${appName}'] `
                        );
                    }

                    // fallback to global variable who named with ${appName} while module exports not found
                    const globalVariableExports = window[appName] || {};
                    bootstrapApp = globalVariableExports.bootstrap;
                    // eslint-disable-next-line prefer-destructuring
                    mount = globalVariableExports.mount;
                    // eslint-disable-next-line prefer-destructuring
                    unmount = globalVariableExports.unmount;
                    if (
                        !isFunction(bootstrapApp) ||
                        !isFunction(mount) ||
                        !isFunction(unmount)
                    ) {
                        throw new Error(
                            `You need to export the functional lifecycles in ${appName} entry`
                        );
                    }
                }

                return {
                    bootstrap: [bootstrapApp],
                    mount: [
                        async () => {
                            if (
                                (await validateSingularMode(
                                    singularMode,
                                    app
                                )) &&
                                prevAppUnmountedDeferred
                            ) {
                                return prevAppUnmountedDeferred.promise;
                            }

                            return undefined;
                        },
                        async () => render({ appContent, loading: true }),
                        async () => execHooksChain(toArray(beforeMount), app),
                        mountSandbox,
                        mount,
                        async () => render({ appContent, loading: false }),
                        async () => execHooksChain(toArray(afterMount), app),
                        async () => {
                            if (await validateSingularMode(singularMode, app)) {
                                prevAppUnmountedDeferred = new Deferred();
                            }
                        },
                    ],
                    unmount: [
                        async () => execHooksChain(toArray(beforeUnmount), app),
                        unmount,
                        unmountSandbox,
                        async () => execHooksChain(toArray(afterUnmount), app),
                        async () => render({ appContent: "", loading: false }),
                        async () => {
                            if (
                                (await validateSingularMode(
                                    singularMode,
                                    app
                                )) &&
                                prevAppUnmountedDeferred
                            ) {
                                prevAppUnmountedDeferred.resolve();
                            }
                        },
                    ],
                };
            },
            activeRule,
            props
        );
    });
}

export function start(opts) {
    const {
        prefetch = true,
        jsSandbox = true,
        singular = true,
        ...importEntryOpts
    } = opts;

    switch (prefetch) {
        case true:
            prefetchAfterFirstMounted(microApps, importEntryOpts);
            break;

        case "all":
            prefetchAll(microApps, importEntryOpts);
            break;

        default:
            break;
    }

    if (jsSandbox) {
        useJsSandbox = jsSandbox;
    }

    if (singular) {
        singularMode = singular;
    }

    startSingleSpa();

    frameworkStartedDefer.resolve();
}
