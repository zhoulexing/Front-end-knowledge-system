import React from "react";
import ReactDOM from "react-dom";

class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "zlx"
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


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        this.setState({
            count: 1
        });
    }

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
            <Test count={this.state.count} onClick={this.onClick.bind(this)}/>
            // <div>
            //     <Test1 />
            // </div>
        )
    } 
}

debugger
ReactDOM.render(
    <App />,
    document.getElementById("root")
)