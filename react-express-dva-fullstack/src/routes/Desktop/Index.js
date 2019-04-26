import React, { Component } from "react";
import isEmpty from "lodash/isEmpty";
import style from "./index.less";
import { Spin } from "antd";

export default class Desktop extends Component {
    render() {
        return (
            <div>
                <div>

                </div>
                <div>desktop</div>
                <Spin size="large" />
            </div>
        )
    }
}