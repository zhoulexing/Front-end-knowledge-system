import React, { PureComponent } from "react";
import { Route, Redirect, Switch, routerRedux } from "dva/router";
import PropTypes from "prop-types";
import GlobalHeader from "components/GlobalHeader";
import { getMenuData } from "common/menu";
import NotFound from "components/Exception";
import { Layout, Menu, Icon } from "antd";
import { getRoutes } from "utils/util";
import Authorized from "../utils/Authorized";

const { Content, Header, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const { AuthorizedRoute, check } = Authorized;

/**
 * 根据菜单取得重定向地址
 */
const redirectData = [];
const getRedirect = item => {
    if (item && item.children) {
        if (item.children[0] && item.children[0].path) {
            redirectData.push({
                from: `${item.path}`,
                to: `${item.children[0].path}`
            });
            item.children.forEach(children => {
                getRedirect(children);
            });
        }
    }
};
getMenuData().forEach(getRedirect);


/**
 * 获取面包屑映射
 * @param { Array } menuData 菜单配置
 * @param { Object } routerData 路由配置
 */
const getBreadcrumbNameMap = (menuData, routerData) => {
    const result = {};
    const childResult = {};
    for (const i of menuData) {
        if (!routerData[i.path]) {
            result[i.path] = i;
        }
        if (i.children) {
            Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
        }
    }
    return Object.assign({}, routerData, result, childResult);
}


export default class BasicLayout extends PureComponent {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    getBaseRedirect = () => {
        // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
        const urlParams = new URL(window.location.href);
        
        const redirect = urlParams.searchParams.get("redirect");
        // 如果有重定向，则将参数
        if (redirect) {
            urlParams.searchParams.delete("redirect");
            window.history.replaceState(null, "redirect", urlParams.href);
        } else {
            const { routerData } = this.props;
            const authorizedPath = Object.keys(routerData).find(
                item => check(routerData[item].authority, item) && item !== "/apps"
            );
            return authorizedPath;
        }
        return redirect;
    };

    render() {
        const {
            match,
            routerData
        } = this.props;
        
        const baseRedirect = this.getBaseRedirect();

        const layout = (
            <Layout style={{ height: "100%" }}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span>Option 2</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user" /><span>User</span></span>}
                        >
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="team" /><span>Team</span></span>}
                        >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                            <Icon type="file" />
                            <span>File</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content style={{ margin: "24px 16px", padding: 24, background: "#fff", height: "100%" }}>
                        <Switch>
                            {redirectData.map(item => {
                                return <Redirect key={item.from} exact from={item.from} to={item.to} />
                            })}
                            {getRoutes(match.path, routerData).map(item => (
                                <AuthorizedRoute
                                    key={item.key}
                                    path={item.path}
                                    component={item.component}
                                    exact={item.exact}
                                    authority={item.authority}
                                    redirectPath="/exception/403"
                                />
                            ))}
                            <Redirect exact from="/apps" to={ baseRedirect } />
                            <Route render={ NotFound } />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );

        return (
            <div style={{ height: "100%" }}>
                {layout}
            </div>
        );
    }
}
