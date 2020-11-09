const {
    override,
    fixBabelImports,
    addLessLoader,
    addDecoratorsLegacy,
    addPostcssPlugins,
    disableEsLint
} = require('customize-cra');

module.exports = override(
    addDecoratorsLegacy(),
    fixBabelImports("import", {
        libraryName: 'antd-mobile',
        style: true
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {}
        }
    }),
    addPostcssPlugins(
        [require('postcss-pxtorem')({
            rootValue: 16,
            propList: ['*']
        })]
    ),
    disableEsLint()
);