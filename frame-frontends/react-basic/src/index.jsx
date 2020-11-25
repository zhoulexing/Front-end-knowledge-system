import React, { useState } from "react";
import ReactDOM from "react-dom";

class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "zlx111"
        }
    }

    componentDidMount() {
        this.setState({
            name: "yww"
        });
    }

    render() {
        return (
            <div onClick={this.props.onClick}>
                {this.state.name + this.props.count}
            </div>
        )
    } 
}

function Test1() {
    console.log("Test1")
    return "Test1";
}

function Test2() {
    const onClick = () => {}
    const [count, setCount] = useState(0);
    return <div onClick={onClick}>Test211 - {count}</div>
}


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }
    }

    // componentDidMount() {
    //     this.setState({
    //         count: 1
    //     });
    // }

    onClick() {
        this.setState({
            count: 2
        });
        this.setState({
            count: 3
        });
    }

    render() {
        return (
            // <Test count={this.state.count} onClick={this.onClick.bind(this)}/>
            <div>
                <Test />
                <Test1 />
            </div>
        )
    } 
}

ReactDOM.render(
    <Test2 />,
    document.getElementById("root")
)