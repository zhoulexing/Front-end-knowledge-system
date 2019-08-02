import React, { Component } from 'react';
import { Button, Input } from 'antd';
import { findDOMNode } from 'react-dom';
import NewContextApi from './NewContextApi';
import TestDidMountSetState from './TestDidMountSetState';
import MouseWheel from './MouseWheel';
import ReactTable from './ReactTable';

export default class Example extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            count: 0,
        };
    }

    componentDidMount() {
        this.inputRef.current.focus();
        // console.log("beforeCount:", this.state.count);
        // this.setState({ count: 1 }, () => {
        //     console.log("afterCount:", this.state.count);
        // });
    }

    render() {
        return (
            <div>
            <marquee direction="left" style={{ width: '200px' }}>
                <span>温州营业厅客户打算尽快来的哈就是大家撒谎大垃圾袋是肯德</span>
              </marquee>
                <Button onClick={this.getRef}>获取Ref</Button>
                <Input />
                <input ref={this.inputRef} />
                <NewContextApi />
                <TestDidMountSetState />
                <MouseWheel />
                <ReactTable />
          </div>
        );
    }

    getRef = () => {
        const ref = this.inputRef.current;
        const { value } = findDOMNode(this.inputRef.current);
        console.log(ref, value);
    }
}
