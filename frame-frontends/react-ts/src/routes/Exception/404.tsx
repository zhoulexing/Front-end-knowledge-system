import { Button, Result } from "antd";
import React from "react";
import { push } from "connected-react-router";

// 这里应该使用 antd 的 404 result 组件，
// 但是还没发布，先来个简单的。

const NoFoundPage: React.FC<{}> = () => (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
            <Button type="primary" onClick={() => push("/")}>
                Back Home
            </Button>
        }
    ></Result>
);

export default NoFoundPage;
