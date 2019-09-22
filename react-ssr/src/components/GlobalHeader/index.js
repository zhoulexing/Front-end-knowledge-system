import React, { Component } from 'react';
import {
    Icon, Tooltip, Dropdown, Spin, Menu, Avatar,
} from 'antd';
import NoticeIcon from '../NoticeIcon';
import styles from './index.less';
import avatar from '../../assets/images/user.jpg';

export default class GlobalHeader extends Component {
    render() {
        const { collapsed, currentUser, onMenuClick } = this.props;

        const menu = (
          <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
            <Menu.Item disabled>
              <Icon type="user" />
个人中心
            </Menu.Item>
            <Menu.Item disabled>
              <Icon type="setting" />
设置
            </Menu.Item>
            <Menu.Item key="triggerError">
              <Icon type="close-circle" />
触发报错
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout">
              <Icon type="logout" />
退出登录
            </Menu.Item>
          </Menu>
        );

        return (
          <div className={styles.header}>
            <Icon
              className={styles.trigger}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className={styles.right}>
              <Tooltip title="操作手册">
                <a
                  className={styles.action}
                  target="_blank"
                >
                  <Icon type="question-circle-o" />
                </a>
              </Tooltip>
              <NoticeIcon
                className={styles.action}
                count={currentUser.notifyCount}
                onItemClick={(item, tabProps) => {
                            console.log(item, tabProps); // eslint-disable-line
                        }}
                onClear={() => {
                            console.log('onClear');
                        }}
                onPopupVisibleChange={() => {
                            console.log('onPopupVisibleChange');
                        }}
                loading={false}
                popupAlign={{ offset: [20, -16] }}
              >
                        消息
              </NoticeIcon>
              { currentUser.name ? (
                <Dropdown overlay={menu}>
                  <span className={`${styles.action} ${styles.account}`}>
                    <Avatar size="small" className={styles.avatar} src={avatar} />
                    <span className={styles.name}>{currentUser.name}</span>
                  </span>
                </Dropdown>
                    ) : (
                      <Spin size="small" style={{ marginLeft: 8 }} />
                    ) }
            </div>
          </div>
        );
    }

    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
    }
}
