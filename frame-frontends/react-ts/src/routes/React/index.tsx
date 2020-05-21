import React from "react";
import RefTest from "./RefTest";
import ApiTest from "./ApiTest";

interface ReactTestProps {}

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
            </div>
        );
    }
}

export default ReactTest;
