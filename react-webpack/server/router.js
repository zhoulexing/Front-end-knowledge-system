import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter, Route } from 'react-router';
import { getRouterData } from '../src/common/router';
import dva from '../src/dva';
const app = dva();

function Routes(props) {
    const routerData = getRouterData();
    const MainLayout = routerData['/apps'].component;
    const LoginLayout = routerData['/login'].component;
    LoginLayout.preload();
    return (
        <Provider store={app._store}>
            <StaticRouter
                context={props.context}
                location={props.url}
            >
                <Route path='/apps' component={MainLayout}/>
                <Route path='/login' component={LoginLayout}/>
            </StaticRouter>
        </Provider>
    )
}

export default Routes;