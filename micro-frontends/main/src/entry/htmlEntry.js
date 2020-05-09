import {
    registerMicroApps,
    runAfterFirstMounted,
    setDefaultMountApp,
    start
} from "qiankun";
import Routes from "../router";
import ReactDOM from "react-dom";
import React from "react";
// import render from "./render/VueRender";
import render from "../render/ReactRender";
import { Provider } from "react-redux";
import store from "../store";
import * as utils from "../utils";

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById("main")
);

// 可动态注册
registerMicroApps(
    [
        {
            name: "vue",
            entry: "//localhost:8091",
            render,
            activeRule: genActiveRule("#/apps/vue"),
            props: { // 传递给子应用，静态通信
                user: "lt",
                utils
            } 
        }
    ],
    {
        beforeLoad: [
            app => {
                console.log(
                    "[LifeCycle] before load %c%s",
                    "color: green;",
                    app.name
                );
            }
        ],
        beforeMount: [
            app => {
                console.log(
                    "[LifeCycle] before mount %c%s",
                    "color: green;",
                    app.name
                );
            }
        ],
        afterUnmount: [
            app => {
                console.log(
                    "[LifeCycle] after unmount %c%s",
                    "color: green;",
                    app.name
                );
            }
        ]
    }
);

function genActiveRule(rule) {
    if (rule.startsWith("#")) {
        return location => location.hash.startsWith(rule);
    }
    return location => location.pathname.startsWith(rule);
}

start({
    prefetch: true,
    jsSandbox: true,
    singular: true,
    fetch: window.fetch
});


// 设置默认子应用
// setDefaultMountApp("/react16");

// 第一个子应用加载完毕回调
// runAfterFirstMounted(() => {
//     console.log("[MainApp] first app mounted");
// });
