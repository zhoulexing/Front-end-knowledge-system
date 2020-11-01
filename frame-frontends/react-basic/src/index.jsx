import React, { useState } from "react";
import ReactDOM from "react-dom";

class Test extends React.Component {
    render() {
        return "Test";
    } 
}

function Test1() {
    console.log("Test1")
    return "Test1";
}

function Test2() {
    const onClick = () => {}
    const [count, setCount] = useState(0);
return <div onClick={onClick}>Test2 - {count}</div>
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
    <Test2 />,
    document.getElementById("root")
)