import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import { getRouterData } from './common/router';
import zhCN from 'antd/lib/locale-provider/zh_CN';


const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const LoginLayout = routerData['/'].component;
  const Example = routerData['/example'].component;
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={LoginLayout} />
          <Route path="/example" exact component={Example} />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
