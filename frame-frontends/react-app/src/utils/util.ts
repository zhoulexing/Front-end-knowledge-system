import { RouterConfigProps } from "../common/router";

export const getRoutes = (path: string, routerConfig: RouterConfigProps) => {
    let routes = Object.keys(routerConfig)
        .filter((key) => {
            return key.startsWith(path) && path !== key;
        })
        .filter((key) => {
            return key.replace(path, "").split("/").length === 2;
        });

    return routes.map((key) => {
        return {
            key,
            path: key,
            ...routerConfig[key],
        };
    });
};

export const getUrlParam = (name: string) => {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

export const isSuperLink = (url: string) => {
    return /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/.test(url);
};
