import { registerApplication, start } from "single-spa";
import Routes from "../router";
import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "../store";
import axios from "axios";

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById("main")
);

const apps = [
    {
        name: "vue",
        entry: "//localhost:8091",
        activeRule: "#/apps/vue",
    },
];

window.__POWERED_BY_QIANKUN__ = true;
window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = "//localhost:8091/";
Promise.all(
    apps.map((app) =>
        axios.get(`${app.entry}/micro-vue-config.json`).then((res) => {
            const { assets } = res.data.entrypoints.main;
            registerApplication(
                app.name,
                () => load(app, assets),
                () => genActiveRule(app.activeRule)
            );
        })
    )
).then(() => {
    start();
});

function genActiveRule(rule) {
    if (rule.startsWith("#")) {
        return (location) => location.hash.startsWith(rule);
    }
    return (location) => location.pathname.startsWith(rule);
}

const loadJS = async (url) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
};

const loadCSS = async (url) => {
    const link = document.createElement("link");
    link.href = url;
    link.rel = "stylesheet";
    document.querySelector("head").appendChild(link);
};

const load = (app, assets) => {
    return Promise.all(
        assets
            .map((url) => {
                const temp = `${app.entry}/${url}`;
                if (/\.css$/.test(temp)) {
                    loadCSS(temp);
                    return Promise.resolve();
                }
                return loadJS(temp);
            })
            .filter(Boolean)
    ).then(() => {
        if (!window[app.name]) {
            return load(app, assets);
        }
        return window[app.name];
    });
};
