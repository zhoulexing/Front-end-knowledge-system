import React, { useLayoutEffect } from "react";

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
    }

    render() {
        return (
            <div onClick={this.props.onClick}>
                {this.state.name + this.props.count}
            </div>
        );
    }
}

function Test1() {
    console.log("Test1");
    return "Test1";
}

function Test2() {
    const onClick = () => {};
    const [count, setCount] = useState(0);
    return <div onClick={onClick}>Test211 - {count}</div>;
}

function Test3() {
    const obj = { count: 0 };

    useLayoutEffect(() => {
        console.log(obj);
    }, [obj]);

    const handleClick = () => {
        obj.count++;
        console.log(obj);
    }

    return <div onClick={handleClick}>{obj.count}</div>;
}

export default Test3;
