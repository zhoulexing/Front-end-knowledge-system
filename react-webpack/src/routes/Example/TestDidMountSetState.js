import React, { Component } from "react";

export default class TestDidMountSetState extends Component {

    state = { color: "purple" };

    componentDidMount() {
        console.log("beforeColor:", this.state.color);
        // this.setState({
        //     color: "red"
        // }, () => {
        //     console.log("afterColor1:", this.state.color);
        // });

        // this.setState({
        //     color: "blue"
        // }, () => {
        //     console.log("afterColor2:", this.state.color);
        // });

        setTimeout(() => {
            console.log("async beforeColor:", this.state.color);
            this.setState({
                color: "blue"
            }, () => {
                console.log("async afterColor:", this.state.color);
            });
        }, 0);
    }

    render() {
        console.log("renderColor:", this.state.color);
        return (
            <TestChildDidMount />
        )
    }
}


class TestChildDidMount extends Component {

    state = {
        name: "zlx",
    }

    componentDidMount() {
        console.log("beforeName:", this.state.name);
        this.setState({
            name: "yww"
        }, () => {
            console.log("afterName:", this.state.name);
        });

        // setTimeout(() => {
        //     console.log("async beforeName:", this.state.name);
        //     this.setState({
        //         name: "yww"
        //     }, () => {
        //         console.log("async afterName:", this.state.name);
        //     });
        // }, 200);
    }

    render() {
        console.log("renderName:", this.state.name);
        return (
            <div>{ this.state.name }</div>
        )
    }
}