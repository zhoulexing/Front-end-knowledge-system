const router = require("koa-router")();
const login = require("./login.controller");

module.exports = router
    .get("/in", login.signIn)
    .get("/out", login.signOut);