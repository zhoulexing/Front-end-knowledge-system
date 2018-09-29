import React, { Component } from "react";


export default class Demo extends Component {
    state = {
        component: null
    }

    render() {
        const test = { ...this.state };
        return <div>demo</div>;
    }
}
