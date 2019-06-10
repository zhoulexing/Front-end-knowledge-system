import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import Count from "./count";

class Desktop extends Component {

    constructor(props) {
        super(props);
        props.dispatch({
            type: "global/add",
            payload: {
                count: 1,
            }
        });
    }

    componentDidMount() {
        console.log(this.props.count);
    }

    render() {
        return (
            <div>
                <Button size="large" type="primary" onClick={this.add}>Desktop</Button>
                <Count />
            </div>
        )
    }

    add = () => {
        this.props.dispatch({
            type: "global/add",
            payload: {
                count: 6
            }
        });
    }
}

function mapStateToProps({ global }) {
    return {
        count: global.count,
    }
}

export default connect(mapStateToProps)(Desktop);