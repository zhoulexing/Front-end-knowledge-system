const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash:8].js"
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        host: "127.0.0.1",
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.ejs",
            title: "周某人"
        })
    ]
}