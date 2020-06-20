import React from 'react';
import { Form, Input } from 'antd';

const User: React.FC = () => {
    return (
        <>
            <Form>
                <Form.Item label="用户名" name="username">
                    <Input />
                </Form.Item>
                <Form.Item label="密码" name="password">
                    <Input.Password />
                </Form.Item>
            </Form>
        </>
    );
};

export default User;
