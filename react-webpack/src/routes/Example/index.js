import React, { Component } from "react";
import { Button, Input } from "antd";
import { findDOMNode } from "react-dom";

export default class Example extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.inputRef.current.focus();
    }

    render() {
        return (
            <div>
                <marquee direction="left" style={{ width: "200px" }}>
                    <span>温州营业厅客户打算尽快来的哈就是大家撒谎大垃圾袋是肯德</span>
                </marquee>
                <Button onClick={this.getRef}>获取Ref</Button>
                <Input />
                <input ref={this.inputRef}/>
            </div>
        )
    }

    getRef = () => {
        const ref = this.inputRef.current;
        const value = findDOMNode(this.inputRef.current).value;
        console.log(ref, value);
    }
}