import React from "react";
import ReactDOM from "react-dom";

class Test extends React.Component {
    render() {
        debugger
        return "Test";
    } 
}

function Test1() {
    console.log("Test1")
    return "Test1";
}


class App extends React.Component {
    render() {
        return (
            <div>
                <Test />
                <Test1 />
            </div>
        )
    } 
}

debugger
ReactDOM.render(
    <App />,
    document.getElementById("root")
)