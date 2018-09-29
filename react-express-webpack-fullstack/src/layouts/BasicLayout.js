import React, { PureComponent } from "react";
import { Layout, Button } from "antd";
import { Route, Redirect, Switch, NavLink } from "dva/router";
import GlobalHeader from "components/GlobalHeader";

const { Header, Content } = Layout;

export default class BasicLayout extends PureComponent {

    render() {
        return (
            <div>
                <GlobalHeader />
            </div>
        )
    }
}
