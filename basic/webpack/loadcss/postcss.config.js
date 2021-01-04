module.exports = {
    plugins: [
        require("postcss-preset-env")({
            overrideBrowserslist: ["> 1%", "last 5 versions"]
        }),
        require("postcss-import"),
        // require("cssnano")
    ]
};
