import ReactDOMServer from 'react-dom/server';
import React from 'react';
import Routes from '../router';

const router = require('koa-router')();
const { renderToString } = ReactDOMServer;

router.get(/\/client.*/, async (ctx, next) => {
    let url = ctx.request.url.replace('/client', '');
    const context = {};
    let str = renderToString(<Routes url={url} context={context}/>);
    await ctx.render('index', {
        root: str,
    });
});

module.exports = router;
