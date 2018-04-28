import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

class Loading extends Component {
    static defaultProps = {
        loading: false // 判断是否在loading
    }
    
    static propTypes = {
        loading: PropTypes.bool
    }
    
    render() {
        const { loading, children } = this.props;
        if(loading) {
            return <Icon type="loading"/>;
        }
        return children;
    }
}


export default Loading;
