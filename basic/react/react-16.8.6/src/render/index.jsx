import React, { useLayoutEffect, useState, useEffect } from "react";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "zlx",
            list: [
                { name: "zlx", age: 10 },
                { name: "yww", age: 11 },
            ],
        };
    }

    componentDidMount() {
        this.setState({
            list: this.state.list.map((item) => {
                item.age += 1;
                return item;
            }),
        });
    }

    render() {
        return (
            <>
                {/* {this.state.list.map((item) => (
                    <span>{item.age}</span>
                ))} */}
                <Test1 />
                <Test2 />
            </>
        );
    }
}

class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "zlx111",
        };
    }

    componentDidMount() {
        this.setState({
            name: "yww",
        });
        // this.setState({
        //     name: "yww2",
        // });
    }

    render() {
        return <Test4 name={this.state.name}></Test4>;
    }
}

function Test1({ name }) {
    console.log("Test1");
    return <Test3 />;
}

function Test2() {
    const onClick = () => {};
    const [count, setCount] = useState(0);
    return <div onClick={onClick}>Test211 - {count}</div>;
}

function Test3() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(1);
    }, []);

    const handleClick = () => {
        obj.count++;
        console.log(obj);
    };

    return count;
}

class Test4 extends React.Component {
    constructor() {
        super();
        this.state = {
            age: 10,
        };
    }

    render() {
        return this.props.name;
    }
}

export default Test;