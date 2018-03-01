import request from '../utils/request';

export async function fakeAccountLogin(params) {
    return request('/api/login/account', {
        method: 'POST',
        body: params,
    });
}

export async function queryCurrent() {
    return request('/api/login/currentUser');
}
