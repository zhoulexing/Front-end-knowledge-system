import * as React from "react";
import { Button } from "antd";

interface IForTestState {
    count: number,
}

interface IForTestProps {

}


class ForTest extends React.Component<IForTestProps, IForTestState> {
    constructor(props: IForTestProps) {
        super(props);
        this.state = {
            count: 1
        }
    }

    render() {
        return (
            <div>
                <Button onClick={this.getCount}>获取数量</Button>
            </div>
        )
    }

    getCount = () => {
        const { count } = this.state;
        this.setState({
            count: count + 1,
        });
        return count;
    }
}

export default ForTest;