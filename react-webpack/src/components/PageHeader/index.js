import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { urlToList } from '../../utils/util';
import styles from './index.less';

export function getBreadcrumb(breadcrumbNameMap, url) {
    let breadcrumb = breadcrumbNameMap[url];
    if (!breadcrumb) {
        Object.keys(breadcrumbNameMap).forEach((item) => {
            if (pathToRegexp(item).test(url)) {
                breadcrumb = breadcrumbNameMap[item];
            }
        });
    }
    return breadcrumb || {};
}

export default class PageHeader extends React.PureComponent {
    static contextTypes = {
        routes: PropTypes.array,
        params: PropTypes.object,
        location: PropTypes.object,
        breadcrumbNameMap: PropTypes.object,
    };

    state = {
        breadcrumb: null,
    };

    componentDidMount() {
        this.getBreadcrumbDom();
    }

    render() {
        const { breadcrumb } = this.state;
        return (
            <div className={styles.pageHeader}>
                {breadcrumb}
          </div>
        );
    }

    getBreadcrumbDom = () => {
        const breadcrumb = this.conversionBreadcrumbList();
        this.setState({
            breadcrumb,
        });
    }

    /**
     * 将参数转化为面包屑
     */
    conversionBreadcrumbList = () => {
        const { breadcrumbList, breadcrumbSeparator } = this.props;
        const {
            routes, params, routerLocation, breadcrumbNameMap,
        } = this.getBreadcrumbProps();

        // 如果传进来了breadcrumbList，则采用breadcrumbList作为面包屑
        if (breadcrumbList && breadcrumbList.length) {
            return this.conversionFromProps();
        }

        // 如果有routes和params, 则用routes和params作为面包屑
        if (routes && params) {
            return (
                <Breadcrumb
                className={styles.breadcrumb}
                    routes={routes.filter(route => route.breadcrumbName)}
                params={params}
                    itemRender={this.itemRender}
                    separator={breadcrumbSeparator}
              />
            );
        }

        // 根据location生成面包屑
        if (routerLocation && routerLocation.pathname) {
            return this.conversionFromLocation(routerLocation, breadcrumbNameMap);
        }

        return null;
    }

    conversionFromLocation = (routerLocation, breadcrumbNameMap) => {
        const { breadcrumbSeparator, linkElement = 'a' } = this.props;
        const pathSnippets = urlToList(routerLocation.pathname);

        const extraBreadcrumbItems = pathSnippets.map((url, index) => {
            const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
            const isLinkable = index !== pathSnippets.length - 1 && currentBreadcrumb.component;
            return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? (
                <Breadcrumb.Item key={url}>
                    {React.createElement(
                        isLinkable ? linkElement : 'span',
                        { [linkElement === 'a' ? 'href' : 'to']: url },
                        currentBreadcrumb.name,
                    )}
              </Breadcrumb.Item>
            ) : null;
        });

        /* extraBreadcrumbItems.unshift(
            <Breadcrumb.Item key="home">
                {React.createElement(
                    linkElement,
                    {
                        [linkElement === "a" ? "href" : "to"]: "/apps/desktop",
                    },
                    "系统首页"
                )}
            </Breadcrumb.Item>
        ); */

        return (
            <Breadcrumb className={styles.breadcrumb} separator={breadcrumbSeparator}>
            {extraBreadcrumbItems}
          </Breadcrumb>
        );
    }

    getBreadcrumbProps = () => {
        const {
            routes, params, location, breadcrumbNameMap,
        } = this.props;
        const {
            routes: croutes,
            params: cparams,
            location: clocation,
            breadcrumbNameMap: cbreadcrumbNameMap,
        } = this.context;
        return {
            routes: routes || croutes,
            params: params || cparams,
            routerLocation: location || clocation,
            breadcrumbNameMap: breadcrumbNameMap || cbreadcrumbNameMap,
        };
    }

    conversionFromProps = () => {
        const { breadcrumbList, breadcrumbSeparator, linkElement = 'a' } = this.props;
        return (
            <Breadcrumb className={styles.breadcrumb} separator={breadcrumbSeparator}>
                {breadcrumbList.map(item => (
                    <Breadcrumb.Item key={item.title}>
                        {item.href
                            ? React.createElement(
                                linkElement,
                                {
                                    [linkElement === 'a' ? 'href' : 'to']: item.href,
                                },
                                item.title,
                            )
                            : item.title}
                  </Breadcrumb.Item>
                ))}
          </Breadcrumb>
        );
    }

    itemRender = (route, params, routes, paths) => {
        const { linkElement = 'a' } = this.props;
        const last = routes.indexOf(route) === routes.length - 1;
        return last || !route.component ? (
            <span>{route.breadcrumbName}</span>
        ) : (
            React.createElement(
                linkElement,
                {
                    href: paths.join('/') || '/',
                    to: paths.join('/') || '/',
                },
                route.breadcrumbName,
            )
        );
    };
}
