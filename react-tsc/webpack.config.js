const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const IS_PRO = process.env.NODE_ENV === "production";

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash:8].js",
        chunkFilename: "[name].[hash:8].js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ["babel-loader", "ts-loader"]
            },
            {
                test: /\.(less|css)$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
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
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
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
    devtool: IS_PRO ? "source-map" : "inline-source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".less", ".css"],
        modules: ["node_modules"],
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "周某人",
            template: `./src/index.ejs`,
            filename: `index.html`,
            // 压缩html
            minify: IS_PRO
                ? {
                      collapseInlineTagWhitespace: true,
                      collapseWhitespace: true
                  }
                : {}
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "src"),
        compress: true,
        hot: false,
        host: "0.0.0.0",
        port: 8081
    }
};
