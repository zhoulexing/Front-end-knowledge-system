const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCss = require("optimize-css-assets-webpack-plugin");

const IS_PRO = process.env._ENV_ === "production";

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash:8].js",
        chunkFilename: "[name].[hash:8].js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader", "ts-loader"]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.(less|css)$/,
                exclude: /node_modules/,
                use: [
                    IS_PRO ? MiniCssExtractPlugin.loader : "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: {
                                localIdentName: "[local]--[hash:base64:5]"
                            }
                        }
                    },
                    "postcss-loader",
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true,
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(less|css)$/,
                include: /node_modules/,
                use: [
                    IS_PRO ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true,
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    devtool: IS_PRO ? "" : "inline-source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".less", ".css"],
        modules: ["node_modules"],
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "前沿前端",
            template: `./src/index.ejs`,
            filename: `index.html`,
            // 压缩html
            minify: IS_PRO
                ? {
                      collapseInlineTagWhitespace: true,
                      collapseWhitespace: true
                  }
                : {}
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css"
        }),
        IS_PRO
            ? new OptimizeCss({
                  assetNameRegExp: /\.css$/g,
                  cssProcessor: require("cssnano"),
                  cssProcessorOptions: { discardComments: { removeAll: true } },
                  canPrint: true
              })
            : null
    ].filter(Boolean),
    devServer: {
        contentBase: path.resolve(__dirname, "src"),
        compress: true,
        hot: false,
        host: "0.0.0.0",
        port: 8081
    }
};
