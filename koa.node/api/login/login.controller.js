
module.exports = {
    /**
     * 登录验证
     * @param { object } ctx 上下文对象 
     */
    async signIn(ctx) {
        const user = ctx.query;
        if(user.loginname === "admin" && user.password === "123456") {
            ctx.session.user = user;
        }
        ctx.body = { success: true, msg: "登录成功!" };
    },

    /**
     * 退出登录
     */
    async signOut(ctx) {
        console.log(ctx.session.user);
        if(ctx.session.user) {
            ctx.session.user = null;
        }
        ctx.body = { success: true, msg: "退出成功!" };
    }
};