import React from "react";
import { Button, Layout } from "antd";
import { Route } from "react-router";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import style from "./BasicLayout.less";
import SiderMenu from "@/components/SiderMenu";
import { getMenuData } from "@/common/menu";
import logo from "@/assets/images/logo.svg";
import { ConnectState, RouterModelState } from "@/store/index.d";


const { Sider, Header, Content, Footer } = Layout;


class BasicLayout extends React.Component<any, any> {
    goOtherPage(path: string) {
        this.props.dispatch(push(path));
    }

    render() {
        const { routerData } = this.props as any;
        return (
            <div className={style.layout}>
                <div>Hello BasicLayout</div>
                <Button onClick={this.goOtherPage.bind(this, "/apps/example")}>Go Example</Button>
                <Button onClick={this.goOtherPage.bind(this, "/apps/es2020")}>Go ES2020</Button>
                <Route
                    path="/apps/example"
                    component={routerData["/apps/example"].component}
                />
                <Route
                    path="/apps/es2020"
                    component={routerData["/apps/es2020"].component}
                />
            </div>
        );
    }
}
// interface BasicLayoutProps {
//     location: RouterModelState;
//     collapsed: boolean;
// }

// const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
//     const { location, collapsed } = props;
//     return (
//         <Layout style={{ height: "100%" }}>
//             <Sider>
//                 <SiderMenu 
//                     logo={logo}
//                     title="火麒麟"
//                     collapsed={collapsed}
//                     menuData={getMenuData()}
//                     location={location}
//                 />
//             </Sider>
//             <Layout>
//                 <Header>Header</Header>
//                 <Content>Content</Content>
//                 <Footer>Footer</Footer>
//             </Layout>
//         </Layout>
//     )
// }


export default connect(({ global, router }: ConnectState) => ({
    collapsed: global.collapsed,
    location: router.location
}))(BasicLayout);