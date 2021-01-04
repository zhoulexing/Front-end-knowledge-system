import resolvePath from 'resolve'
import spawn from 'cross-spawn'
import chalk from 'chalk'

import * as Util from './utils'

const PEERS = /UNMET PEER DEPENDENCY ([a-z\-0-9.]+)@(.+)/gm
const npmCached = {}

const erroneous = []

const defaultInstallOptions = {
    dev: false,
    peerDependencies: true
}

export const taroPluginPrefix = '@tarojs/plugin-'

export function resolveNpm(pluginName, root) {
    if (!npmCached[pluginName]) {
        return new Promise((resolve, reject) => {
            resolvePath(`${pluginName}`, {
                basedir: root
            }, (err, res) => {
                if (err) {
                    return reject(err)
                }
                npmCached[pluginName] = res
                resolve(res)
            })
        })
    }
    return Promise.resolve(npmCached[pluginName])
}

export function resolveNpmSync(pluginName, root) {
    try {
        if (!npmCached[pluginName]) {
            const res = resolvePath.sync(pluginName, {
                basedir: root
            })
            return res
        }
        return npmCached[pluginName]
    } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            console.log(chalk.cyan(`缺少npm包${pluginName}，开始安装...`))
            const installOptions = {
                dev: false
            }
            if (pluginName.indexOf(taroPluginPrefix) >= 0) {
                installOptions.dev = true
            }
            installNpmPkg(pluginName, installOptions)
            return resolveNpmSync(pluginName, root)
        }
        return ''
    }
}

export function installNpmPkg(pkgList, options) {
    if (!pkgList) {
        return
    }
    if (!Array.isArray(pkgList)) {
        pkgList = [pkgList]
    }
    pkgList = pkgList.filter(dep => {
        return erroneous.indexOf(dep) === -1
    })

    if (!pkgList.length) {
        return
    }
    options = Object.assign({}, defaultInstallOptions, options)
    let installer = ''
    let args = []

    if (Util.shouldUseYarn()) {
        installer = 'yarn'
    } else if (Util.shouldUseCnpm()) {
        installer = 'cnpm'
    } else {
        installer = 'npm'
    }

    if (Util.shouldUseYarn()) {
        args = ['add'].concat(pkgList).filter(Boolean)
        args.push('--silent', '--no-progress')
        if (options.dev) {
            args.push('-D')
        }
    } else {
        args = ['install'].concat(pkgList).filter(Boolean)
        args.push('--silent', '--no-progress')
        if (options.dev) {
            args.push('--save-dev')
        } else {
            args.push('--save')
        }
    }
    const output = spawn.sync(installer, args, {
        stdio: ['ignore', 'pipe', 'inherit']
    })
    if (output.status) {
        pkgList.forEach(dep => {
            erroneous.push(dep)
        })
    }
    let matches
    const peers = []

    while ((matches = PEERS.exec(output.stdout))) {
        const pkg = matches[1]
        const version = matches[2]
        if (version.match(' ')) {
            peers.push(pkg)
        } else {
            peers.push(`${pkg}@${version}`)
        }
    }
    if (options.peerDependencies && peers.length) {
        console.info('正在安装 peerDependencies...')
        installNpmPkg(peers, options)
    }
    return output
}

export const callPlugin = async (pluginName, content, file, config, root) => {
    const pluginFn = await getNpmPkg(`${taroPluginPrefix}${pluginName}`, root)
    return pluginFn(content, file, config)
}

export const callPluginSync = (pluginName, content, file, config, root) => {
    const pluginFn = getNpmPkgSync(`${taroPluginPrefix}${pluginName}`, root)
    return pluginFn(content, file, config)
}

export function getNpmPkgSync(npmName, root) {
    const npmPath = resolveNpmSync(npmName, root)
    const npmFn = require(npmPath)
    return npmFn
}

export async function getNpmPkg(npmName, root) {
    let npmPath
    try {
        npmPath = resolveNpmSync(npmName, root)
    } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            console.log(chalk.cyan(`缺少npm包${npmName}，开始安装...`))
            const installOptions = {
                dev: false
            }
            if (npmName.indexOf(taroPluginPrefix) >= 0) {
                installOptions.dev = true
            }
            installNpmPkg(npmName, installOptions)
            npmPath = await resolveNpm(npmName, root)
        }
    }
    const npmFn = require(npmPath)
    return npmFn
}