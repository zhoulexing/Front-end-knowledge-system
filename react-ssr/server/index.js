import Koa from 'koa';
import koaStatic from 'koa-static';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider, createStore,  } from 'react-redux';
import store from '../src/store';
import Routes from '../src/router';
import config from './config';

const app = new Koa();

app.use(koaStatic(
    path.join(__dirname , "./static")
));

app.use(ctx => {
    const context = {};
    let str = renderToString(
        <Provider store={store}>
            <StaticRouter
                location={ctx.url}
                context={context}
            >
                <Routes />
            </StaticRouter>
        </Provider>
    );
    ctx.body = str;
});

app.listen(config.port, () => {
    console.log(`the server is start at port ${config.port}`);
});