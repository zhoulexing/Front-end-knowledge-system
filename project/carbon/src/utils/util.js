import { pathRegexp } from "path-to-regexp";
/**
 * Get router routing configuration
 * { path:{ name,...param }} => Array<{ name,path ...param }>
 * @param {String} path
 * @param {Object} routerData
 */
export function getRoutes(path, routerData) {
    let routes = Object.keys(routerData).filter(
        (routePath) => routePath.indexOf(path) === 0 && routePath !== path
    );
    // eg. path='user' /user/name => name
    routes = routes.map((item) => item.replace(path, ""));
    const renderArr = getRenderArr(routes);
    const renderRoutes = renderArr.map((item) => {
        const exact = !routes.some(
            (route) => route !== item && getRelation(route, item) === 1
        );
        return {
            exact,
            ...routerData[`${path}${item}`],
            key: `${path}${item}`,
            path: `${path}${item}`,
        };
    });
    return renderRoutes;
}

function getRelation(str1, str2) {
    if (str1 === str2) {
        console.warn("Two path are equal!"); // eslint-disable-line
    }
    const arr1 = str1.split("/");
    const arr2 = str2.split("/");
    if (arr2.every((item, index) => item === arr1[index])) {
        return 1;
    } else if (arr1.every((item, index) => item === arr2[index])) {
        return 2;
    }
    return 3;
}

function getRenderArr(routes) {
    let renderArr = [];
    renderArr.push(routes[0]);
    for (let i = 1; i < routes.length; i += 1) {
        // 去重
        renderArr = renderArr.filter(
            (item) => getRelation(item, routes[i]) !== 1
        );
        // 是否包含
        const isAdd = renderArr.every(
            (item) => getRelation(item, routes[i]) === 3
        );
        if (isAdd) {
            renderArr.push(routes[i]);
        }
    }
    return renderArr;
}

export const getAuthorityFromRouter = (router, pathname) => {
    const authority = router.find(
        ({ routes, path = "/", target = "_self" }) =>
            (path && target !== "_blank" && pathRegexp(path).exec(pathname)) ||
            (routes && getAuthorityFromRouter(routes, pathname))
    );
    if (authority) return authority;
    return undefined;
};

export const getRouteAuthority = (path, routeData) => {
    let authorities;
    routeData.forEach((route) => {
        // match prefix
        if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
            if (route.authority) {
                authorities = route.authority;
            }
            // exact match
            if (route.path === path) {
                authorities = route.authority || authorities;
            }
            // get children authority recursively
            if (route.routes) {
                authorities =
                    getRouteAuthority(path, route.routes) || authorities;
            }
        }
    });
    return authorities;
};
