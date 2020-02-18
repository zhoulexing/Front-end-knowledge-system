import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Count from './count';
import { a, b } from './test';
import QRCode from 'qrcode.react';



class Desktop extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.count, this.props.name);
    }

    render() {
        console.log('1111');
        const { count } = this.props;
        return (
          <div>
            <Button size="large" type="primary" onClick={this.add}>Desktop1</Button>
            <Count />
            <QRCode value="https://m.duanqu.com/?_ariver_appid=3000000002140711&page=%2fpages%2fservice-detail%2fservice-detail%3fserviceCode%3dFW_GOODS-1891070%26tracelog%3dsp"/>
          </div>
        );
    }

    add = () => {
        this.props.dispatch({
            type: 'global/add',
            payload: {
                count: 6,
            },
        });
    }
}

function mapStateToProps({ global, example }) {
    return {
        count: global.count,
        name: example.name,
    };
}

export default connect(mapStateToProps)(Desktop);
