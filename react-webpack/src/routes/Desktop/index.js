import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";

class Desktop extends Component {
    render() {
        return (
            <div>
                <Button size="large" type="primary" onClick={this.add}>Desktop</Button>
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

export default connect()(Desktop);