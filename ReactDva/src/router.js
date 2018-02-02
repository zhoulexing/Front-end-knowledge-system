import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from "./routes/Login/Login";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
          <Route path="/index" component={IndexPage} />
          <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
