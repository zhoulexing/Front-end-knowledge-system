const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash:8].js",
        chunkFilename: "[name].[hash:8].js"
    },
    devtool: "source-map",
    devServer: {
        open: true,
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
        }),
        new webpack.DllReferencePlugin({
            manifest: require("./dll/vendor.manifest.json"),
            context: "./dll"
        })
    ]
}