import fetch from 'isomorphic-fetch';
import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import store from '../index';

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    notification.error({
        message: `请求错误 ${response.status}: ${response.url}`,
        description: response.statusText,
    });
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * 发起请求
 * @param  {string} url
 * @param  {object} [options]
 * @return {promise}
 */
export default function request(url, options) {
    const defaultOpt = {};
    const newOpt = { ...defaultOpt, ...options };
    newOpt.headers = {
        Accept: 'application/json',
        ...newOpt.headers,
    };
    return fetch(url, newOpt)
        .then(checkStatus)
        .then(parseJSON)
        .catch(() => {
            const { dispatch } = store;
            dispatch(routerRedux.push('/login'));
        });
}
