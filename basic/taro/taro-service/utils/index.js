import path from "path";
import { merge } from "lodash";
import resolve from "resolve";
import helper from "../../taro-helper";

export function mergePlugins(dist, src) {
    return () => {
        const srcObj = convertPluginsToObject(src)();
        const distObj = convertPluginsToObject(dist)();
        return merge(srcObj, distObj);
    };
}

export function convertPluginsToObject(items) {
    return () => {
        const obj = {};
        if (Array.isArray(items)) {
            items.forEach((item) => {
                if (typeof item === "string") {
                    const name = getPluginPath(item);
                    obj[name] = null;
                } else if (Array.isArray(item)) {
                    const name = getPluginPath(item[0]);
                    obj[name] = item[1];
                }
            });
        }
        return obj;
    };
}

export function getPluginPath(pluginPath) {
    if (isNpmPkg(pluginPath) || path.isAbsolute(pluginPath)) return pluginPath;
    throw new Error("plugin 和 preset 配置必须为绝对路径或者包名");
}

export const isNpmPkg = (name) => !/^(\.|\/)/.test(name);

export function resolvePresetsOrPlugins(root, args, type) {
    return Object.keys(args).map((item) => {
        const fPath = resolve.sync(item, {
            basedir: root,
            extensions: [".js", ".ts"],
        });

        return {
            id: fPath,
            path: fPath,
            type,
            opts: args[item] || {},
            apply() {
                return helper.getModuleDefaultExport(require(fPath));
            },
        };
    });
}
