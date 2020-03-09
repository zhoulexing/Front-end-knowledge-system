import {
    registerMicroApps,
    runAfterFirstMounted,
    setDefaultMountApp,
    start
} from "qiankun";
import render from "./render/ReactRender";

function genActiveRule(routerPrefix) {
    return location => location.pathname.startsWith(routerPrefix);
}

render({ appContent: "", loading: true });

registerMicroApps(
    [
        {
            name: "reactTsc",
            entry: "//localhost:8081",
            render,
            activeRule: genActiveRule("/react-tsc")
        },
        {
            name: "vue-element-admin",
            entry: "//localhost:8003",
            render,
            activeRule: genActiveRule("/vue-element-admin")
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

setDefaultMountApp("/react16");

start({
    prefetch: true,
    jsSandbox: true,
    singular: true,
    fetch: window.fetch
});

runAfterFirstMounted(() => {
    console.log("[MainApp] first app mounted");
});
