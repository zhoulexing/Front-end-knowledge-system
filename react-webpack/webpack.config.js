const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ModuleConcatenationPlugin = require("webpack/lib/optimize/ModuleConcatenationPlugin");
const HappyPack = require("happypack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const optimizeCss = require("optimize-css-assets-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const os = require("os");
const chalk = require("chalk");
const path = require("path");
const package = require("./package.json");

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const version = package.version;
const IS_PRO = process.env._ENV_ === "production";

let plugins = [
    new HtmlWebpackPlugin({
        title: "周某人",
        template: `./src/index.ejs`,
        filename: `index${ IS_PRO ? `-v${version}` : "" }.html`,
        // 压缩html
        minify: {
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true
        }
    }),
    new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
    }),
    new HappyPack({
        id: "js",
        loaders: ["babel-loader?cacheDirectory=true"],
        threadPool: happyThreadPool,
        verbose: true
    }),
];

if(IS_PRO) {
    plugins = plugins.concat([
        new CleanWebpackPlugin(),
         // 压缩css
        new optimizeCss({ 
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano"),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new ParallelUglifyPlugin({
            // 传递给 UglifyJS的参数如下：
            uglifyJS: {
                output: {
                    // 是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，可以设置为false
                    beautify: false,
                    // 是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
                    comments: false
                },
                compress: {
                    // 是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
                    drop_console: true,
                    // 是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不转换，为了达到更好的压缩效果，可以设置为false
                    collapse_vars: true,
                    //  是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = "xxx"; y = "xxx"  转换成 var a = "xxxx"; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
                    reduce_vars: true
                }
            }
        }),
        new ProgressBarPlugin({
            format: "  build [:bar] " + chalk.green.bold(":percent") + " (:elapsed seconds)"
        }),
    ]);
} else {
    plugins = plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        // 开启 Scope Hoisting
        new ModuleConcatenationPlugin(),
    ]);
}


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js",
        chunkFilename: "[name].[hash].js",
    },
    plugins: plugins,
    resolve: {
        extensions: [".js", ".jsx", ".less", ".css"],
        modules: ["node_modules"],
        alias: require("./src/alias")
    },
    devtool: IS_PRO ? "" : "inline-source-map",
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ["happypack/loader?id=js"]
        }, {
            test: /\.(less|css)$/,
            exclude: /node_modules/,
            use: [
                { loader: MiniCssExtractPlugin.loader },
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
                        javascriptEnabled: true,
                    }
                }
            ]
        }, {
            test: /\.(less|css)$/,
            include: /node_modules/,
            use: [
                { loader: MiniCssExtractPlugin.loader },
                "css-loader",
                "postcss-loader",
                {
                    loader: "less-loader",
                    options: {
                        modifyVars: require("./src/theme"),
                        javascriptEnabled: true,
                    }
                }
            ]
        }, {
            test:/\.(eot|woff|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
            use: ["file-loader?name=iconfont/[name]_[sha512:hash:base64:7].[ext]"],
            include: path.resolve(__dirname, "src"),
        }, {
            test: /\.(png|jpg|gif)$/,
            use: ["url-loader?limit=8192&name=images/[name]_[sha512:hash:base64:7].[ext]"],
            include: path.resolve(__dirname, "src"),
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        compress: true,
        hot: true,
        host: "127.0.0.1",
        port: 8889,
    }
};
