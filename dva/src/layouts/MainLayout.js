import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, message } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SiderMenu from '../components/SiderMenu';
import NotFound from '../routes/Exception/404';
import { getRoutes } from '../utils/utils';
import Authorized from '../utils/Authorized';
import { getMenuData } from '../common/menu';
import logo from '../assets/logo.svg';
import { TITLE } from '../common/constants';

const { Content, Header, Footer } = Layout;
const { AuthorizedRoute } = Authorized;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = (item) => {
    if (item && item.children) {
        if (item.children[0] && item.children[0].path) {
            redirectData.push({
                from: `/${item.path}`,
                to: `/${item.children[0].path}`,
            });
            item.children.forEach((children) => {
                getRedirect(children);
            });
        }
    }
};
getMenuData().forEach(getRedirect);

const query = {
    'screen-md': {
        minWidth: 1000,
        maxWidth: 1199,
    },
    'screen-lg': {
        minWidth: 1200,
        maxWidth: 1399,
    },
    'screen-xl': {
        minWidth: 1400,
    },
};


class MainLayout extends React.PureComponent {
    static childContextTypes = {
        location: PropTypes.object,
        breadcrumbNameMap: PropTypes.object,
    }
    getChildContext() {
        const { location, routerData } = this.props;
        return {
            location,
            breadcrumbNameMap: routerData,
        };
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'login/fetchCurrentUser',
        });
    }
    getPageTitle() {
        const { routerData, location } = this.props;
        const { pathname } = location;
        let title = TITLE;
        if (routerData[pathname] && routerData[pathname].name) {
            title = `${routerData[pathname].name} - ${ TITLE }`;
        }
        return title;
    }
    getBashRedirect = () => {
        // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
        const urlParams = new URL(window.location.href);
        
        const redirect = urlParams.searchParams.get('redirect');
        if (redirect) {
            urlParams.searchParams.delete('redirect');
            window.history.replaceState(null, 'redirect', urlParams.href);
        } else {
            return '/example';
        }
        return redirect;
    }
    handleMenuCollapse = (collapsed) => {
        this.props.dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: collapsed,
        });
    }
    handleNoticeClear = (type) => {
        message.success(`清空了${type}`);
        this.props.dispatch({
            type: 'global/clearNotices',
            payload: type,
        });
    }
    handleMenuClick = ({ key }) => {
        if (key === 'triggerError') {
            this.props.dispatch(routerRedux.push('/exception/trigger'));
            return;
        }
        if (key === 'logout') {
            this.props.dispatch({
                type: 'login/logout',
            });
        }
    }
    handleNoticeVisibleChange = (visible) => {
        if (visible) {
            this.props.dispatch({
                type: 'global/fetchNotices',
            });
        }
    }
    render() {
        const {
            currentUser, collapsed, fetchingNotices, notices, routerData, match, location
        } = this.props;
        const bashRedirect = this.getBashRedirect();
        const layout = (
            <Layout>
                <SiderMenu
                    logo={logo}
                    Authorized={Authorized}
                    menuData={getMenuData()}
                    collapsed={collapsed}
                    location={location}
                    onCollapse={this.handleMenuCollapse}
                />
                <Layout>
                    <Header style={{ padding: 0 }}>
                        <GlobalHeader
                            logo={logo}
                            currentUser={currentUser}
                            fetchingNotices={fetchingNotices}
                            notices={notices}
                            collapsed={collapsed}
                            onNoticeClear={this.handleNoticeClear}
                            onCollapse={this.handleMenuCollapse}
                            onMenuClick={this.handleMenuClick}
                            onNoticeVisibleChange={this.handleNoticeVisibleChange}
                        />
                    </Header>
                    <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                        <Switch>
                            {
                                redirectData.map(item =>
                                    <Redirect key={item.from} exact from={item.from} to={item.to} />
                                )
                            }
                            {
                                getRoutes(match.path, routerData).map(item =>
                                    (
                                        <AuthorizedRoute
                                            key={item.key}
                                            path={item.path}
                                            component={item.component}
                                            exact={item.exact}
                                            authority={item.authority}
                                            redirectPath="/exception/403"
                                        />
                                    )
                                )
                            }
                            <Redirect exact from="/" to={bashRedirect} />
                            <Route render={NotFound} />
                        </Switch>
                    </Content>
                    <Footer style={{ padding: 0 }}>
                        <GlobalFooter
                            links={[{
                                key: 'Pro 首页',
                                title: 'Pro 首页',
                                href: 'http://pro.ant.design',
                                blankTarget: true,
                            }, {
                                key: 'github',
                                title: <Icon type="github" />,
                                href: 'https://github.com/ant-design/ant-design-pro',
                                blankTarget: true,
                            }, {
                                key: 'Ant Design',
                                title: 'Ant Design',
                                href: 'http://ant.design',
                                blankTarget: true,
                            }]}
                            copyright={
                                <div>
                                    Copyright <Icon type="copyright" /> 2018 周某人体验技术部出品
                                </div>
                            }
                        />
                    </Footer>
                </Layout>
            </Layout>
        );
        
        return (
            <DocumentTitle title={this.getPageTitle()}>
                <ContainerQuery query={query}>
                    {params => <div className={classNames(params)}>{layout}</div>}
                </ContainerQuery>
            </DocumentTitle>
        );
    }
}

export default connect(({ login, global, loading }) => ({
    currentUser: login.currentUser,
    collapsed: global.collapsed,
    fetchingNotices: loading.effects['global/fetchNotices'],
    notices: global.notices,
}))(MainLayout);

