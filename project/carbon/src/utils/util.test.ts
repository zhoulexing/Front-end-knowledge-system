import { getAuthorityFromRouter, getRouteAuthority } from './util';

describe('getRouteAuthority test', () => {
    it('should return authority for each route', (): void => {
        const routes = [
            { path: '/user', name: 'user', authority: ['user'], exact: true },
            { path: '/admin', name: 'admin', authority: ['admin'], exact: true },
        ];
        expect(getRouteAuthority('/user', routes)).toEqual(['user']);
        expect(getRouteAuthority('/admin', routes)).toEqual(['admin']);
    });
});
