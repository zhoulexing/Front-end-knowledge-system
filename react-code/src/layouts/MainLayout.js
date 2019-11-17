import React, { Component } from '../../packages/react';


export default class MainLayout extends Component {
    render() {
        return React.createElement('div', { className: 'test', key: 1 }, 'Hello World');
    }
}