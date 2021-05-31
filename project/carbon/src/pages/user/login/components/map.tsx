import React from 'react';
import { UserOutlined, LockTwoTone, MobileTwoTone, MailTwoTone } from '@ant-design/icons';
import styles from './index.less';

export default {
    UserName: {
        props: {
            prefix: (
                <UserOutlined
                    style={{
                        color: '#1890ff',
                    }}
                    className={styles.prefixIcon}
                />
            ),
            placeholder: 'admin',
        },
        rules: [
            {
                required: true,
                message: '用户名不能为空!',
            },
        ],
    },
    Password: {
        props: {
            prefix: <LockTwoTone className={styles.prefixIcon} />,
            type: 'password',
            placeholder: '888888',
        },
        rules: [
            {
                required: true,
                message: '密码不能为空!',
            },
        ],
    },
    Mobile: {
        props: {
            prefix: <MobileTwoTone className={styles.prefixIcon} />,
            placeholder: '13275514337',
        },
        rules: [
            {
                required: true,
                message: '请输入手机号码!',
            },
            {
                pattern: /^1\d{10}$/,
                message: '手机不能为空!',
            },
        ],
    },
    Captcha: {
        props: {
            prefix: <MailTwoTone className={styles.prefixIcon} />,
            placeholder: '568214',
        },
        rules: [
            {
                required: true,
                message: '验证码不能为空!',
            },
        ],
    },
};
