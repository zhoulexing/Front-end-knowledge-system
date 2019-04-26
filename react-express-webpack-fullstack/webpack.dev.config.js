const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

const hasDll = fs.existsSync("./dll/vendor.manifest.json");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "client"),
        filename: "[name].[hash:8].js",
        chunkFilename: "[name].[hash:8].js"
    },
    devtool: "source-map",
    devServer: {
        hot: true,
        open: true,
        host: "127.0.0.1",
        port: 9000,
        proxy: {
            "/api/*": {
			    target: "http://127.0.0.1:3000",
			    // 接受https
			    secure: false
			}
        }
    },
    resolve: {
        extensions: [".js", ".jsx", ".less", ".css"],
        modules: ["node_modules"],
        alias: require("./src/alias")
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[local]_[hash:base64:5]"
                        }
                    },
                    "postcss-loader",
                    {
                        loader: "less-loader",
                        options: {
                            modifyVars: require("./src/theme"),
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                include: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "less-loader",
                        options: {
                            modifyVars: require("./src/theme"),
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test:/\.(eot|woff|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
                use: ["file-loader?name=iconfont/[name]_[sha512:hash:base64:7].[ext]"],
                include: path.resolve(__dirname, "src"),
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ["url-loader?limit=8192&name=images/[name]_[sha512:hash:base64:7].[ext]"],
                include: path.resolve(__dirname, "src"),
            }
        ]
    },

    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.ejs",
            title: "周某人",
            favicon: "./src/assets/images/favicon.ico",
            hasDll: !!hasDll
        }),
        new webpack.DllReferencePlugin({
            manifest: require("./dll/vendor.manifest.json"),
            context: "./dll"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    optimization: {
        splitChunks: {
            minSize: 30000, 
            minChunks: 2, 
            maxAsyncRequests: 5, 
            maxInitialRequests: 3, 
            name: true,
            cacheGroups: { 
                commons: { 
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendors: {
                    test: /node_modules/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    }
}