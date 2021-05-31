import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { Form, Tabs } from 'antd';
import { FormInstance } from 'antd/es/form';
import { LoginParamsType } from '@/services/login';
import useMergeValue from 'use-merge-value';

import LoginContext from './LoginContext';
import LoginItem, { LoginItemProps } from './LoginItem';
import LoginSubmit from './LoginSubmit';
import LoginTab from './LoginTab';

export interface LoginProps {
    className?: string;
    form?: FormInstance;
    onSubmit?: (values: LoginParamsType) => void;
    children: React.ReactElement<typeof LoginTab>[];
    activeKey?: string;
    onTabChange?: (key: string) => void;
}

interface LoginType extends React.FC<LoginProps> {
    Tab: typeof LoginTab;
    Submit: typeof LoginSubmit;
    UserName: React.FunctionComponent<LoginItemProps>;
    Password: React.FunctionComponent<LoginItemProps>;
    Mobile: React.FunctionComponent<LoginItemProps>;
    Captcha: React.FunctionComponent<LoginItemProps>;
}

const Login: LoginType = props => {
    const { className } = props;

    const [tabs, setTabs] = useState<string[]>([]);
    const [active, setActive] = useState({});
    const [type, setType] = useMergeValue('', {
        value: props.activeKey,
        onChange: props.onTabChange,
    });

    const TabChildren: React.ReactComponentElement<typeof LoginTab>[] = [];
    const otherChildren: React.ReactElement<unknown>[] = [];
    React.Children.forEach(
        props.children,
        (
            child:
                | React.ReactComponentElement<typeof LoginTab>
                | React.ReactElement<unknown>,
        ) => {
            if (!child) {
                return;
            }
            if ((child.type as { typeName: string }).typeName === 'LoginTab') {
                TabChildren.push(
                    child as React.ReactComponentElement<typeof LoginTab>,
                );
            } else {
                otherChildren.push(child);
            }
        },
    );

    return (
        <LoginContext.Provider
            value={{
                tabUtil: {
                    addTab: id => {
                        setTabs([...tabs, id]);
                    },
                    removeTab: id => {
                        setTabs(tabs.filter(currentId => currentId !== id));
                    },
                },
                updateActive: activeItem => {
                    if (!active) return;
                    if (active[type]) {
                        active[type].push(activeItem);
                    } else {
                        active[type] = [activeItem];
                    }
                    setActive(active);
                },
            }}
        >
            <div className={classNames(className, styles.login)}>
                <Form
                    form={props.form}
                    onFinish={values => {
                        if (props.onSubmit) {
                            props.onSubmit(values as LoginParamsType);
                        }
                    }}
                >
                    {tabs.length ? (
                        <React.Fragment>
                            <Tabs
                                destroyInactiveTabPane
                                animated={false}
                                className={styles.tabs}
                                activeKey={type}
                                onChange={activeKey => {
                                    setType(activeKey);
                                }}
                            >
                                {TabChildren}
                            </Tabs>
                            {otherChildren}
                        </React.Fragment>
                    ) : (
                        props.children
                    )}
                </Form>
            </div>
        </LoginContext.Provider>
    );
};

Login.Tab = LoginTab;
Login.Submit = LoginSubmit;

Login.UserName = LoginItem.UserName;
Login.Password = LoginItem.Password;
Login.Mobile = LoginItem.Mobile;
Login.Captcha = LoginItem.Captcha;

export default Login;
