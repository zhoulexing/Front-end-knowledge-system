const router = require("koa-router")();
const office = require("./office.controller");

module.exports = router
    .get("/docx", office.docx);