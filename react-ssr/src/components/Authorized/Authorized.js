import React from 'react';
import CheckPermission from './CheckPermissions';

class Authorized extends React.Component {
    render() {
        const { children, authority, noMatch = null } = this.props;
        const childrenRender = typeof children === 'undefined' ? null : children;
        return CheckPermission(authority, childrenRender, noMatch);
    }
}

export default Authorized;
