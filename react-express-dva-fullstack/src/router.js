import React from "react";
import { routerRedux, Route, Switch, Redirect } from "dva/router";
import { getRouterData } from "./common/router";

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
    const routerData = getRouterData(app);
    const LoginLayout = routerData["/"].component;
    const BasicLayout = routerData["/apps"].component;
    const Demo = routerData["/demo"].component;
    return (
        <ConnectedRouter history={ history }>
            <Switch>
                <Redirect exact from="/" to="/login" />
                <Route path="/login" component={ LoginLayout } />
                <Route path="/apps" component={ BasicLayout } />
                <Route path="/demo" component={ Demo }/>
            </Switch>
        </ConnectedRouter>
    )
}

export default RouterConfig;
