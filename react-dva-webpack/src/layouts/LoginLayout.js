import React, { PureComponent } from "react";
import { routerRedux, connect } from "dva";
import { Button } from "antd";
import style from "./LoginLayout.less";

class LoginLayout extends PureComponent {
    
    componentDidMount() {
        
    }

    render() {
        return (
            <div onClick={this.goIndex} className={ style.login }>
                <Button type="primary" onClick={this.goIndex}>goIndex</Button>
            </div>
        )
    }

    goIndex = () => {
        const { dispatch } = this.props;
        dispatch(routerRedux.push('/apps'));
    }
}

export default connect()(LoginLayout);

