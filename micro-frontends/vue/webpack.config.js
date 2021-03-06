const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StatsPlugin = require("stats-webpack-plugin");

const sourcePath = path.resolve(__dirname, "./src");
const outPath = path.resolve(__dirname, "./dist");

module.exports = {
    mode: process.env.NODE_ENV,
    context: sourcePath,
    entry: "./index.js",
    output: {
        path: outPath,
        filename: "[name].js",

        library: "vue",
        libraryTarget: "umd"
    },

    devtool: "source-map",
    resolve: {
        extensions: [".vue", ".js"],
        modules: ["node_modules"],
        alias: {
            "@": sourcePath
        }
    },

    module: {
        rules: [
            {
                test:/\.vue$/,
                exclude: /node_modules/,
                use: "vue-loader"
            },
            {
                test:/\.(less|css)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                cacheDirectory: true,
                                javascriptEnabled: true,
                            }
                        },
                    },
                ],
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "vue",
            favicon: "./assets/images/favicon.ico",
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
        new VueLoaderPlugin(),
        new StatsPlugin("micro-vue-config.json", {
            chunkModules: false,
            entrypoints: true,
            source: false,
            chunks: false,
            modules: false,
            assets: false,
            children: false,
            exclude: [/node_modules/]
        }),
    ],

    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" },
        historyApiFallback: true,
        host: "0.0.0.0",
        port: 8091
    }
}