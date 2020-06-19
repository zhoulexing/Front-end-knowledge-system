import React from 'react';
import { getPageTitle, getMenuData } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ConnectProps, connect, useIntl } from 'umi';

export interface UserLayoutProps extends Partial<ConnectProps> {}

const UserLayout: React.FC<UserLayoutProps> = props => {
    const {
        location = {
            pathname: '',
        },
        route = {
            routes: [],
        },
        children,
    } = props;
    const { routes = [] } = route;
    const { formatMessage } = useIntl();
    const { breadcrumb } = getMenuData(routes);
    const title = getPageTitle({
        pathname: location.pathname,
        formatMessage,
        breadcrumb,
        ...props,
    });

    return (
        <HelmetProvider>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={title} />
            </Helmet>
            {children}
        </HelmetProvider>
    );
};

export default connect(() => ({}))(UserLayout);
