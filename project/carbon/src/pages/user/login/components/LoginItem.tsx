import React, { useCallback, useState, useEffect } from 'react';
import { Form, Input, Row, Col, Button, message } from 'antd';
import { FormItemProps } from 'antd/es/form/FormItem';
import ItemMap from './map';
import LoginContext, { LoginContextProps } from './LoginContext';
import omit from 'omit.js';
import { getFakeCaptcha } from '@/services/login';
import styles from './index.less';

const FormItem = Form.Item;

export type WrappedLoginItemProps = LoginItemProps;
export type LoginItemKeyType = keyof typeof ItemMap;
export interface LoginItemProps extends Partial<FormItemProps> {
    name?: string;
    type?: string;
    countDown?: number;
    placeholder?: string;
    customProps?: { [key: string]: unknown };
    updateActive?: LoginContextProps['updateActive'];
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    defaultValue?: string;
    onGetCaptcha?: (mobile: string) => void;
}
export interface LoginItemType {
    UserName: React.FC<WrappedLoginItemProps>;
    Password: React.FC<WrappedLoginItemProps>;
    Mobile: React.FC<WrappedLoginItemProps>;
    Captcha: React.FC<WrappedLoginItemProps>;
}

const getFormItemOptions = ({
    onChange,
    defaultValue,
    customProps = {},
    rules,
}: LoginItemProps) => {
    const options: {
        rules?: LoginItemProps['rules'];
        onChange?: LoginItemProps['onChange'];
        initialValue?: LoginItemProps['defaultValue'];
    } = {
        rules: rules || (customProps.rules as LoginItemProps['rules']),
    };
    if (onChange) {
        options.onChange = onChange;
    }
    if (defaultValue) {
        options.initialValue = defaultValue;
    }
    return options;
};

const LoginItem: React.FC<LoginItemProps> = props => {
    const { name, type, customProps, ...restProps } = props;

    const [count, setCount] = useState<number>(props.countDown || 0);
    const [timing, setTiming] = useState(false);

    const onGetCaptcha = useCallback(async (mobile: string) => {
        const result = await getFakeCaptcha(mobile);
        if (result.status === 'error') {
            return;
        }
        message.success('获取验证码成功！验证码为：123456');
        setTiming(true);
    }, []);

    useEffect(() => {
        let interval: number = 0;
        const { countDown } = props;
        if (timing) {
            interval = window.setInterval(() => {
                setCount(preSecond => {
                    if (preSecond <= 1) {
                        setTiming(false);
                        clearInterval(interval);
                        // 重置秒数
                        return countDown || 60;
                    }
                    return preSecond - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timing]);

    if (!name) {
        return null;
    }

    const options = getFormItemOptions(props);
    const otherProps = restProps || {};

    if (type === 'Captcha') {
        const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);

        return (
            <FormItem shouldUpdate noStyle>
                {({ getFieldValue }) => (
                    <Row gutter={8}>
                        <Col span={16}>
                            <FormItem name={name} {...options}>
                                <Input {...customProps} {...inputProps} />
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem name={name} {...options}>
                                <Button
                                    disabled={timing}
                                    className={styles.getCaptcha}
                                    onClick={() => {
                                        const value = getFieldValue('mobile');
                                        onGetCaptcha(value);
                                    }}
                                >
                                    {timing ? `${count} 秒` : '获取验证码'}
                                </Button>
                            </FormItem>
                        </Col>
                    </Row>
                )}
            </FormItem>
        );
    }

    return (
        <FormItem name={name} {...options}>
            <Input {...customProps} {...otherProps} />
        </FormItem>
    );
};

const LoginItems: Partial<LoginItemType> = {};

Object.keys(ItemMap).forEach((key) => {
    const item = ItemMap[key];
    LoginItems[key] = (props: LoginItemProps) => (
        <LoginContext.Consumer>
            {context => (
                <LoginItem
                    customProps={item.props}
                    type={key}
                    rules={item.rules}
                    {...props}
                    // 根据需要传递context属性
                    // {...context}
                    // updateActive={context.updateActive}
                />
            )}
        </LoginContext.Consumer>
    );
});

export default LoginItems as LoginItemType;
