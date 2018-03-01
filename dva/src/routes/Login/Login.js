import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './Login.less';
import Login from '../../components/Login';
import DocumentTitle from 'react-document-title';
import { Checkbox, Alert } from 'antd';
import { TITLE } from '../../common/constants';

const { Tab, UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
    login,
    submitting: loading.effects['login/login']
}))
export default class LoginPage extends Component {
    state = {
        type: "account",
        autoLogin: true
    }

    onTabChange = (type) => {
        this.setState({ type });
    }

    handleSubmit = (err, values) => {
        const { type } = this.state;
        if (!err) {
            this.props.dispatch({
                type: 'login/login',
                payload: {
                    ...values,
                    type,
                },
            });
        }
    }

    changeAutoLogin(e) {
        this.setState({
            autoLogin: e.target.checked,
        });
    }

    renderMessage = (content) => {
        return (
            <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
        );
    }

    render() {
        const { submitting, login } = this.props;
        const { type, autoLogin } = this.state;
        return (
            <DocumentTitle title={TITLE}>
                <div className={ styles.main }>
                <Login
                    defaultActiveKey={type}
                    onTabChange={this.onTabChange}
                    onSubmit={this.handleSubmit}
                >
                    <Tab key="account" tab="账户密码登录">
                        {
                            login.status === 'error' &&
                            login.type === 'account' &&
                            !login.submitting &&
                            this.renderMessage('账户或密码错误（admin）')
                        }
                        <UserName name="userName" placeholder="admin" />
                        <Password name="password" placeholder="123456" />
                    </Tab>
                    <Tab key="mobile" tab="pki登录">
                        {
                            login.status === 'error' &&
                            login.type === 'mobile' &&
                            !login.submitting &&
                            this.renderMessage('请插入pki')
                        }
                        pki登录
                    </Tab>
                    <div>
                        <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
                    </div>
                    <Submit loading={submitting}>登录</Submit>
                </Login>
            </div>
            </DocumentTitle>
        )
    }
};

