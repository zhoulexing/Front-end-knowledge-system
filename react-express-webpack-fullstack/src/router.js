import React from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import { ConnectedRouter, push } from "react-router-redux";
import LoginLayout from "./layouts/LoginLayout";
import BasicLayout from "./layouts/BasicLayout";

function RouterConfig({ history }) {
    return (
        <ConnectedRouter history={ history }>
            <Switch>
                <Redirect exact from="/" to="/login"/>
                <Route path="/login" component={ LoginLayout } />
                <Route path="/apps" component={ BasicLayout } />
            </Switch>
        </ConnectedRouter>
    )
}

export default RouterConfig;

