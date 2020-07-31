import React from 'react';
import ProLayout, {
    MenuDataItem,
    BasicLayoutProps as ProLayoutProps,
    Settings,
} from '@ant-design/pro-layout';
import { useIntl, Link, connect, Dispatch } from 'umi';
import logo from '@/assets/logo.svg';
import { ConnectState } from '@/models/connect';
import Authorized from '@/utils/Authorized';
import { getAuthorityFromRouter } from '@/utils/util';
import { Button, Result } from 'antd';

export interface BasicLayoutProps extends ProLayoutProps {
    breadcrumbNameMap: {
        [path: string]: MenuDataItem;
    };
    settings: Settings;
    dispatch: Dispatch;
    route: ProLayoutProps['route'] & {
        authority: string[];
    };
}

const noMatch = (
    <Result
        status={403}
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
            <Button type="primary">
                <Link to="/user/login">Go Login</Link>
            </Button>
        }
    />
);

const menuHeadRender = (
    logoDom: React.ReactNode,
    titleDom: React.ReactNode,
) => {
    return (
        <Link to="/">
            {logoDom}
            {titleDom}
        </Link>
    );
};

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => {
    return menuList.map(item => {
        const localItem = {
            ...item,
            children: item.children ? menuDataRender(item.children) : undefined,
        };
        return Authorized.check(
            item.authority,
            localItem,
            null,
        ) as MenuDataItem;
    });
};

const menuItemRender = (
    menuItemProps: MenuDataItem,
    defaultDom: React.ReactNode,
) => {
    if (menuItemProps.isUrl || !menuItemProps.path) {
        return defaultDom;
    }
    return <Link to={menuItemProps.path}>{defaultDom}</Link>;
};

const itemRender = (
    route: MenuDataItem,
    params: MenuDataItem,
    routes: MenuDataItem[],
    paths: string[],
) => {
    const first = routes.indexOf(route) === 0;
    return first ? (
        <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    ) : (
        <span>{route.breadcrumbName}</span>
    );
};

const footerRender = () => {
    return <div></div>;
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
    const { children, settings } = props;

    const authorized = getAuthorityFromRouter(
        props.route.routes,
        location.pathname || '/',
    ) || {
        authority: undefined,
    };

    const { formatMessage } = useIntl();

    const breadcrumbRender = (routers = []) => [
        {
            path: '/',
            breadcrumbName: formatMessage({ id: 'menu.home' }),
        },
        ...routers,
    ];

    return (
        <ProLayout
            logo={logo}
            formatMessage={formatMessage}
            menuHeaderRender={menuHeadRender}
            itemRender={itemRender}
            menuItemRender={menuItemRender}
            menuDataRender={menuDataRender}
            footerRender={footerRender}
            breadcrumbRender={breadcrumbRender}
            {...props}
            {...settings}
        >
            <Authorized authority={authorized!.authority} noMatch={noMatch}>
                {children}
            </Authorized>
        </ProLayout>
    );
};

export default connect(({ settings }: ConnectState) => ({
    settings,
}))(BasicLayout);
