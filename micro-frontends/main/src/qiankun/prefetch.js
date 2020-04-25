import { importEntry } from "import-html-entry";
import { flow, identity } from "lodash";
import { getMountedApps } from "single-spa";
import { getDefaultTplWrapper } from "./utils";

const requestIdleCallback =
    window.requestIdleCallback ||
    function requestIdleCallback(cb) {
        const start = Date.now();
        return setTimeout(() => {
            cb({
                didTimeout: false,
                timeRemaining() {
                    return Math.max(0, 50 - (Date.now() - start));
                },
            });
        }, 1);
    };

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
);

const isSlowNetwork = navigator.connection
    ? navigator.connection.saveData ||
      /(2|3)g/.test(navigator.connection.effectiveType)
    : false;

function prefetch(appName, entry, opts) {
    if (isMobile || isSlowNetwork) {
        return;
    }

    requestIdleCallback(async () => {
        const { getTemplate = identity, ...settings } = opts || {};
        const {
            getExternalScripts,
            getExternalStyleSheets,
        } = await importEntry(entry, {
            getTemplate: flow(getTemplate, getDefaultTplWrapper(appName)),
            ...settings,
        });
        requestIdleCallback(getExternalStyleSheets);
        requestIdleCallback(getExternalScripts);
    });
}

export function prefetchAfterFirstMounted(apps, opts) {
    window.addEventListener(
        "single-spa:first-mount",
        () => {
            const mountedApps = getMountedApps();
            const notMountedApps = apps.filter(
                (app) => mountedApps.indexOf(app.name) === -1
            );

            if (process.env.NODE_ENV === "development") {
                console.log(
                    `prefetch starting after ${mountedApps} mounted...`,
                    notMountedApps
                );
            }

            notMountedApps.forEach(({ name, entry }) =>
                prefetch(name, entry, opts)
            );
        },
        { once: true }
    );
}

export function prefetchAll(apps, opts) {
    window.addEventListener(
        "single-spa:no-app-change",
        () => {
            if (process.env.NODE_ENV === "development") {
                console.log("prefetch starting for all assets...", apps);
            }
            apps.forEach(({ name, entry }) => prefetch(name, entry, opts));
        },
        { once: true }
    );
}
