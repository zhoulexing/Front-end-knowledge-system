/**
 * 整合所有子路由
 */
const router = require("koa-router")();

const demo = require("./api/demo/demo.route");
const login = require("./api/login/login.route");
const breakPoint = require("./api/break.point/break.point.route");
const phone = require("./api/phone/phone.route");
const theme = require("./api/theme/theme.route");
const office = require("./api/office/office.route");


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


router.use("/api/demo", demo.routes(), demo.allowedMethods());
router.use("/api/login", login.routes(), login.allowedMethods());
router.use("/api/break.point", breakPoint.routes(), breakPoint.allowedMethods());
router.use("/api/phone", phone.routes(), phone.allowedMethods());
router.use("/api/theme", theme.routes(), theme.allowedMethods());
router.use("/api/office", office.routes(), office.allowedMethods());


module.exports = router;