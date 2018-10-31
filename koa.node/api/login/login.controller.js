
const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = {
    /**
     * 登录验证
     * @param { object } ctx 上下文对象 
     */
    async signIn(ctx) {
        const user = ctx.query;
        if(user && user.loginname === "admin") {
            // ctx.session.user = user;
            const userToken = {
                loginname: user.loginname,
                password: 123456
            };
            // token签名, 有效期1小时
            const token = jwt.sign(userToken, config.jwtSecret, { expiresIn: "1h" });
            await ctx.render("index", {
                success: true, 
                msg: "登录成功!",
                token
            });
            // ctx.body = { 
            //     success: true, 
            //     msg: "登录成功!",
            //     token
            // };
        } else {
            ctx.body = {
                success: false, 
                msg: "登录失败!"
            }
        }
    },

    /**
     * 退出登录
     */
    async signOut(ctx) {
        if(ctx.session.user) {
            ctx.session.user = null;
        }
        ctx.body = { success: true, msg: "退出成功!" };
    }
};