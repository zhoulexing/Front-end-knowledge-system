import React from "react";
// import { connect } from "react-redux";
// import { ConnectState } from "@/store/index.d";

interface RefTestProps {
    name?: string;
    ref?: React.RefObject<RefTest>
}

class RefTest extends React.Component<RefTestProps> {
    render() {
        const { name } = this.props;
        return <div>{name || "test"}</div>;
    }

    getName = () => {
        const { name } = this.props;
        return name;
    }
}

// export default connect(({ example }: ConnectState) => ({
//     ...example
// }))(RefTest);
export default RefTest;