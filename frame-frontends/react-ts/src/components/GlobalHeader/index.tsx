import * as React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import NoticeIcon from "@/components/NoticeIcon";
import {
  Tooltip, Dropdown, Menu, Spin, Avatar,
} from "antd";
import styles from "./index.less";

interface CurrentUser {
    name?: string;
}

interface GlobalHeaderProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean, type?: any) => void;
    currentUser: CurrentUser;
}

class GlobalHeader extends React.Component<GlobalHeaderProps> {
  render() {
    const { collapsed, currentUser } = this.props;
    const menu = (
      <Menu
        selectedKeys={[]}
        onClick={() => {}}
      >
        <Menu.Item disabled>
          <UserOutlined />
          个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <SettingOutlined />
          设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <span onClick={this.toggle} className="test">
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>

        <div className={styles.right}>
          <Tooltip title="操作手册">
            <a target="_blank">
              <QuestionCircleOutlined />
            </a>
          </Tooltip>
          <NoticeIcon count={10} content="123" trigger="click">
            消息
          </NoticeIcon>
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span
                className={`${styles.action} ${styles.account}`}
              >
                <Avatar
                  size="small"
                  className={styles.avatar}
                  src="http://www.baidu.com"
                />
                <span className={styles.name}>
                  {currentUser.name}
                </span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </div>
      </div>
    );
  }

    toggle = () => {
      const { collapsed, onCollapse } = this.props;
      onCollapse(!collapsed);
    };
}

export default GlobalHeader;
