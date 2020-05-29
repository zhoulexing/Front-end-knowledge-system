import React from "react";
import { Button } from "antd";

class StateTest extends React.Component {
    state = {
        count: 1,
    };

    render() {
        return (
            <div>
                <Button onClick={this.handleClick}>更新state</Button>
            </div>
        );
    }

    handleClick = () => {
        console.log("before:", this.state.count);
        this.setState({
            count: this.state.count + 1,
        });
        console.log("after1", this.state.count);

        this.setState({
            count: this.state.count + 2,
        });

        this.setState({
            count: this.state.count + 3,
        });

        console.log("after2", this.state.count);
    };
}

export default StateTest;
