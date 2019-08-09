import React, { createElement } from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';


const routerConfig = {
    '/login': {
        component: dynamicWrapper(() => import(/* webpackChunkName: "login" */'../layouts/LoginLayout')),
    },
    '/apps': {
        component: dynamicWrapper(() => import(/* webpackChunkName: "apps" */'../layouts/MainLayout')),
    },
    '/apps/desktop': {
        component: dynamicWrapper(() => import(/* webpackChunkName: "desktop" */'../routes/Desktop')),
    },
    '/apps/example': {
        component: dynamicWrapper(() => import(/* webpackChunkName: "example" */'../routes/Example')),
    },
    '/apps/hooks': {
        component: dynamicWrapper(() => import(/* webpackChunkName: "hooks" */'../routes/Hooks')),
    },
    '/apps/desktop/deliver': {
        component: dynamicWrapper(() => import(/* webpackChunkName: "deliver" */'../routes/Deliver')),
    },
};

function getFlatMenuData(menus) {
    let keys = {};
    menus.forEach((item) => {
        if (item.children) {
            keys[item.path] = { ...item };
            keys = { ...keys, ...getFlatMenuData(item.children) };
        } else {
            keys[item.path] = { ...item };
        }
    });
    return keys;
}

let routerDataCache;
function dynamicWrapper(component) {
    // 如果是同步加载, 则直接返回一个函数组件
    if (component.toString().indexOf('.then(') < 0) {
        return (props) => {
            if (!routerDataCache) {
                routerDataCache = getRouterData();
            }
            return createElement(component().default, { ...props, routerData: routerDataCache });
        };
    }

    // 如果是异步加载，则通过Loadable进行处理
    return Loadable({
        loader: () => {
            if (!routerDataCache) {
                routerDataCache = getRouterData();
            }
            return component().then((comp) => {
                const Component = comp.default || comp;
                return props => createElement(Component, { ...props, routerData: routerDataCache });
            });
        },
        loading: () => <Spin size="large" className="global-spin" />,
    });
}

function modelNotExisted(app, model) {
    return !app._models.some(({ namespace }) => namespace === model.substring(model.lastIndexOf('/') + 1));
}

export const getRouterData = () => {
    const flatMenuData = getFlatMenuData(getMenuData());
    const routerData = {};
    Object.keys(routerConfig).forEach((path) => {
        // 将path转成正则，/apps/23sdfasd === /apps/:id
        const pathRegexp = pathToRegexp(path);
        const menuKey = Object.keys(flatMenuData).find(key => pathRegexp.test(key));
        let menuItem = {};
        if (menuKey) {
            menuItem = flatMenuData[menuKey];
        }
        let router = routerConfig[path];
        router = {
            ...router,
            name: router.name || menuItem.name,
            authority: router.authority || menuItem.authority,
        };
        routerData[path] = router;
    });
    return routerData;
};
