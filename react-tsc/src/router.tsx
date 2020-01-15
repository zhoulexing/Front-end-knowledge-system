import React from "react";
import { routerRedux, router } from "dva";
import { getRouterData } from "@/common/router";

const { Route, Switch, Redirect } = router;
const { ConnectedRouter } = routerRedux;

interface RouterConfigProps {
    history: History;
    app: any
}

const RouterConfig: React.SFC<RouterConfigProps> = ({ history, app }) => {
    const routerData = getRouterData(app);
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
