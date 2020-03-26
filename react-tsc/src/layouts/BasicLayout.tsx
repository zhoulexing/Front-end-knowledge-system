import React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import SiderMenu from "@/components/SiderMenu";
import { getMenuData } from "@/common/menu";
import logo from "@/assets/images/logo.svg";
import { ConnectState, RouterModelState } from "@/store/index.d";

const { Header, Content, Footer } = Layout;

interface BasicLayoutProps {
    location: RouterModelState;
    collapsed: boolean;
    dispatch: Dispatch;
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
    const { location, collapsed } = props;

    const handleMenuCollapse = (collapsed: boolean) => {
        const { dispatch } = props;
        dispatch({
            type: "global/changeLayoutCollapsed",
            payload: collapsed
        });
    };

    return (
        <Layout style={{ height: "100%" }}>
            <SiderMenu
                logo={logo}
                title="火麒麟"
                collapsed={collapsed}
                menuData={getMenuData()}
                location={location}
                onCollapse={handleMenuCollapse}
            />
            <Layout>
                <Header>Header</Header>
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    );
};

export default connect(({ global, router }: ConnectState) => ({
    collapsed: global.collapsed,
    location: router.location
}))(BasicLayout);
