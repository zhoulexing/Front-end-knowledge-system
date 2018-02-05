const path = require("path");
module.exports = {
    entry: "./entry.output/a.js",
    output: {
        path: path.resolve(__dirname, "entry.output"),
        filename: "c.js"
    },
};