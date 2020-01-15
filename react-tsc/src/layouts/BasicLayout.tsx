import React from "react";
import { Button } from "antd";
import style from "./BasicLayout.less";

export default class BasicLayout extends React.Component<object, object> {
    render() {
        console.log(this.props);
        return (
            <div className={style.layout}>
                <Button>BasicLayout</Button> 
            </div>
        )
    }
}
