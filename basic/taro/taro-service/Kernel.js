import { EventEmitter } from "events";
import helper, {
    recursiveFindNodeModules,
    createBabelRegister,
} from "../taro-helper";
import { NODE_MODULES } from "../taro-helper/constants";
import Config from "./Config";
import Plugin from "./Plugin";
import path from "path";
import {
    mergePlugins,
    resolvePresetsOrPlugins,
    convertPluginsToObject,
} from "./utils/index";
import { PluginType } from "./utils/constants";

export default class Kernel extends EventEmitter {
    constructor(options) {
        super();
        this.debugger = helper.createDebug("Taro:Kernel");
        options.appPath =
            "D:\\project\\Front-end-knowledge-system\\mini-apps\\taro3";
        this.appPath = options.appPath || process.cwd();
        this.optsPresets = options.presets;
        this.optsPlugins = options.plugins;
        this.hooks = new Map();
        this.methods = new Map();
        this.commands = new Map();
        this.platforms = new Map();
        this.initHelper();
    }

    setRunOpts(opts) {
        this.runOpts = opts;
    }

    initHelper() {
        this.helper = helper;
        this.debugger("initHelper");
    }

    initConfig() {
        this.config = new Config({
            appPath: this.appPath,
        });
        console.log("initConfig:", this.config);
        this.initialConfig = this.config.initialConfig;
        this.debugger("initConfig", this.initialConfig);
    }

    initPaths() {
        this.paths = {
            appPath: this.appPath,
            nodeModulesPath: recursiveFindNodeModules(
                path.join(this.appPath, NODE_MODULES)
            ),
        };
        if (this.config.isInitSuccess) {
            Object.assign(this.paths, {
                configPath: this.config.configPath,
                sourcePath: path.join(
                    this.appPath,
                    this.initialConfig.sourceRoot
                ),
                outputPath: path.join(
                    this.appPath,
                    this.initialConfig.outputRoot
                ),
            });
        }
        console.log("initPaths:", this.paths);
        this.debugger(`initPaths:${JSON.stringify(this.paths, null, 2)}`);
    }

    initPresetsAndPlugins() {
        const initialConfig = this.initialConfig;
        const allConfigPresets = mergePlugins(
            this.optsPresets || [],
            initialConfig.presets || []
        )();
        const allConfigPlugins = mergePlugins(
            this.optsPlugins || [],
            initialConfig.plugins || []
        )();
        this.debugger(
            "initPresetsAndPlugins",
            allConfigPresets,
            allConfigPlugins
        );
        console.log(
            "allConfigPresets, allConfigPlugins",
            allConfigPresets,
            allConfigPlugins
        );
        process.env.NODE_ENV !== "test" &&
            createBabelRegister({
                only: [
                    ...Object.keys(allConfigPresets),
                    ...Object.keys(allConfigPlugins),
                ],
            });
        this.plugins = new Map();
        this.extraPlugins = [];
        this.resolvePresets(allConfigPresets);
        this.resolvePlugins(allConfigPlugins);
    }

    resolvePlugins(plugins) {
        const allPlugins = resolvePresetsOrPlugins(
            this.appPath,
            plugins,
            PluginType.Plugin
        );
        const _plugins = [...this.extraPlugins, ...allPlugins];
        while (_plugins.length) {
            this.initPlugin(_plugins.shift());
        }
        this.extraPlugins = [];
    }

    initPlugin(plugin) {
        const { id, path, opts, apply } = plugin;
        const pluginCtx = this.initPluginCtx({ id, path, ctx: this });
        this.debugger("initPlugin", plugin);
        this.registerPlugin(plugin);
        apply()(pluginCtx, opts);
        this.checkPluginOpts(pluginCtx, opts);
    }

    checkPluginOpts(pluginCtx, opts) {
        console.log("checkPluginOpts:", pluginCtx, opts);
    }

    initPluginCtx({ id, path, ctx }) {
        const pluginCtx = new Plugin({ id, path, ctx });
        const internalMethods = ["onReady", "onStart"];
        const kernelApis = [
            "appPath",
            "plugins",
            "platforms",
            "paths",
            "helper",
            "runOpts",
            "initialConfig",
            "applyPlugins",
        ];
        internalMethods.forEach((name) => {
            if (!this.methods.has(name)) {
                pluginCtx.registerMethod(name);
            }
        });
        return new Proxy(pluginCtx, {
            get: (target, name) => {
                if (this.methods.has(name)) return this.methods.get(name);
                if (kernelApis.includes(name)) {
                    return typeof this[name] === "function"
                        ? this[name].bind(this)
                        : this[name];
                }
                return target[name];
            },
        });
    }

    initPreset(preset) {
        this.debugger("initPreset", preset);
        const { id, path, opts, apply } = preset;
        const pluginCtx = this.initPluginCtx({ id, path, ctx: this });
        const { presets, plugins } = apply()(pluginCtx, opts) || {};
        console.log("presets, plugins：", presets, plugins);
        this.registerPlugin(preset);
        if (Array.isArray(presets)) {
            const _presets = resolvePresetsOrPlugins(
                this.appPath,
                convertPluginsToObject(presets)(),
                PluginType.Preset
            );
            while (_presets.length) {
                this.initPreset(_presets.shift());
            }
        }
        if (Array.isArray(plugins)) {
            this.extraPlugins.push(
                ...resolvePresetsOrPlugins(
                    this.appPath,
                    convertPluginsToObject(plugins)(),
                    PluginType.Plugin
                )
            );
        }
    }

    registerPlugin(plugin) {
        if (this.plugins.has(plugin.id)) {
            throw new Error(`插件 ${plugin.id} 已被注册`);
        }
        this.plugins.set(plugin.id, plugin);
    }

    resolvePresets(presets) {
        const allPresets = resolvePresetsOrPlugins(
            this.appPath,
            presets,
            PluginType.Preset
        );
        console.log("allPresets:", allPresets);
        while (allPresets.length) {
            this.initPreset(allPresets.shift());
        }
    }

    async init() {
        this.debugger("init");
        
        this.initConfig();
        this.initPaths();

        this.initPresetsAndPlugins();
        // await this.applyPlugins("onReady");
    }

    async run(args) {
        let name;
        let opts;
        if (typeof args === "string") {
            name = args;
        } else {
            name = args.name;
            opts = args.opts;
        }

        this.debugger("command:run");
        this.debugger(`command:run:name:${name}`);
        this.debugger("command:runOpts");
        this.debugger(`command:runOpts:${JSON.stringify(opts, null, 2)}`);
        this.setRunOpts(opts);

        await this.init();
    }
}
