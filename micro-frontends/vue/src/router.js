import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const constantRouter = [
    {
        path: "/apps/vue",
        redirect: "/apps/vue/init"
    },
    {
        path: "/apps/vue/login",
        component: () => import("@/layouts/LoginLayout")
    },
    {
        path: "/apps/vue/init",
        component: () => import("@/layouts/BasicLayout"),
        redirect: "/apps/vue/init/example",
        children: [
            {
                path: "example",
                component: () => import("@/views/example/index")
            }
        ]
    },
    {
        path: "*",
        redirect: "/apps/vue/login"
    }
];

export default new Router({
    mode: "hash", // history, hash
    base: window.__POWERED_BY_QIANKUN__ ? "/" : "/",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouter
});
