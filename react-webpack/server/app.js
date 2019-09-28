import Koa from 'koa';
import views from 'koa-views';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import webpack from 'webpack';
import koaWebpack from 'koa-webpack';

import index from './routes/index';
import user from './routes/user';
import config from './config';
import webpackConfig from '../webpack.config';

const app = new Koa()

// dev 模式热加载
app.use(koaWebpack({
    compiler: webpack(webpackConfig),
    hot: {
        log: () => { }
    },
    dev: {
        noInfo: true,
        serverSideRender: true,
        hot: true,
        logLevel: 'error',
        stats: {
            colors: true
        },
        publicPath: ''
    },
}));

// 解析body
app.use(bodyParser());

// 配置模板引擎
app.use(views(path.resolve(__dirname, './views'), { map: { html: 'ejs' } }));

// 配置静态路径
app.use(require('koa-static')(__dirname + '/dist'));

// 配置路由
app.use(index.routes(), index.allowedMethods());
app.use(user.routes(), user.allowedMethods());

app.listen(config.port, () => {
    console.log(`server is listening on port ${config.port}`);
});


