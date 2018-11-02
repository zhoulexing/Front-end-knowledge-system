import React, { Component } from "react";
import { Spin } from "antd";

export default class Desktop extends Component {
    render() {
        return (
            <div>
                <div>desktop</div>
                <Spin size="large"/>
            </div>
        )
    }
}