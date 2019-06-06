import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const constantRouter = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        component: () => import("views/login/index"),
    },
    {
        path: "/apps",
        component: () => import("layouts/BasicLayout"),
        redirect: "desktop",
        children: [
            {
                path: "desktop",
                component: () => import("views/desktop/index"),
            }
        ]
    },
    {
        path: "*",
        redirect: "/login"
    }
];

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouter
});

