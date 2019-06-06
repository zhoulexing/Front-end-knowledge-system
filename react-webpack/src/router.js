import React from "react";
import { Route, Router, Redirect, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { getRouterData } from "./common/router";
import Authorized from "./utils/Authorized";
import { getQueryPath } from "./utils/util";

const { AuthorizedRoute } = Authorized;

const RouterConfig = ({ history }) => {
    const routerData = getRouterData();
    const MainLayout = routerData["/apps"].component;
    const LoginLayout = routerData["/login"].component;
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Redirect exact from="/" to="/apps" />
                <Route path="/login" component={ LoginLayout } />
                <AuthorizedRoute 
                    path="/apps"
                    render={ props => <MainLayout { ...props }/> }
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
