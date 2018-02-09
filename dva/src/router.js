import React from 'react';
import {routerRedux, Route, Switch} from 'dva/router';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider, Spin} from 'antd';


import IndexPage from './routes/IndexPage';
import Login from "./routes/Login/Login";

const {ConnectedRouter} = routerRedux;

function RouterConfig({history, app}) {
    const routerData = getRouterData(app);
    return (
        <LocaleProvider locale={zhCN}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route
                        path="/login"
                        component={Login}
                    />
                    <Route
                        path="/"
                        component={IndexPage}
                    />
                </Switch>
            </ConnectedRouter>
        </LocaleProvider>
    );
}

export default RouterConfig;
