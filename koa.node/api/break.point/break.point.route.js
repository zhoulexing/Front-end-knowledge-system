const router = require("koa-router")();
const breakPoint = require("./break.point.controller");

module.exports = router
    .get("/page", breakPoint.getPage)
    .post("/upload", breakPoint.upload)
    .get("/range", breakPoint.range);