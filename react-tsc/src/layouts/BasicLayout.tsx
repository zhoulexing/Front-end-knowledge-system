import React from "react";
import { Button } from "antd";
import { router } from "dva";
import style from "./BasicLayout.less";

const { Route } = router;

export default class BasicLayout extends React.Component<object, object> {
    render() {
        console.log(this.props);
        const { routerData } = this.props as any;
        return (
            <div className={style.layout}>
                <div>Hello BasicLayout</div>
                <Button>Go Example</Button> 
                <Route path="/apps/example" component={routerData["/apps/example"].component} />
            </div>
        )
    }
}
