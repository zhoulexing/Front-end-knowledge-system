import React from "react";

interface TestComponentProps {
    name?: string;
}

class TestComponent extends React.Component<TestComponentProps> {
  render() {
    const { name } = this.props;
    return (
      <div>{name || "test"}</div>
    );
  }
}

class ApiTest extends React.Component {
  render() {
    const params = {
      component: <TestComponent />,
      component1: TestComponent,
    };


    const props = { name: "zlx" };
    return (
      <div>
        {params.component}
        {React.createElement(params.component1, props)}
        {React.cloneElement(params.component, props)}
      </div>
    );
  }
}


export default ApiTest;
