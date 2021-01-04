import path from "path";
import findWorkspaceRoot from "find-yarn-workspace-root";
import fs from "fs-extra";
import {
    processTypeEnum,
    SCRIPT_EXT
} from "./constants";
import {
    func
} from '@hapi/joi';
import {
    remove
} from 'lodash';

export const getModuleDefaultExport = (exports) =>
    exports.__esModule ? exports.default : exports;

export function normalizePath(path) {
    return path.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
}

export function printLog(type, tag, filePath) {
    console.log("printLog: ", type, tag, filePath);
}

export function recursiveFindNodeModules(filePath, lastFindPath) {
    if (
        lastFindPath &&
        normalizePath(filePath) === normalizePath(lastFindPath)
    ) {
        return filePath;
    }
    const dirname = path.dirname(filePath);
    const workspaceRoot = findWorkspaceRoot(dirname);
    const nodeModules = path.join(workspaceRoot || dirname, "node_modules");
    if (fs.existsSync(nodeModules)) {
        return nodeModules;
    }
    if (dirname.split(path.sep).length <= 1) {
        printLog(
            processTypeEnum.ERROR,
            `在${dirname}目录下`,
            "未找到node_modules文件夹，请先安装相关依赖库！"
        );
        return nodeModules;
    }
    return recursiveFindNodeModules(dirname, filePath);
}

export function addPlatforms(platform) {
    const upperPlatform = platform.toLocaleUpperCase();
    if (PLATFORMS[upperPlatform]) return;
    PLATFORMS[upperPlatform] = platform;
}

const retries = (process.platform === 'win32') ? 100 : 1;
export function emptyDirectory(dirPath, opts) {
    if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach(file => {
            const curPath = path.join(dirPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                let removed = false;
                let i = 0;
                do {
                    try {
                        if (!opts.excludes.length || !opts.excludes.some(item => curPath.indexOf(item) >= 0)) {
                            emptyDirectory(curPath);
                            fs.rmdirSync(curPath);
                        }
                        removed = true;
                    } catch (error) {

                    } finally {
                        if (++i < retries) {
                            continue;
                        }
                    }
                } while (!removed)
            } else {
                fs.unlinkSync(curPath);
            }
        });
    }
}

export function resolveScriptPath(p) {
    return resolveMainFilePath(p)
}

export function resolveMainFilePath(p, extArrs = SCRIPT_EXT) {
    const realPath = p
    const taroEnv = process.env.TARO_ENV
    for (let i = 0; i < extArrs.length; i++) {
        const item = extArrs[i]
        if (taroEnv) {
            if (fs.existsSync(`${p}.${taroEnv}${item}`)) {
                return `${p}.${taroEnv}${item}`
            }
            if (fs.existsSync(`${p}${path.sep}index.${taroEnv}${item}`)) {
                return `${p}${path.sep}index.${taroEnv}${item}`
            }
            if (fs.existsSync(`${p.replace(/\/index$/, `.${taroEnv}/index`)}${item}`)) {
                return `${p.replace(/\/index$/, `.${taroEnv}/index`)}${item}`
            }
        }
        if (fs.existsSync(`${p}${item}`)) {
            return `${p}${item}`
        }
        if (fs.existsSync(`${p}${path.sep}index${item}`)) {
            return `${p}${path.sep}index${item}`
        }
    }
    return realPath
}