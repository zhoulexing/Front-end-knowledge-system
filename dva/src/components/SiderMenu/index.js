import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { Link } from 'dva/router';
import styles from './index.less';
import { TITLE } from '../../common/constants';

const { Sider } = Layout;
const { SubMenu } = Menu;

//获取菜单名前的图标
const getIcon = (icon) => {
    if (typeof icon === 'string') {
        return <Icon type={icon} />;
    }
    return icon;
};

export default class SiderMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.menus = props.menuData;
        this.state = {
            openKeys: this.getDefaultCollapsedSubMenus(props),
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.setState({
                openKeys: this.getDefaultCollapsedSubMenus(nextProps),
            });
        }
    }
    /**
     * Convert pathname to openKeys
     * /list/search/articles = > ['list','/list/search']
     * @param  props
     */
    getDefaultCollapsedSubMenus(props) {
        const { location: { pathname } } = props || this.props;
        // 对路劲进行切割如： /list/search/articles = > ['','list','search','articles']
        let snippets = pathname.split('/');
        // 删除最后一个
        snippets.pop();
        // 删除第一个
        snippets.shift();
        // 删除之后为 ['list','search']
        // 将上数组变为 ['list','list/search']
        snippets = snippets.map((item, index) => {
            if (index > 0) {
                // eg. search => ['list','search'].join('/')
                return snippets.slice(0, index + 1).join('/');
            }
            // 第一个不作处理
            return item;
        });
        snippets = snippets.map((item) => {
            return this.getSelectedMenuKeys(`/${item}`)[0];
        });
        // eg. ['list','list/search']
        return snippets;
    }
    //获取所有菜单的path
    getFlatMenuKeys(menus) {
        let keys = [];
        menus.forEach((item) => {
            if (item.children) {
                keys.push(item.path);
                keys = keys.concat(this.getFlatMenuKeys(item.children));
            } else {
                keys.push(item.path);
            }
        });
        return keys;
    }
    // 获取选中的keys
    getSelectedMenuKeys = (path) => {
        const flatMenuKeys = this.getFlatMenuKeys(this.menus);
        return flatMenuKeys.filter((item) => {
            return pathToRegexp(`/${item}`).test(path);
        });
    }
    
    // 获取SubMenu或者Item
    getSubMenuOrItem=(item) => {
        const { children, name, path, target, icon } = item;
        if (children && children.some(child => child.name)) {
            return (
                <SubMenu
                    title={
                        icon ? (
                            <span>
                                {getIcon(icon)}
                                <span>{name}</span>
                            </span>
                        ) : name
                    }
                    key={path}
                >
                    {this.getNavMenuItems(children)}
                </SubMenu>
            );
        } else {
            return (
                <Menu.Item key={path}>
                    <Link
                        to={`/${path || ''}`}
                        target={target}
                        replace={path === this.props.location.pathname}
                    >
                        {getIcon(icon)}<span>{name}</span>
                    </Link>
                </Menu.Item>
            );
        }
    }
    
    // 获得菜单子节点
    getNavMenuItems = (menusData) => {
        if (!menusData) {
            return [];
        }
        return menusData
        .filter(item => item.name && !item.hideInMenu)
        .map((item) => {
            const ItemDom = this.getSubMenuOrItem(item);
            return this.checkPermissionItem(item.authority, ItemDom);
        })
        .filter(item => !!item);
    }
    // 权限检查
    checkPermissionItem = (authority, ItemDom) => {
        if (this.props.Authorized && this.props.Authorized.check) {
            const { check } = this.props.Authorized;
            return check(
                authority,
                ItemDom
            );
        }
        return ItemDom;
    }
    handleOpenChange = (openKeys) => {
        const lastOpenKey = openKeys[openKeys.length - 1];
        const isMainMenu = this.menus.some(
            item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
        );
        this.setState({
            openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
        });
    }
    render() {
        const { logo, collapsed, location: { pathname }, onCollapse } = this.props;
        const { openKeys } = this.state;
        const menuProps = collapsed ? {} : { openKeys };
        // 根据当前路劲来选择选中的菜单key数组，如果没有匹配，则默认展开最后一项
        let selectedKeys = this.getSelectedMenuKeys(pathname);
        if (!selectedKeys.length) {
            selectedKeys = [openKeys[openKeys.length - 1]];
        }
        
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                onCollapse={onCollapse}
                width={200}
                className={styles.sider}
            >
                <div className={styles.logo} key="logo">
                    <div>
                        <img src={logo} alt="logo" />
                        <h1>{ TITLE }</h1>
                    </div>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    style={{ padding: '16px 0', width: '100%' }}
                    {...menuProps}
                    selectedKeys={selectedKeys}
                    onOpenChange={this.handleOpenChange}
                >
                    {this.getNavMenuItems(this.menus)}
                </Menu>
            </Sider>
        );
    }
}
