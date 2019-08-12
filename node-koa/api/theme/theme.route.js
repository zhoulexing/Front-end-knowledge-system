const router = require("koa-router")();
const theme = require("./theme.controller");

module.exports = router
    .get("/seven", theme.seven);