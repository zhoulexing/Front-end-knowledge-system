import * as React from "react";
import { Button } from "antd";

interface IForTestState {
    count: number,
}

interface IForTestProps {
    getCount?: () => void,
}


class ForTest extends React.Component<IForTestProps, IForTestState> {
  constructor(props: IForTestProps) {
    super(props);
    this.getCount = this.getAge.bind(this);
    this.state = {
      count: 1,
    };
  }

  componentDidMount() {
    console.log("component is run");
  }

  render() {
    return (
      <div>
        <Button onClick={this.getCount}>获取数量</Button>
      </div>
    );
  }

    getName = () => "zlx"

    getAge() {
      return 25;
    }

    getCount = () => {
      const { getCount } = this.props;
      const { count } = this.state;
      if (getCount) {
        getCount();
      }
      this.setState({
        count: count + 1,
      });
      return count;
    }
}

export default ForTest;
