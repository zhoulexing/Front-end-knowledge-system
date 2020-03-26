import { createElement } from "react";
import loadable from "@loadable/component";
import { getMenuData, MenuData } from "./menu";
import { pathToRegexp } from "path-to-regexp";


interface FlatMenu {
    [name: string]: object
}

interface RouterData {
    [propName: string]: object;
}

/*
* 路由配置
* */
const getRouterConfig = () => {
    return {
        "/login": {
            component: dynamicWrapper(() => import(/* webpackChunkName: "loginLayout" */"@/layouts/LoginLayout"))
        },
        "/apps": {
            component: dynamicWrapper(() => import(/* webpackChunkName: "basicLayout" */"@/layouts/BasicLayout"))
        },
        "/apps/example/1": {
            component: dynamicWrapper(() => import(/* webpackChunkName: "example" */"@/routes/Example"))
        },
        "/apps/es2020": {
            component: dynamicWrapper(() => import(/* webpackChunkName: "es2020" */"@/routes/ES2020"))
        },
    }
};

function getFlatMenuData(menus: MenuData) {
    let keys: FlatMenu = {};
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
        return (props: any) => {
            if(!routerDataCache) {
                routerDataCache = getRouterData();
            }
            return createElement(component().default, { ...props, routerData: routerDataCache });
        }
    }

    const LoadableCom = loadable(component);
    return (props: any) => {
        if(!routerDataCache) {
            routerDataCache = getRouterData();
        }
        return createElement(LoadableCom, { ...props, routerData: routerDataCache });
    }
}

export const getRouterData = () => {
    const routerConfig: any = getRouterConfig();
    const flatMenuData = getFlatMenuData(getMenuData());
    const routerData: any = {};
    Object.keys(routerConfig).forEach(path => {
         // 将path转成正则，/apps/23sdfasd === /apps/:id
        const pathRegexp: any = pathToRegexp(path);
        const menuKey = Object.keys(flatMenuData).find(key => pathRegexp.test(key));
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

