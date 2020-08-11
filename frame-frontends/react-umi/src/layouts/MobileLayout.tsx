import React from 'react';
import { TabBar } from 'antd-mobile';

const MobileLayout: React.FC = ({ children }) => {
    return (
        <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="#fff"
            tabBarPosition="bottom"
        >
            <TabBar.Item
                title="首页"
                key="home"
                selected={false}
                icon={
                    <div
                        style={{
                            width: '22px',
                            height: '22px',
                            background:
                                'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat',
                        }}
                    />
                }
                selectedIcon={
                    <div
                        style={{
                            width: '22px',
                            height: '22px',
                            background:
                                'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat',
                        }}
                    />
                }
            >
                首页
            </TabBar.Item>
            <TabBar.Item
                icon={{
                    uri:
                        'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg',
                }}
                selectedIcon={{
                    uri:
                        'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg',
                }}
                title="个人中心"
                key="my"
                onPress={() => {}}
            >
                个人中心
            </TabBar.Item>
            {/* {children} */}
        </TabBar>
    );
};

export default MobileLayout;
