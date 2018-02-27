import React from 'react';
import PromiseRender from './PromiseRender';
import { CURRENT } from './index';


function isPromise(obj) {
    return (
        !!obj &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof obj.then === 'function'
    );
}

const checkPermissions = (authority, currentAuthority, target, Exception) => {
    // 没有判定权限，默认查看所有
    if(!authority) {
        return target;
    }

    // 数组处理
    if(Array.isArray(authority)) {
        if(authority.indexOf(currentAuthority) >= 0) {
            return target;
        }
        return Exception;
    }

    // string 处理
    if(typeof authority === 'string') {
        if(authority === currentAuthority) {
            return target;
        }
        return Exception;
    }

    // promise处理
    if(isPromise(authority)) {
        return <PromiseRender ok={target} error={Exception} promise={authority} />;
    }

    // Function 处理
    if (typeof authority === 'function') {
        try {
            const bool = authority(currentAuthority);
            if (bool) {
                return target;
            }
            return Exception;
        } catch (error) {
            throw error;
        }
    }
    throw new Error('unsupported parameters');
};

const check = (authority, target, Exception) => {
    return checkPermissions(authority, CURRENT, target, Exception);
};

export default check;