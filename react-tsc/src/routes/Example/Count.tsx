import React from "react";
import { Button } from "antd";

export default class Count extends React.Component<any, any> {
    render() {
        return (
            <div>
                数量：1
                <Button>加</Button>
            </div>
        )
    }
}