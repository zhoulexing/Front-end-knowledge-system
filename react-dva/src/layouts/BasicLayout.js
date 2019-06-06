import React, { PureComponent } from "react";
import { Route, Redirect, Switch } from "dva/router";
import GlobalHeader from "components/GlobalHeader";
import { getMenuData } from "common/menu";
import NotFound from "routes/Exception/404";
import SiderMenu from "components/SiderMenu";
import { Layout } from "antd";
import { getRoutes } from "utils/util";
import PropTypes from "prop-types";
import Authorized from "utils/Authorized";
import logo from "images/logo.svg";
import NProgress  from "nprogress";
import { IntlProvider } from "react-intl";
import { connect } from "dva";
import { TITLE } from "utils/constant";

const { Content, Header } = Layout;
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


@connect(({ global = {}, loading, setting }) => ({
    collapsed: global.collapsed,
    loading,
    setting
}))
export default class BasicLayout extends PureComponent {

    static childContextTypes = {
        location: PropTypes.object,
        breadcrumbNameMap: PropTypes.object
    }

    getChildContext() {
        const { location, routerData } = this.props;
        return {
            location,
            breadcrumbNameMap: getBreadcrumbNameMap(getMenuData(), routerData)
        };
    }

    render() {
        const {
            setting,
            match,
            location,
            collapsed,
            routerData
        } = this.props;

        this.handleProgress();
        const baseRedirect = this.getBaseRedirect();

        const layout = (
            <Layout style={{ height: "100%" }}>
                <SiderMenu
                    logo={logo}
                    collapsed={collapsed}
                    onCollapse={this.handleMenuCollapse}
                    menuData={getMenuData()}
                    Authorized={Authorized}
                    location={location}
                />
                <Layout style={{ background: "#fff" }}>
                    <Header style={{ padding: 0 }}>
                        <GlobalHeader
                            collapsed={collapsed}
                            onCollapse={this.handleMenuCollapse}
                            onMenuClick={this.handleMenuClick}
                            currentUser={{ name: TITLE }}
                        />
                    </Header>
                    <Content style={{ margin: "24px 24px 0", height: "100%" }}>
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
                                    redirectPath="/apps/exception/404"
                                />
                            ))}
                            <Redirect exact from="/apps" to={baseRedirect} />
                            <Route render={NotFound} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );

        return (
            <div style={{ height: "100%" }}>
                <IntlProvider locale={ setting.locale } messages={ setting.messages }>
                    {layout}
                </IntlProvider>
            </div>
        );
    }

    handleProgress = () => {
        const { loading } = this.props;
        let currHref = "";
        const href = window.location.href;   
        if (currHref !== href) {  
            NProgress.start();    
            if (!loading.global) {  
                NProgress.done();  
                currHref = href;   
            }
        }
    };

    handleMenuClick = ({ key }) => {
        console.log(key);
    };

    handleMenuCollapse = collapsed => {
        const { dispatch } = this.props;
        dispatch({
            type: "global/changeLayoutCollapsed",
            payload: collapsed
        });
    };

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
}
