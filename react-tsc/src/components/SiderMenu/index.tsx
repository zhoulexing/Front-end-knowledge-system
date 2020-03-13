import * as React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { MenuData, MenuDataItem } from "@/common/menu";
import { SmileOutlined } from "@ant-design/icons";

import styles from "./index.less";

const { Sider } = Layout;
const { SubMenu } = Menu;

interface SiderMenuProps {
    logo: string;
    title: string;
    collapsed: boolean;
    menuData: MenuData;
    location: any;
}

/**
 * 根据icon判定是图片还是字体图标
 * @param { string | React.ElementType } icon
 * eg: "/images/example.png"
 * eg: "example"
 * eg: <Icon type="example"/>
 */
const getIcon = (icon: string | React.ElementType | undefined) => {
    if (!icon) {
        return <SmileOutlined />;
    }
    if (typeof icon === "string") {
        return <img src={icon} alt="icon" className={styles.icon} />;
    }
    return React.createElement(icon);
};


class SiderMenu extends React.PureComponent<SiderMenuProps> {
    render() {
        const { logo, title, collapsed, menuData } = this.props;
        return (
            <Sider
                collapsed={collapsed}
            >
                <div className={styles.logoContainer}>
                    <Link to="/apps">
                        <img src={logo} alt="logo" className={styles.logo}/>
                        <h1>{title}</h1>
                    </Link>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[]}
                    openKeys={["sub1"]}
                >
                    {this.getNavMenuItems(menuData)}
                </Menu>
            </Sider>
        );
    }

    getNavMenuItems = (menuData: MenuData) => {
        if (!menuData) {
            return [];
        }
        return menuData
            .filter((item: MenuDataItem) => {
                return item.name && !item.hideInMenu;
            })
            .map((item: MenuDataItem) => {
                const ItemDom = this.getSubMenuOrItem(item);
                // return this.checkPermissionItem(item.authority, ItemDom);
                return ItemDom;
            });
    };

    getSubMenuOrItem = (item: MenuDataItem) => {
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
            return (
                <Menu.Item key={item.path}>
                    {this.getMenuItemPath(item)}
                </Menu.Item>
            );
        }
    };

    getMenuItemPath = (item: MenuDataItem) => {
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
}

export default SiderMenu;
