import React, { PureComponent } from 'react';
import { Button } from 'antd';
import {connect} from 'dva';
import { IntlProvider } from 'react-intl';
import { addPrintImage } from '../utils/cLodop';


export default class BasicLayout extends PureComponent {
    componentDidMount() {

    }

    preview = () => {
        addPrintImage(0, 0, 100, 100, "https://img.alicdn.com/bao/uploaded/i2/663734805/O1CN01DBJIGA1lMjeFTryym_!!663734805.jpg");
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <div type="primary" onClick={this.preview}>预览</div>
            </div>
        )
    }
}

