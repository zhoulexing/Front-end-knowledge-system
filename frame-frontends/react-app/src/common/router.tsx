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
    }
} as RouterConfigProps)


export default getRouterConfig;