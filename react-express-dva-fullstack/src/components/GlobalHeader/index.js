import React, { Component } from "react";
import style from "./index.less";

export default class GlobalHeader extends Component {
    render() {
        return (
            <div className={ style.header }>
                <div className={ style.left }>众智平台</div>
                <div className={ style.right }>

                </div>
            </div>
        )
    }
}
