import React from "react";
import { isPromise } from "utils/util";
import PromiseRender from "./PromiseRender";
import { CURRENT } from "./renderAuthorize";


/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 Permission judgment type string |array | Promise | Function } authority
 * @param { 你的权限 Your permission description  type:string} currentAuthority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } Exception
 */
const checkPermissions = (authority, currentAuthority, target, Exception) => {
    // 没有权限默认查看所有 
    if(!authority) {
        return target;
    }

    // Array处理
    if(Array.isArray(authority)) {
        if(authority.includes(currentAuthority)) {
            return target;
        }
        if(Array.isArray(currentAuthority)) {
            for(let i = 0, length = currentAuthority.length; i < length; i++) {
                let item = currentAuthority[i];
                if(authority.includes(item)) {
                    return target;
                }
            }
        }
        return Exception;
    }

    // String处理
    if(typeof authority === "string") {
        if(authority === currentAuthority) {
            return target;
        }
        if(Array.isArray(currentAuthority)) {
            for(let i = 0, length = currentAuthority.length; i < length; i++) {
                let item = currentAuthority[i];
                if(authority.includes(item)) {
                    return target;
                }
            }
        }
        return Exception;
    }

    // Promise处理
    if(isPromise(authority)) {
        return <PromiseRender ok={ target } error={ Exception } promise={ authority }/>;
    }

    // Function处理
    if(typeof authority === "function") {
        try {
            let bool = authority(currentAuthority);
            if(isPromise(bool)) {
                return <PromiseRender ok={ target } error={ Exception } promise={ bool }/>;
            }
            if(bool) {
                return target;
            }
            return Exception;
        } catch(error) {
            throw error;
        }
    }
}

const check = (authority, target, Exception) => {
    return checkPermissions(authority, CURRENT, target, Exception);
}

export { checkPermissions };
export default check; 