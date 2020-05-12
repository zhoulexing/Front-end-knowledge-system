import React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import SiderMenu from "@/components/SiderMenu";
import { getMenuData, MenuDataItem } from "@/common/menu";
import { RouterData } from "@/common/router";
import logo from "@/assets/images/logo.svg";
import { ConnectState, RouterModelState } from "@/store/index.d";
import { Switch, Redirect, Route } from "react-router-dom";
import { getRoutes } from "@/utils/util";
import Authorized from "@/utils/Authorized";
import NotFound from "@/routes/Exception/404";

const { Header, Content, Footer } = Layout;
const { AuthorizedRoute, check } = Authorized;

interface BasicLayoutProps {
    location: RouterModelState;
    collapsed: boolean;
    dispatch: Dispatch;
    match: { path: string };
    routerData: RouterData;
}

interface RedirectDataType {
    from: string;
    to: string;
}

const redirectData: RedirectDataType[] = [];
const getRedirect = (item: MenuDataItem) => {
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

const getBaseRedirect = (routerData: RouterData) => {
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams: URL = new URL(window.location.href);

    const redirect = urlParams.searchParams.get("redirect");
    // 如果有重定向，则将重定向参数赋给href
    if (redirect) {
        urlParams.searchParams.delete("redirect");
        window.history.replaceState(null, "redirect", urlParams.href);
    } else {
        const authorizedPath = Object.keys(routerData).find(
            item => check(routerData[item].authority, item, null) && item !== "/apps"
        );
        return authorizedPath;
    }
    return redirect;
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
    const { location, collapsed, match, routerData } = props;

    const handleMenuCollapse = (collapsed: boolean) => {
        const { dispatch } = props;
        dispatch({
            type: "global/changeLayoutCollapsed",
            payload: collapsed
        });
    };

    const baseRedirect = getBaseRedirect(routerData) as string;

    return (
        <Layout style={{ height: "100%" }}>
            <SiderMenu
                logo={logo}
                title="火麒麟"
                collapsed={collapsed}
                menuData={getMenuData()}
                location={location}
                onCollapse={handleMenuCollapse}
                Authorized={Authorized}
            />
            <Layout>
                <Header>Header</Header>
                <Content style={{ margin: "24px 24px 0", height: "100%" }}>
                    <Switch>
                        {redirectData.map(item => {
                            return (
                                <Redirect
                                    key={item.from}
                                    exact
                                    from={item.from}
                                    to={item.to}
                                />
                            );
                        })}
                        {getRoutes(match.path, routerData).map(item => (
                            <AuthorizedRoute
                                key={item.key}
                                path={item.path}
                                component={item.component}
                                exact={item.exact}
                                authority={item.authority}
                                render={() => null}
                                redirectPath="/apps/exception/404"
                            />
                        ))}
                        <Redirect exact from="/apps" to={baseRedirect} />
                        <Route render={() => NotFound} />
                    </Switch>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    );
};

export default connect(({ global, router }: ConnectState) => ({
    collapsed: global.collapsed,
    location: router.location
}))(BasicLayout);
