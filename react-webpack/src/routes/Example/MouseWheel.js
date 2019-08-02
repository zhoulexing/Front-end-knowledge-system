import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import style from './index.less';

export default class MouseWheel extends Component {
    render() {
        return (
          <div className={style.wheelContainer} onWheel={this.handleWheel}>
              <div className={style.wheelContent}>123</div>
            </div>
        );
    }

    handleWheel(e) {
    // scrolling up
        if (e.nativeEvent.deltaY <= 0) {
            console.log('scrolling up');
            // scrolling down
        } else {
            console.log('scrolling down');
        }
    }
}
