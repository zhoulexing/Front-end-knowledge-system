import React from 'react';
import { TabBar } from 'antd-mobile';
import { history, Redirect } from 'umi';
import { BasicLayoutProps as ProLayoutProps, MenuDataItem } from '@ant-design/pro-layout';
import { RouteComponentProps } from 'react-router-dom';

export interface MobileLayoutProps {
    route: ProLayoutProps['route'] & {
        authority: string[];
        routes: MenuDataItem[]
    };
    location: RouteComponentProps['location'] | {
        pathname?: string;
    };
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ route, location }) => {
    return (
        <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="#fff" tabBarPosition="bottom">
            {route.routes
                .filter(item => !item.redirect)
                .map(item => {
                    return (
                        <TabBar.Item
                            title={item.title}
                            key={item.name}
                            selected={item.path === location.pathname}
                            icon={
                                <div
                                    style={{
                                        width: '22px',
                                        height: '22px',
                                        background: `url(${item.icon}) center center /  21px 21px no-repeat`,
                                    }}
                                />
                            }
                            selectedIcon={
                                <div
                                    style={{
                                        width: '22px',
                                        height: '22px',
                                        background: `url(${item.selectedIcon}) center center /  21px 21px no-repeat`,
                                    }}
                                />
                            }
                            onPress={() => {
                                history.push(item.path);
                            }}
                        >
                            <item.component />
                        </TabBar.Item>
                    )
                })}
        </TabBar>
    );
};

export default MobileLayout;
