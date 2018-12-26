const router = require("koa-router")();
const phone = require("./phone.controller");

module.exports = router
    .get("/index", phone.index);