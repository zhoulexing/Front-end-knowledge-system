import React from "react";
import { Button, ConfigProvider } from "antd";
import style from "./index.less";


class Desktop extends React.Component {
    render() {
        return (
            <ConfigProvider prefixCls="ant">
                <div className={style.exampleContainer}>
                    <Button type="primary">example</Button>
                </div>
            </ConfigProvider>
        )
    }
}

export default Desktop;