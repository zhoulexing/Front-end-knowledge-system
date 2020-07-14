import React from 'react';
import { Form, Input, Button } from 'antd';
import { connect, Dispatch, useIntl } from 'umi';
import { ConnectState } from '@/models/connect';
import styles from './index.less';

interface LoginProps {
    dispatch: Dispatch;
    loading?: boolean;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Login: React.FC<LoginProps> = props => {
    const { loading } = props;
    const { formatMessage } = useIntl();

    return (
        <div className={styles.userContainer}>
            <Form
                {...layout}
                className={styles.form}
                onFinish={values => {
                    const { dispatch } = props;
                    dispatch({
                        type: 'login/login',
                        payload: { ...values },
                    });
                }}
            >
                <Form.Item label="用户名" name="userName">
                    <Input />
                </Form.Item>
                <Form.Item label="密码" name="password">
                    <Input.Password />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {formatMessage({ id: 'menu.home' })}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default connect(({ loading }: ConnectState) => ({
    loading: loading.effects['login/login'],
}))(Login);
