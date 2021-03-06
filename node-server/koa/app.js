// require("./polyfill"); // 为了支持es6等高级语法

const Koa = require("koa");
const path = require("path");
const bodyParser = require("koa-bodyparser");
const koaLogger = require("koa-logger");
const koaStatic = require("koa-static");
const session = require("koa-session");
const koaBody = require("koa-body");
const cors = require("koa2-cors");
const views = require("koa-views");
const jwtKoa = require("koa-jwt");

const config = require("./config");
const routers = require("./routers");
const { dbconnect } = require("./utils/mongodb");

const app = new Koa();

// 连接数据库
// dbconnect();

// 配置session中间件
app.keys = ["zzpt"]; // 加密钥匙
app.use(session({
	key: "USER_SID",
	maxAge: 60 * 60 * 1000,  // cookie的过期时间
	overwrite: true,  // 是否可以overwrite    (默认default true)
	httpOnly: false, // cookie是否只有服务器端可以访问 httpOnly or not (default true)
	signed: true,   // 签名默认true
	rolling: true,  // 在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
	renew: true,  // (boolean) renew session when session is nearly expired,
}, app));

// 监听全局异常
app.on("error", (err, ctx) => {
	console.error(err);
});

// 设置jwt验证
/* app.use(jwtKoa({ secret: config.jwtSecret }).unless({
	path: [/^\/api\/login/] // 匹配则不需要通过jwt验证
})); */

// 设置跨域
app.use(cors({
	allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Accept"],
    origin: function(ctx) {
        return "*" // 本地环境
    }
}));

// 配置控制台日志中间件
app.use(koaLogger());

app.use(koaBody({
	multipart: true,
	formidable: {
		maxFieldsSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M 
	}
}));

// 配置服务端渲染模板
app.use(views(path.join(__dirname, "./views"), {
	extension: config.viewEngine
}));

// 配置静态资源加载中间件
app.use(koaStatic(
	path.join(__dirname , "./static")
));

// 配置ctx.body解析中间件
app.use(bodyParser());

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

// 监听启动端口
module.exports = app.listen(config.port, () => {
	console.log(`the server is start at port ${ config.port }`);
});
