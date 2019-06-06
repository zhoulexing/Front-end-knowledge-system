import React, { PureComponent } from "react";
import style from "./LoginLayout.less";

export default class LoginLayout extends PureComponent {
    
    componentDidMount() {
        
    }

    render() {
        return <div onClick={this.goIndex} className={ style.login }>goIndex</div>;
    }

    goIndex = () => {
        
    }
}

