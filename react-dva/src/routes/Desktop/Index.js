import React, { Component } from "react";
import { Spin,Button } from "antd";
import style from "./index.less";
import classnames from "classnames";

export default class Desktop extends Component {
    constructor() {
        super();
        this.state = {
            type: 0,
            isMove: false,
        }
    }

    render() {
        const { type, isMove } = this.state;
        const mg = `-${type * 100}%`;
        return (
            <div>
                <div>desktop</div>
                <Spin size="large"/>
                <div>
                    <Button onClick={ this.handleClick.bind(this, 0) }>切换1</Button>
                    <Button onClick={ this.handleClick.bind(this, 1) }>切换2</Button>
                    <Button onClick={ this.handleClick.bind(this, 2) }>切换3</Button>
                </div>
                
                <div className={style.container} style={{ marginLeft: mg }}>
                    <div className={ classnames(style.item, type === 0 ? style.select : style.default) }>
                        123
                    </div>
                    <div className={ classnames(style.item, type === 1 ? style.select : style.default) }>
                        456
                    </div>
                    <div className={ classnames(style.item, type === 2 ? style.select : style.default) }>
                        789
                    </div>
                </div>
                <div className={style.block}></div>

                <div><Button onClick={() => { this.setState({ isMove: !isMove }) }}>动画</Button></div>
                <div className={isMove ? style.block2 : style.block3}></div>
            </div>
        )
    }

    handleClick(type) {
        this.setState({
            type
        });
    }
}