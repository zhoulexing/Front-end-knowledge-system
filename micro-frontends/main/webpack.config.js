const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const sourcePath = path.resolve(__dirname, "./src");
const outPath = path.resolve(__dirname, "./dist");

module.exports = {
    mode: process.env.NODE_ENV,
    context: sourcePath,
    entry: "./entry/index.js",
    output: {
        path: outPath,
        filename: "[name].js",
        publicPath: "/"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".jsx"],
        modules: ["node_modules"],
        alias: {
            "@": sourcePath
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "微前端",
            favicon: "../assets/images/favicon.ico",
            template: `./index.ejs`,
            filename: `index.html`,
            // 压缩html
            minify: {
                minifyJS: true,
                minifyCSS: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true // 删除空白符与换行符
            }
        }),
    ],

    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" },
        historyApiFallback: true,
        host: "0.0.0.0",
        port: 8090
    }
};
