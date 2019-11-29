const router = require("koa-router")();
const demo = require("./demo.controller");

module.exports = router
    .get("/", demo.index)
    .get("/getJsonp", demo.getJsonpData)
    .get("/upload/page", demo.getUploadPage)
    .post("/upload/done", demo.uplpadDone)
    .get("/getPhone/:filename", demo.getPhone)
    .get("/download/:filename", demo.download)
    .get("/getData", demo.getData)
    .get("/getJwt", demo.getJwt)
    .get("/getList", demo.getList)
    .get("/image", demo.getImage);
