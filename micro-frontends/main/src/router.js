import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import BasicLayout from "./layouts/BasicLayout";
import LoginLayout from "./layouts/LoginLayout";

const RouterConfig = () => {
    return (
        <HashRouter>
            <Switch>
                <Redirect exact from="/" to="/login" />
                <Route exact path="/login" component={LoginLayout} />
                <Route path="/apps" component={BasicLayout} />
            </Switch>
        </HashRouter>
    );
};

export default RouterConfig;
