import React from "react";
import { Button } from "antd";
import { Route } from "react-router";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import style from "./BasicLayout.less";


class BasicLayout extends React.Component<any, any> {
    goOtherPage(path: string) {
        this.props.dispatch(push(path));
    }

    render() {
        const { routerData } = this.props as any;
        return (
            <div className={style.layout}>
                <div>Hello BasicLayout</div>
                <Button onClick={this.goOtherPage.bind(this, "/apps/example")}>Go Example</Button>
                <Button onClick={this.goOtherPage.bind(this, "/apps/es2020")}>Go ES2020</Button>
                <Route
                    path="/apps/example"
                    component={routerData["/apps/example"].component}
                />
                <Route
                    path="/apps/es2020"
                    component={routerData["/apps/es2020"].component}
                />
            </div>
        );
    }
}

export default connect()(BasicLayout);