import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { getRouterData } from './common/router';

const RouterConfig = () => {
  const routerData = getRouterData();
  const MainLayout = routerData['/apps'].component;
  const LoginLayout = routerData['/login'].component;
  return (
    <BrowserRouter>
        <Switch>
            <Redirect exact from="/" to="/apps" />
            <Route path="/login" component={LoginLayout} />
            <Route path="/apps" component={MainLayout} />>
        </Switch>
      </BrowserRouter>
  );
};

export default RouterConfig;
