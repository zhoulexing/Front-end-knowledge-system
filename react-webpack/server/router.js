import React from 'react';
import { StaticRouter, Router, Route } from 'react-router';
import { getRouterData } from '../src/common/router';

function Routes(props) {
    const routerData = getRouterData();
    const MainLayout = routerData['/apps'].component;
    const LoginLayout = routerData['/login'].component;
    return (
        <StaticRouter
            basename='/client'
            context={props.context}
            location={props.url}
        >
            <Router>
                <Route path='/apps' component={MainLayout}/>
                <Route path='/login' component={LoginLayout}/>
            </Router>
        </StaticRouter>
    )
}

export default Routes;