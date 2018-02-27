import React, { Component } from 'react';
import CheckPermissions from './CheckPermissions.js';

class Authorized extends Component {
    render() {
        const { children, authority, noMatch = null } = this.props;
        const childrenRender = typeof children === 'undefined' ? null : children;
        return CheckPermissions(authority, childrenRender, noMatch);
    }
}

export default Authorized;