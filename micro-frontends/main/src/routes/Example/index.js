import React from "react";
import { Button } from "antd";
import style from "./index.less";


class Desktop extends React.Component {
    render() {
        return (
            <div>
                <Button>example</Button>
                <div className={style.example}>测试</div>
            </div>
        )
    }
}

export default Desktop;