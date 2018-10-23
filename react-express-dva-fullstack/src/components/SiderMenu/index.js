import React, { PureComponent } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "dva/router";
import pathToRegexp from "path-to-regexp";
import { urlToList } from "utils/util";
import styles from "./index.less";

const { SubMenu } = Menu;
const { Sider } = Layout;

/**
 * 根据icon判定是图片还是字体图标
 * @param { string } icon
 * eg: "/images/example.png" 
 * eg: "example"
 * eg: <Icon type="example"/>
 */
const getIcon = icon => {
    if (typeof icon === "string") {
        if (icon.indexOf("images") >= 0) {
            return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
        }
        return <Icon type={icon} />;
    }
    return icon;
};

/**
 * 转化成扁平化的key
 * @param  menu
 * eg: [{path:string},{path:string}] => [path,path2]
 */
export const getFlatMenuKeys = menu =>
    menu.reduce((keys, item) => {
        keys.push(item.path);
        if (item.children) {
            return keys.concat(getFlatMenuKeys(item.children));
        }
        return keys;
    }, []);

/**
 * 找到所有匹配的路劲
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys, paths) =>
    paths.reduce(
        (matchKeys, path) => matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
        []
    );


export default class SiderMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.flatMenuKeys = getFlatMenuKeys(props.menuData);
        this.state = {
            openKeys: this.getDefaultCollapsedSubMenus(props)
        };
    }

    /**
     * 覆盖pathname to openKeys
     * @param props
     */
    getDefaultCollapsedSubMenus(props) {
        const {
            location: { pathname }
        } = props || this.props;
        return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
    }

    render() {
        const { logo, menuData, collapsed, onCollapse } = this.props;
        const { openKeys } = this.state;

        const menuProps = collapsed
            ? {}
            : {
                openKeys
            };

        let selectedKeys = this.getSelectedMenuKeys();
        if (!selectedKeys.length) {
            selectedKeys = [openKeys[openKeys.length - 1]];
        }
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                width={256}
                className={styles.sider}
            >
                <div className={styles.logo}>
                    <Link to="/apps">
                        <img src={ logo } alt="logo"/>
                        <h1>周某人</h1>
                    </Link>
                </div>
                <Menu 
                    theme="dark" 
                    mode="inline"
                    style={{ padding: "16px 0", width: "100%" }}
                    selectedKeys={selectedKeys}
                    onOpenChange={this.handleOpenChange} 
                    {...menuProps}
                >
                    { this.getNavMenuItems(menuData) }
                </Menu>
            </Sider>
        )
    }

    handleOpenChange = openKeys => {
        const lastOpenKey = openKeys[openKeys.length - 1];
        const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
        this.setState({
            openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
        });
    };

    isMainMenu = key => {
        const { menuData } = this.props;
        return menuData.some(item => key && (item.key === key || item.path === key));
    };

    /**
     * 获取选中的菜单keys
     */
    getSelectedMenuKeys = () => {
        const {
            location: { pathname }
        } = this.props;
        return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
    };

    /**
     * 获取菜单子节点
     * @param { Array } menuData
     */
    getNavMenuItems(menuData) {
        if(!menuData) {
            return [];
        }
        return menuData
            .filter(item => item.name && !item.hideInMenu)
            .map(item => {
                const ItemDom = this.getSubMenuOrItem(item);
                return this.checkPermissionItem(item.authority, ItemDom);
            })
            .filter(item => item);
    }

    getSubMenuOrItem(item) {
        if (item.children && item.children.some(child => child.name)) {
            const childrenItems = this.getNavMenuItems(item.children);
            // 当无子菜单时就不展示菜单
            if (childrenItems && childrenItems.length > 0) {
                return (
                    <SubMenu
                        title={
                            item.icon ? (
                                <span>
                                    {getIcon(item.icon)}
                                    <span>{item.name}</span>
                                </span>
                            ) : (
                                item.name
                            )
                        }
                        key={item.path}
                    >
                    {childrenItems}
                    </SubMenu>
                );
            }
            return null;
        } else {
            return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
        }
    }

    getMenuItemPath = item => {
        const icon = getIcon(item.icon);
        const { target, name, path } = item;
    
        const { location } = this.props;
        return (
            <Link
                to={path}
                target={target}
                replace={path === location.pathname}
            >
                {icon}
                <span>{name}</span>
            </Link>
        );
    };

    checkPermissionItem = (authority, ItemDom) => {
        const { Authorized } = this.props;
        if (Authorized && Authorized.check) {
            const { check } = Authorized;
            return check(authority, ItemDom);
        }
        return ItemDom;
    };
}

