import React from "react";
import { Button } from "antd";
import { routerRedux, connect } from "dva";

class LoginLayout extends React.Component<any, any> {
    goIndex = () => {
        this.props.dispatch(routerRedux.push("/apps"));
    }

    render() {
        return (
            <div>
                <Button onClick={this.goIndex}>LoginLayout</Button> 
            </div>
        )
    }
}

export default connect()(LoginLayout);