import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link, Redirect, Switch, Route } from 'dva/router';
import styles from './LoginLayout.less';
import logo from '../assets/logo.svg';
import { getRoutes } from '../utils/utils';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';


const FormItem = Form.Item;


class LoginLayout extends React.PureComponent {

    getPageTitle() {
        const { routerData, location } = this.props;
        const { pathname } = location;
        let title = '云图';
        if (routerData[pathname] && routerData[pathname].name) {
            title = `${routerData[pathname].name} - 云图`;
        }
        return title;
    }

    render() {
        const { routerData, match, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <DocumentTitle title={this.getPageTitle()}>
                <Form onSubmit={this.handleSubmit} style={{ maxWidth: '300px', margin: '0 auto', paddingTop: '200px' }}>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="密码" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住我</Checkbox>
                        )}
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </DocumentTitle>
        )
    }
}

export default Form.create()(LoginLayout);


