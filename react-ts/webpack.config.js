const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const IS_PRO = process.env.NODE_ENV === 'production';

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash:8].js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    "babel-loader",
                    "ts-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".less", ".css"],
        modules: ["node_modules", "src"],
        alias: { "@": "./src" }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "周某人",
            template: `./src/index.ejs`,
            filename: `index.html`,
            // 压缩html
            minify: IS_PRO ? {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true
            } : {},
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "src"),
        compress: true,
        hot: false,
        host: "0.0.0.0",
        port: 8081,
    },
};
