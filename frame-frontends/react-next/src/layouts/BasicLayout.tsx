import React from "react";

interface BasicLayoutProps {}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
    console.log(props);
    const { children } = props;

    return <div>{children}</div>;
};

export default BasicLayout;
