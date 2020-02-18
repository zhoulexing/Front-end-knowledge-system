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
const getRouterConfig = (app: any) => {
    return {
        "/login": {
            component: dynamicWrapper(app, [], () => import(/* webpackChunkName: "loginLayout" */"@/layouts/LoginLayout"))
        },
        "/apps": {
            component: dynamicWrapper(app, [], () => import(/* webpackChunkName: "basicLayout" */"@/layouts/BasicLayout"))
        },
        "/apps/example": {
            component: dynamicWrapper(app, [], () => import(/* webpackChunkName: "example" */"@/routes/Example"))
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
function dynamicWrapper(app: any, models: any, component: any) {
    // 注册model
    models.forEach((model: any) => {
        if(modelNotExisted(app, model)) {
            app.model(require(`@/models/${ model }`).default);
        }
    });

    // 如果是同步加载, 则直接返回一个函数组件
    if(component.toString().indexOf(".then(") < 0) {
        return (props: any) => {
            if(!routerDataCache) {
                routerDataCache = getRouterData(app);
            }
            return createElement(component().default, { ...props, routerData: routerDataCache });
        }
    }

    const LoadableCom = loadable(component);
    return (props: any) => {
        if(!routerDataCache) {
            routerDataCache = getRouterData(app);
        }
        return createElement(LoadableCom, { ...props, routerData: routerDataCache });
    }
}

function modelNotExisted(app: any, model: any) {
    return !app._models.some(({ namespace }: any) => {
        return namespace === model.substring(model.lastIndexOf('/') + 1);
    });
}

export const getRouterData = (app:any) => {
    const routerConfig: any = getRouterConfig(app);
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

