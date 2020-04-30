import React from "react";
import RefTest from "./RefTest";
import ApiTest from "./ApiTest";
import { Button } from "antd";

interface ReactTestProps {}

class ReactTest extends React.Component<ReactTestProps> {
    private refTest: React.RefObject<RefTest>;

    constructor(props: ReactTestProps) {
        super(props);
        this.refTest = React.createRef();
    }

    render() {
        const params = {
            component: <ApiTest></ApiTest>,
            component1: ApiTest,
        };
        return (
            <div>
                <div>
                    {params.component}
                    {React.createElement(params.component1, { name: "zlx" })}
                    {React.cloneElement(params.component, { name: "zlx" })}
                </div>

                <div>
                    <RefTest ref={this.refTest} />
                    <Button onClick={this.getName}>获取name</Button>
                </div>
            </div>
        );
    }

    getName = () => {
        const name = (this.refTest.current as ReactTest).getName();
        console.log(name);
    };
}

export default ReactTest;
