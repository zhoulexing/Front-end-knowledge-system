import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import {connect} from 'dva';
import { IntlProvider } from 'react-intl';

@connect()
export default class BasicLayout extends PureComponent {
    componentDidMount() {

    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <IntlProvider>

                </IntlProvider>
            </div>
        )
    }
}

