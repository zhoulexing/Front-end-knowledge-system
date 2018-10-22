const path = require("path");
export default {
    entry: "./src/index.js",
    outputPath: path.resolve(__dirname, "client"),
    theme: "./src/theme.js",
    alias: {
        "utils": path.resolve(__dirname, "./src/utils"),
        "common": path.resolve(__dirname, "./src/common"),
        "components": path.resolve(__dirname, "./src/components"),
        "images": path.resolve(__dirname, "./src/assets/images")
    },
    html: {
        template: "./src/index.ejs",
        title: "众智平台",
        favicon: "./src/assets/images/favicon.ico"
    },
    extraBabelPlugins: [
        ["import", { libraryName: "antd", libraryDirectory: "es", style: true }]
    ],
    env: {
        development: {
            extraBabelPlugins: ["dva-hmr"]
        }
    },
    disableDynamicImport: true,
    lessLoaderOptions: {
        javascriptEnabled: true
    },
    browserslist: [
        "> 1%",
        "last 2 versions"
    ],
    ignoreMomentLocale: true,
    hash: true,
    /*copy: [
        { from: "", to: "" }
    ],*/
    proxy: {
        "/api/*": {
            target: "http://127.0.0.1:8001",
            changeOrigin: true
        }
    }
}
