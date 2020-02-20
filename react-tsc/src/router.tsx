import React from "react";
import { getRouterData } from "@/common/router";
import { Route, Switch, Redirect } from "react-router";
import { ConnectedRouter } from "connected-react-router";

interface RouterConfigProps {
    history: History;
}

const RouterConfig: React.SFC<RouterConfigProps> = ({ history }: any) => {
    const routerData = getRouterData();
    const LoginLayout = routerData["/login"].component;
    const BasicLayout = routerData["/apps"].component;

    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Redirect exact from="/" to="/login" />
                <Route path="/login" component={LoginLayout} />
                <Route path="/apps" component={BasicLayout} />
            </Switch>
        </ConnectedRouter>
    );
}

export default RouterConfig;
