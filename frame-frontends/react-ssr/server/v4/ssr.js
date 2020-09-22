import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToString} from 'react-dom/server';
import App from '../../client/v4/app';
import routeList from '../../client/v4/routerConfig';
import matchRoute from '../../share/match-route';

export default async (ctx, next)=>{

    const path = ctx.request.path;
    console.log('ctx.request.path', ctx.request.path);

    if(path.indexOf('.') > -1) {
        ctx.body=null;
        return next();
    }

    let matchResult = matchRoute(path, routeList);
    let { targetRoute }=matchResult;

    let fetchDataFn = targetRoute.component.getInitialProps;
    let fetchResult = {};
    if(fetchDataFn){
        fetchResult = await fetchDataFn();
    }

    let context={
        initialData: fetchResult
    };

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
                <textarea id="ssrTextInitData" style="display:none;">
                    ${JSON.stringify(fetchResult)}
                </textarea>
                <script type="text/javascript" src="index.js"></script>
            </body>
        </html>
    `;
    return next();
}