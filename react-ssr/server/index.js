import Koa from 'koa';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../client/index';
import config from './config';

const app = new Koa();
app.use(ctx => {
    let str = renderToString(<App />);
    ctx.body = str;
});

app.listen(config.port, () => {
    console.log(`the server is start at port ${config.port}`);
});