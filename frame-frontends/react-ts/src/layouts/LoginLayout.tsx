import React from "react";
import { Button } from "antd";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface LoginLayoutProps {
    dispatch: Dispatch;
}

class LoginLayout extends React.Component<LoginLayoutProps, any> {
    goIndex = () => {
        this.props.dispatch(push("/apps"));
    };

    render() {
        return (
            <div>
                <Button onClick={this.goIndex}>LoginLayout</Button>
            </div>
        );
    }
}

export default connect()(LoginLayout);
