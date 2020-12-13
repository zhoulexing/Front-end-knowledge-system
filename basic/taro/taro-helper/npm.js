import fs from "fs-extra";
import path from "path";
import { SCRIPT_EXT } from "./constants";

export function resolveScriptPath(p) {
    return resolveMainFilePath(p);
}

export function resolveMainFilePath(p, extArrs = SCRIPT_EXT) {
    const realPath = p;
    const taroEnv = process.env.TARO_ENV;
    for (let i = 0; i < extArrs.length; i++) {
        const item = extArrs[i];
        if (taroEnv) {
            if (fs.existsSync(`${p}.${taroEnv}${item}`)) {
                return `${p}.${taroEnv}${item}`;
            }
            if (fs.existsSync(`${p}${path.sep}index.${taroEnv}${item}`)) {
                return `${p}${path.sep}index.${taroEnv}${item}`;
            }
            if (
                fs.existsSync(
                    `${p.replace(/\/index$/, `.${taroEnv}/index`)}${item}`
                )
            ) {
                return `${p.replace(/\/index$/, `.${taroEnv}/index`)}${item}`;
            }
        }
        if (fs.existsSync(`${p}${item}`)) {
            return `${p}${item}`;
        }
        if (fs.existsSync(`${p}${path.sep}index${item}`)) {
            return `${p}${path.sep}index${item}`;
        }
    }
    return realPath;
}