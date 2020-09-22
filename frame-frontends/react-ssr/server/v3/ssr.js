import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToString} from 'react-dom/server';
import App from '../../client/v3/app';
import routeList from '../../client/v3/routerConfig';

export default  (ctx, next)=>{

    console.log('ctx.request.path', ctx.request.path);

    const path = ctx.request.path;
    let context={};

    const html = renderToString(
        <StaticRouter location={path} context={context}>
            <App routeList={routeList}></App>
        </StaticRouter>
    );

    ctx.body=`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>测试内容111</title>
            </head>
            <body>
                <div id="root">${html}</div>
                <div>234</div>
                <script type="text/javascript" src="index.js"></script>
            </body>
        </html>
    `;
    return next();
}