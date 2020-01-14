import { createElement } from "react";
import Loadable from "react-loadable";
// import { Spin } from "antd";
import { getMenuData, MenuItem, MenuData } from "./menu";
import pathToRegexp from "path-to-regexp";

export interface RouterDataOfPath extends MenuItem {
    component: React.Component;
} 

export interface RouterData {
    [T: string]: RouterDataOfPath
}

export type getRouterData = (app: any) => RouterData;

/*
* 路由配置
* */
const getRouterConfig = () => {
    return {
        "/apps": {
            component: dynamicWrapper(() => require(/* webpackChunkName: "basicLayout" */"../layouts/BasicLayout"))
        },
        "/login": {
            component: dynamicWrapper(() => require(/* webpackChunkName: "loginLayout" */"../layouts/LoginLayout"))
        }
    }
};

function getFlatMenuData(menus: MenuData) {
    let keys: any = {};
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

let routerDataCache: RouterData;
function dynamicWrapper(component: any) {
    // 如果是同步加载, 则直接返回一个函数组件
    if(component.toString().indexOf(".then(") < 0) {
        return (props:any) => {
            if(!routerDataCache) {
                routerDataCache = getRouterData();
            }
            return createElement(component().default, { ...props, routerData: routerDataCache });
        }
    }

    // 如果是异步加载，则通过Loadable进行处理
    return Loadable({
        loader: () => {
            if(!routerDataCache) {
                routerDataCache = getRouterData();
            }
            return component().then((comp: any) => {
                const Component = comp.default || comp;
                return (props: any)=> createElement(Component, { ...props, routerData: routerDataCache });
            });
        },
        loading: () => {
            // return <Spin size="large" className="global-spin" />;
            return null;
        }
    });
}

export const getRouterData = () => {
    const routerConfig: any = getRouterConfig();
    const flatMenuData: any = getFlatMenuData(getMenuData());
    const routerData: any = {};
    Object.keys(routerConfig).forEach(path => {
         // 将path转成正则，/apps/23sdfasd === /apps/:id
        const pathRegexp: RegExp = pathToRegexp(path);
        const menuKey: any = Object.keys(flatMenuData).find(key => pathRegexp.test(key));
        let menuItem: any = {};
        if(menuKey) {
            menuItem = flatMenuData[menuKey];
        }
        let router: any = routerConfig[path];
        router = {
             ...router,
             name: router.name || menuItem.name,
             authority: router.authority || menuItem.authority
        };
        routerData[path] = router;
    });
    return routerData;
}

