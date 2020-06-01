import * as React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { MenuData, MenuDataItem } from "@/common/menu";
import { SmileOutlined } from "@ant-design/icons";
import { urlToList } from "@/utils/util";
import { pathToRegexp } from "path-to-regexp";
import { IAuthorizedType } from "@/components/Authorized/Authorized";
import { IAuthorityType } from "@/components/Authorized/CheckPermissions";

import styles from "./index.less";

const { Sider } = Layout;
const { SubMenu } = Menu;

interface SiderMenuProps {
    logo: string;
    title: string;
    collapsed: boolean;
    menuData: MenuData;
    location: any;
    onCollapse: (collapsed: boolean, type: any) => void;
    Authorized: IAuthorizedType;
}

interface SideMenuState {
    openKeys: string[];
}

const getIcon = (icon: React.ReactNode) => {
  if (!icon) {
    return <SmileOutlined />;
  }
  if (typeof icon === "string") {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  return React.createElement(
        icon as React.FunctionComponent | React.ComponentClass,
  );
};

export const getFlatMenuKeys = (menuData: MenuData) => menuData.reduce((keys: string[], item: MenuDataItem) => {
  keys.push(item.path);
  if (item.children) {
    keys = keys.concat(getFlatMenuKeys(item.children));
  }
  return keys;
}, []);

export const getMenuMatchKeys = (flatMenuKeys: string[], paths: string[]) => {
  const result: string[] = [];
  return paths.reduce((matchKeys, path) => matchKeys.concat(flatMenuKeys.filter((item: string) => pathToRegexp(item).test(path))), result);
};

class SiderMenu extends React.PureComponent<SiderMenuProps, SideMenuState> {
    flatMenuKeys: string[];

    constructor(props: SiderMenuProps) {
      super(props);
      this.flatMenuKeys = getFlatMenuKeys(props.menuData);
      this.state = {
        openKeys: this.getDefaultCollapsedSubMenus(props),
      };
    }

    getDefaultCollapsedSubMenus(props: SiderMenuProps) {
      const {
        location: { pathname },
      } = props || this.props;
      return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
    }

    render() {
      const {
        logo, title, collapsed, menuData, onCollapse,
      } = this.props;
      const { openKeys } = this.state;

      const menuProps = collapsed
        ? {}
        : {
          openKeys,
        };

      let selectedKeys = this.getSelectedMenuKeys();
      if (!selectedKeys.length) {
        selectedKeys = [openKeys[openKeys.length - 1]];
      }

      return (
        <Sider collapsed={collapsed} onCollapse={onCollapse} width={256}>
          <div className={styles.logoContainer}>
            <Link to="/apps">
              <img src={logo} alt="logo" className={styles.logo} />
              <h1>{title}</h1>
            </Link>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            style={{ padding: "16px 0", width: "100%" }}
            selectedKeys={selectedKeys}
            onClick={this.handleClick}
            onOpenChange={this.handleOpenChange}
            {...menuProps}
          >
            {this.getNavMenuItems(menuData)}
          </Menu>
        </Sider>
      );
    }

    handleClick = ({ key, keyPath }: { key: string; keyPath: string[] }) => {
      const { openKeys } = this.state;
      const newOpenKeys = openKeys.filter((openKey) => keyPath.includes(openKey));
      this.setState({
        openKeys: newOpenKeys,
      });
    };

    handleOpenChange = (openKeys: string[]) => {
      this.setState({
        openKeys: [...openKeys],
      });
    };

    isOfOpenKeys = (key: string) => {
      const { openKeys } = this.state;
      return openKeys.includes(key);
    };

    getSelectedMenuKeys = () => {
      const {
        location: { pathname },
      } = this.props;
      return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
    };

    getNavMenuItems = (menuData: MenuData) => {
      if (!menuData) {
        return [];
      }
      return menuData
        .filter((item: MenuDataItem) => item.name && !item.hideInMenu)
        .map((item: MenuDataItem) => {
          const ItemDom = this.getSubMenuOrItem(item);
          return this.checkPermissionItem(item.authority, ItemDom);
        })
        .filter((item) => item);
    };

    getSubMenuOrItem = (item: MenuDataItem) => {
      if (item.children && item.children.some((child) => child.name)) {
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
      }
      return (
        <Menu.Item key={item.path}>
          {this.getMenuItemPath(item)}
        </Menu.Item>
      );
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
          <span style={{ marginLeft: "10px" }}>{name}</span>
        </Link>
      );
    };

    checkPermissionItem = (authority: IAuthorityType, ItemDom: React.ReactNode) => {
      const { Authorized } = this.props;
      if (Authorized && Authorized.check) {
        const { check } = Authorized;
        return check(authority, ItemDom, null);
      }
      return ItemDom;
    };
}

export default SiderMenu;
