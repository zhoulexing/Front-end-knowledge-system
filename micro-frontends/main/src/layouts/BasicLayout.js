import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

function Desktop() {
    return (
        <div>
            <h1>Hello from Desktop</h1>
        </div>
    );
}

class BasicLayout extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <a href="#/apps/desktop">desktop</a> |
                    <a href="#/apps/vue">vue</a> 
                </div>
                <div>
                    <Switch>
                        <Redirect exact from="/apps" to="/apps/desktop" />
                        <Route exact path="/apps/desktop" component={Desktop} />
                        <Route path="/apps/vue" component={() => ""} />
                        <Route path="/apps/angular" component={() => <div id="angular"></div>} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default BasicLayout;
