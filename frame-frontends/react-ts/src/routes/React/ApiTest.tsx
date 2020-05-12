import React from "react";

interface ApiTestProps {
    name?: string;
}

class ApiTest extends React.Component<ApiTestProps> {
    render() {
        const { name } = this.props;
        return <div>{name || "test"}</div>;
    }

    getName = () => {
        const { name } = this.props;
        return name;
    }
}

export default ApiTest;