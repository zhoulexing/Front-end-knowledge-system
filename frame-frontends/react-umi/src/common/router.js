import React, { createElement } from "react";
import Loadable from "react-loadable";
import { Spin } from "antd";
import { getMenuData } from "./menu";
import pathToRegexp from "path-to-regexp";

/*
* 路由配置
* */
const getRouterConfig = (app) => {
    return {
        "/apps": {
            component: dynamicWrapper(app, [], () => import("../../../react-app/src/layouts/BasicLayout"))
        },
        "/login": {
            component: dynamicWrapper(app, [], () => import("../layouts/LoginLayout"))
        }
    }
};

function getFlatMenuData(menus) {
    let keys = {};
    menus.forEach(item => {
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
function dynamicWrapper(app, models, component) {
    // 注册model
    models.forEach(model => {
        if(modelNotExisted(app, model)) {
            app.model(require(`../models/${ model }`).default);
        }
    });

    // 如果是同步加载, 则直接返回一个函数组件
    if(component.toString().indexOf(".then(") < 0) {
        return props => {
            if(!routerDataCache) {
                routerDataCache = getRouterData(app);
            }
            return createElement(component().default, { ...props, routerData: routerDataCache });
        }
    }

    // 如果是异步加载，则通过Loadable进行处理
    return Loadable({
        loader: () => {
            if(!routerDataCache) {
                routerDataCache = getRouterData(app);
            }
            return component().then(comp => {
                const Component = comp.default || comp;
                return props => createElement(Component, { ...props, routerData: routerDataCache });
            });
        },
        loading: () => {
            return <Spin size="large" className="global-spin" />;
        }
    });
}

function modelNotExisted(app, model) {
    return !app._models.some(({ namespace }) => {
        return namespace === model.substring(model.lastIndexOf('/') + 1);
    });
}

export const getRouterData = app => {
    const routerConfig = getRouterConfig(app);
    const flatMenuData = getFlatMenuData(getMenuData());
    const routerData = {};
    Object.keys(routerConfig).forEach(path => {
         // 将path转成正则，/apps/23sdfasd === /apps/:id
        const pathRegexp = pathToRegexp(path);
        const menuKey = Object.keys(flatMenuData).find(key => pathRegexp.test(key));
        let menuItem = {};
        if(menuKey) {
            menuItem = flatMenuData[menuKey];
        }
        let router = routerConfig[path];
        router = {
             ...router,
             name: router.name || menuItem.name,
             authority: router.authority || menuItem.authority
        };
        routerData[path] = router;
    });
    return routerData;
}

