/**
 * 整合所有子路由
 */
const router = require("koa-router")();
const swagRouter = require("./swagger");

const demo = require("./api/demo/demo.route");
const login = require("./api/login/login.route");

// 处理跨域
router.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Methods", "PUT,DELETE,POST,GET, OPTIONS");
    ctx.set("Access-Control-Allow-Credentials", true);
    ctx.set("Access-Control-Max-Age", 3600 * 24);
    await next();
});

// 登录验证
/* const allowurl = ["/api/login/in"];
router.use(async (ctx, next) => {
    let url = ctx.originalUrl;
    if(allowurl.indexOf(url) > -1) {
        await next();
    } else {
        await ctx.render("index");
    }
}); */

router.use("/api", swagRouter.routes());
router.use("/api/demo", demo.routes(), demo.allowedMethods());
router.use("/api/login", login.routes(), login.allowedMethods());

module.exports = router;