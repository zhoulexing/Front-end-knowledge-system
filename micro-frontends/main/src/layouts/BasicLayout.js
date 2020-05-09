import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { Menu } from "antd";
import Example from "../routes/Example";
import { subject } from "../utils/index";

class BasicLayout extends React.Component {
    componentDidMount() {
        subject.subscribe("count", (count) => {
            console.log("count:", count);
        });
    }

    render() {
        return (
            <div>
                <div>
                    <Menu mode="horizontal" defaultSelectedKeys={["example"]}>
                        <Menu.Item key="example">
                            <Link to="/apps/example">example</Link>
                        </Menu.Item>
                        <Menu.Item key="vue">
                            <Link to="/apps/vue">vue</Link>
                        </Menu.Item>
                    </Menu>
                </div>
                <div>
                    <Switch>
                        <Redirect exact from="/apps" to="/apps/example" />
                        <Route exact path="/apps/example" component={Example} />
                        <Route path="/apps/vue" component={() => ""} />
                        <Route
                            path="/apps/angular"
                            component={() => <div id="angular"></div>}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default BasicLayout;
