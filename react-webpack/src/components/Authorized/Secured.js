import React from 'react';
import Exception from '../Exception/index';
import CheckPermissions from './CheckPermissions';

const Exception403 = () => <Exception type="403" style={{ minHeight: 500, height: '80%' }} />;

const checkIsInstantiation = (target) => {
    if (!React.isValidElement(target)) {
        return target;
    }
    return () => target;
};

/**
 * 用于判断是否拥有权限访问此view权限
 * @param {string | function | Promise} authority
 * @param {ReactNode} error 非必需参数
 */
const authorize = (authority, error) => {
    let classError = false;
    if (error) {
        classError = () => error;
    }
    if (!authority) {
        throw new Error('authority is required');
    }
    return function decideAuthority(target) {
        const component = CheckPermissions(authority, target, classError || Exception403);
        return checkIsInstantiation(component);
    };
};

export default authorize;
