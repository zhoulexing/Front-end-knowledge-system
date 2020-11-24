import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import getRouterConfig from './common/router';

interface RouterConfigProps {}

const RouterConfig: React.FC<RouterConfigProps> = () => {
    const routerConfig = getRouterConfig();
    const BasicLayout = routerConfig["/apps"].component;

    return (
        <Router>
            <Switch>
                <Redirect exact from='/' to='/apps'/>
                <Route path='/apps' component={BasicLayout}/>
            </Switch>
        </Router>
    )
}

export default RouterConfig;