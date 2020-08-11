import { parse } from 'querystring';
import { Route } from '@/models/connect';
import pathRegexp from 'path-to-regexp';



export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const getAuthorityFromRouter = <T extends Route>(
    router: T[] = [],
    pathname: string,
): T | undefined => {
    const authority = router.find(
        ({ routes, path = '/', target = '_self' }) =>
            (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
            (routes && getAuthorityFromRouter(routes, pathname)),
    );
    if (authority) return authority;
    return undefined;
};
