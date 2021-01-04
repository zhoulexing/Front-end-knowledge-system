const {
    override,
    fixBabelImports,
    addLessLoader,
    addDecoratorsLegacy,
    addPostcssPlugins,
    disableEsLint,
    overrideDevServer,
} = require("customize-cra");

const addCustomize = () => config => {
    if(process.env.NODE_ENV === 'production') {
        config.output.publicPath = './demo';
        return config;
    }
}


module.exports = {
    webpack: override(
        addDecoratorsLegacy(),
        // fixBabelImports("import", {
        //     libraryName: "antd-mobile",
        //     style: true,
        // }),

        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
        }),

        addLessLoader({
            lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                    "background-color": "#fbfbfb",
                    "radius-md": "2px",
                },
            },
        }),
        addPostcssPlugins([
            require("postcss-pxtorem")({
                rootValue: 16,
                propList: ["*"],
            }),
        ]),
        disableEsLint(),
        addCustomize()
    ),
    devServer: overrideDevServer(devServerConfig()),
};
