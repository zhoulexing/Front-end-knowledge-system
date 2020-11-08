import { RouterConfigProps } from '../common/router';

export const getRoutes = (path: string, routerConfig: RouterConfigProps) => {
    let routes = Object.keys(routerConfig).filter(key => {
        return key.startsWith(path) && path!== key;
    }).filter(key => {
        return key.replace(path, '').split('/').length === 2;
    });

    return routes.map(key => {
        return {
            key,
            path: key,
            ...routerConfig[key]
        }
    });
}