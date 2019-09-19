const Koa = require('koa');
const Router = require('koa-router');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const config = require('./config');
const app = new Koa();
const router = new Router();

// 监听全局异常
app.on('error', (err, ctx) => {
    console.error(err);
});

router.get('*', async ctx => {
    ctx.body = `
     <!DOCTYPE html>
       <html lang="en">
       <head>
         <meta charset="UTF-8">
         <title>React SSR</title>
       </head>
       <body>
         <div id="app"></div>
         <script type="text/javascript" src="/bundle.js"></script>
       </body>
     </html>
   `;
});

app.use(router.routes());
app.listen(config.port, () => {
    console.log(`the server is start at port ${config.port}`);
});