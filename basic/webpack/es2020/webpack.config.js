const path = require("path");

module.exports = {
    mode: process.env.NODE_ENV,
    entry: "./es2020/index.js",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader"
            }
        ]
    }
}