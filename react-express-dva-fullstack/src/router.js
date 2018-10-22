import React from "react";
import { routerRedux, Route, Switch, Redirect } from "dva/router";
import { getRouterData } from "./common/router";
import Authorized from "utils/Authorized";
import { getQueryPath } from "utils/util";

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
                    redirectPath={ getQueryPath("/apps/desktop", {
                        redirect: window.location.href
                    }) }
                />
            </Switch>
        </ConnectedRouter>
    )
}

export default RouterConfig;
