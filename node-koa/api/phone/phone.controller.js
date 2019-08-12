module.exports.index = async (ctx) => {
    await ctx.render("phone");
}

module.exports.refresh = async (ctx) => {
    await ctx.render("refresh");
}