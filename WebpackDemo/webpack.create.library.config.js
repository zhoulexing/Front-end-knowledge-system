const path = require("path");

const DIR_NAME = "create.library";
module.exports = {
    entry: `./${DIR_NAME}/index.js`,
    output: {
        path: path.resolve(__dirname, DIR_NAME),
        filename: "dist/webpack-number.js",
        library: "webpackNumbers",
        libraryTarget: "umd"
    },
    externals: {
        lodash: {
            commonjs: "lodash",
            commonjs2: "lodash",
            amd: "lodash",
            root: '_'
        }
    }
};