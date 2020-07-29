import React, { useState } from 'react';
import { connect, Dispatch, useIntl } from 'umi';
import { ConnectState } from '@/models/connect';
import LoginForm from './components/index';
import { LoginParamsType } from '@/services/login';
import styles from './index.less';

interface LoginProps {
    dispatch: Dispatch;
    loading?: boolean;
}

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginForm;

const Login: React.FC<LoginProps> = props => {
    const { loading } = props;
    const { formatMessage } = useIntl();
    const [type, setType] = useState<string>('account');

    const onSubmit = (values: LoginParamsType) => {
        const { dispatch } = props;
        dispatch({
            type: 'login/login',
            payload: { ...values, type },
        });
    };

    return (
        <div className={styles.userContainer}>
            <LoginForm activeKey={type} onSubmit={onSubmit} onTabChange={setType}>
                <Tab key="account" tab="账号密码登录">
                    <UserName
                        name="userName"
                        placeholder="请输入用户名"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名！',
                            },
                        ]}
                    />
                    <Password
                        name="password"
                        placeholder="密码: ant.design"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                    />
                </Tab>
                <Tab key="mobile" tab="手机号登录">
                    <Mobile
                        name="mobile"
                        placeholder="手机号"
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号！',
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: '手机号格式错误！',
                            },
                        ]}
                    />
                    <Captcha
                        name="captcha"
                        placeholder="验证码"
                        countDown={60}
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码！',
                            },
                        ]}
                    />
                </Tab>
                <Submit loading={loading}>{formatMessage({ id: 'login.submit' })}</Submit>
            </LoginForm>
        </div>
    );
};

export default connect(({ loading }: ConnectState) => ({
    loading: loading.effects['login/login'],
}))(Login);
