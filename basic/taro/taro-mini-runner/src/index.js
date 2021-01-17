import webpack from 'webpack';
import {
    META_TYPE
} from '../../taro-helper/index';

import {
    printBuildError,
    bindProdLogger,
    bindDevLogger
} from './utils/logHelper'
import buildConf from './webpack/build.conf'
import {
    isEmpty
} from 'lodash'
import {
    makeConfig
} from './webpack/chain'

const customizeChain = async (chain, modifyWebpackChainFunc, customizeFunc) => {
    if (modifyWebpackChainFunc instanceof Function) {
        await modifyWebpackChainFunc(chain, webpack)
    }
    if (customizeFunc instanceof Function) {
        customizeFunc(chain, webpack, META_TYPE)
    }
}

export default async function build(appPath, config) {
    const mode = config.mode

    /** process config.sass options */
    const newConfig = await makeConfig(config)

    /** initialized chain */
    const webpackChain = buildConf(appPath, mode, newConfig)

    /** customized chain */
    await customizeChain(webpackChain, newConfig.modifyWebpackChain, newConfig.webpackChain)

    if (typeof newConfig.onWebpackChainReady === 'function') {
        newConfig.onWebpackChainReady(webpackChain)
    }

    /** webpack config */
    const webpackConfig = webpackChain.toConfig()

    return new Promise((resolve, reject) => {
        const compiler = webpack(webpackConfig)
        const onBuildFinish = newConfig.onBuildFinish
        let prerender

        const onFinish = function (error, stats) {
            if (typeof onBuildFinish !== 'function') return

            onBuildFinish({
                error,
                stats,
                isWatch: newConfig.isWatch
            })
        }

        const callback = async (err, stats) => {
            if (err || stats.hasErrors()) {
                const error = err ?? stats.toJson().errors
                printBuildError(error)
                onFinish(error, null)
                return reject(error)
            }

            if (!isEmpty(newConfig.prerender)) {
                prerender = prerender ?? new Prerender(newConfig, webpackConfig, stats, config.template.Adapter)
                await prerender.render()
            }
            onFinish(null, stats)
            resolve(stats)
        }

        if (newConfig.isWatch) {
            bindDevLogger(compiler)
            compiler.watch({
                aggregateTimeout: 300,
                poll: undefined
            }, callback)
        } else {
            bindProdLogger(compiler)
            compiler.run(callback)
        }
    })
}