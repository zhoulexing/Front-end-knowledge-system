import React from "react";
import { routerRedux, router } from "dva";
import { getRouterData } from "./common/router";
import Authorized from "utils/Authorized";
import { getQueryPath } from "utils/util";

const { Route, Switch, Redirect } = router;
const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;

function RouterConfig({ history, app }) {
    const routerData = getRouterData(app);
    const LoginLayout = routerData["/login"].component;
    const BasicLayout = routerData["/apps"].component;
    return (
        <ConnectedRouter history={ history }>
            <Switch>
                <Redirect exact from="/" to="/login" />
                <Route path="/login" component={ LoginLayout } />
                <AuthorizedRoute 
                    path="/apps"
                    render={ props => <BasicLayout { ...props }/> }
                    authority={ ["admin"] }
                    redirectPath={ getQueryPath("/login", {
                        redirect: window.location.href
                    }) }
                />
            </Switch>
        </ConnectedRouter>
    )
}

export default RouterConfig;
