import loadable from '@loadable/component';

export interface RouterConfigProps {
    [key: string]: {
        component: React.ComponentType<any>
    }
}

/*
 * 路由配置
 * */
const getRouterConfig = () => ({
    '/apps': {
        component: loadable(() => import(
            /* webpackChunkName: "basicLayout" */ "../layouts/BasicLayout"
        )),
    },
    '/apps/recoil': {
        component: loadable(() => import(
            /* webpackChunkName: "recoul" */ "../pages/recoil"
        ))
    },
    '/apps/title': {
        component: loadable(() => import(
            /* webpackChunkName: "title" */ "../pages/title"
        ))
    },
    '/apps/mock': {
        component: loadable(() => import(
            /* webpackChunkName: "mock" */ "../pages/mock"
        ))
    },
    '/apps/mobile': {
        component: loadable(() => import(
            /* webpackChunkName: "mobile" */ "../pages/mobile"
        ))
    },
    '/apps/antd': {
        component: loadable(() => import(
            /* webpackChunkName: "antd" */ "../pages/antd"
        ))
    },
} as RouterConfigProps)


export default getRouterConfig;