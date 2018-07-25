const a = require("./javascripts/a.js");
const context = require.context("./javascripts/", true, /\.\/.+\.js$/);
console.log("context:", context.keys());
console.log("context:", context("./a.js"));
console.log("a:", a);
module.exports = "Hello";