import React from "react";
import { Button } from "antd";

interface TestComponentProps {
    name?: string;
    ref?: React.RefObject<RefTest>
}

class TestComponent extends React.Component<TestComponentProps> {
  render() {
    const { name } = this.props;
    return <div>{name || "test"}</div>;
  }

    getName = () => {
      const { name } = this.props;
      return name;
    }
}

class RefTest extends React.Component {
    private testRef = React.createRef<TestComponent>();

    render() {
      return (
        <div>
          <Button onClick={this.getName}>获取name</Button>
        </div>
      );
    }

    getName = () => {
      const name = (this.testRef.current as TestComponent).getName();
      const name1 = this.testRef?.current?.getName();
      let name2;
      if (this.testRef.current) {
        name2 = this.testRef.current.getName();
      }
      console.log(name, name1, name2);
    }
}


export default RefTest;
