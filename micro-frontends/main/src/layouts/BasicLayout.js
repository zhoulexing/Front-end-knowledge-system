import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Example from "../routes/Example";


class BasicLayout extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <a href="#/apps/example">example</a> |
                    <a href="#/apps/vue">vue</a> 
                </div>
                <div>
                    <Switch>
                        <Redirect exact from="/apps" to="/apps/example" />
                        <Route exact path="/apps/example" component={Example} />
                        <Route path="/apps/vue" component={() => ""} />
                        <Route path="/apps/angular" component={() => <div id="angular"></div>} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default BasicLayout;
