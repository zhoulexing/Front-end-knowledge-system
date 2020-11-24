import React from 'react';
import { getRoutes } from '../utils/util';
import getRouterConfig from '../common/router';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

interface BasicLayoutProps extends RouteComponentProps { };

const routerConfig = getRouterConfig();

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
    const { match } = props;
    const routes = getRoutes(match.path, routerConfig);

    return (
        <Switch>
            <Redirect exact from={match.path} to={routes[0].path}/>
            {routes.map(item => (
                <Route key={item.path} path={item.path} component={item.component}/>
            ))}
        </Switch>
    )
}

export default BasicLayout;