import React from 'react';
import { ConnectState } from '@/models/connect';
import { ConnectProps, connect, history } from 'umi';
import { CurrentUser } from '@/models/login';
import HeaderDropdown from '../HeaderDropdown';
import { Avatar, Menu, Spin } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.less';

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
    currentUser?: CurrentUser;
    menu?: boolean;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
    onMenuClick = (event: ClickParam) => {
        const { key } = event;

        if (key === 'logout') {
            const { dispatch } = this.props;

            if (dispatch) {
                dispatch({
                    type: 'login/logout',
                });
            }

            return;
        }

        history.push(`/account/${key}`);
    };

    render() {
        const {
            currentUser = {
                avatar: '',
                userName: '',
            },
            menu,
        } = this.props;
        const menuHeaderDropdown = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
                {menu && (
                    <Menu.Item key="center">
                        <UserOutlined />
                        个人中心
                    </Menu.Item>
                )}
                {menu && (
                    <Menu.Item key="settings">
                        <SettingOutlined />
                        个人设置
                    </Menu.Item>
                )}
                {menu && <Menu.Divider />}

                <Menu.Item key="logout">
                    <LogoutOutlined />
                    退出登录
                </Menu.Item>
            </Menu>
        );
        return currentUser && currentUser.userName ? (
            <HeaderDropdown overlay={menuHeaderDropdown}>
                <span className={`${styles.action} ${styles.account}`}>
                    <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
                    <span className={styles.name}>{currentUser.userName}</span>
                </span>
            </HeaderDropdown>
        ) : (
            <span className={`${styles.action} ${styles.account}`}>
                <Spin
                    size="small"
                    style={{
                        marginLeft: 8,
                        marginRight: 8,
                    }}
                />
            </span>
        );
    }
}

export default connect(({ login }: ConnectState) => ({
    currentUser: login.user,
}))(AvatarDropdown);
