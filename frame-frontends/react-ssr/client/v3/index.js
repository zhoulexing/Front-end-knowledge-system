import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import routeList from './routerConfig';
import App from './app';



ReactDOM.hydrate(
    <BrowserRouter>
        <App routeList={routeList}/>
    </BrowserRouter>,
    document.getElementById('root')
)

