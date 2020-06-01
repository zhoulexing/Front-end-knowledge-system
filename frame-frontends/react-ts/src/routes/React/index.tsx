import React from "react";
import RefTest from "./RefTest";
import ApiTest from "./ApiTest";
import StateTest from "./StateTest";
import HookTest from "./HookTest";

interface ReactTestProps { }

class ReactTest extends React.Component<ReactTestProps> {
  constructor(props: ReactTestProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <ApiTest />
          <RefTest />
        </div>
        <div>
          <StateTest />
        </div>
        <div>
          <HookTest />
        </div>
      </div>
    );
  }
}

export default ReactTest;
