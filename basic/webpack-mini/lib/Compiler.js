const path = require("path");
const fs = require("fs");
const babylon = require("babylon");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;
const ejs = require("ejs");
const {SyncHook} = require("tapable");

class Compiler {
    constructor(config) {
        this.config = config;
        this.entryId;
        this.modules = {};
        this.entry = config.entry;
        this.root = process.cwd();

        this.hooks = {
            entryOption: new SyncHook(),
            compile: new SyncHook(),
            afterCompile: new SyncHook(),
            afterPlugins: new SyncHook(),
            run: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook()
        };

        const plugins = this.config.plugins;
        if (Array.isArray(plugins)) {
            plugins.forEach((plugin) => {
                plugin.apply(this);
            });
        }

        this.hooks.afterPlugins.call();
    }

    run() {
        this.hooks.compile.call();
        this.buildModule(path.resolve(this.root, this.entry), true);
        this.hooks.afterCompile.call();
        this.emitFile();
        this.hooks.emit.call();
        this.hooks.done.call();
    }

    buildModule(modulePath, isEntry) {
        const source = this.getSource(modulePath);
        const moduleName = "./" + path.relative(this.root, modulePath);

        if (isEntry) {
            this.entryId = moduleName;
        }

        const { sourceCode, dependencies } = this.parse(
            source,
            path.dirname(moduleName)
        );
        this.modules[moduleName] = sourceCode;
        dependencies.forEach((dep) => {
            this.buildModule(path.join(this.root, dep), false);
        });
    }

    getSource(modulePath) {
        let content = fs.readFileSync(modulePath, "utf8");
        console.log("content--->", content);
        const rules = this.config.module.rules;
        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            const { test, use } = rule;
            let len = use.length - 1;
            if (test.test(modulePath)) {
                function startLoader() {
                    const loader = require(use[len--]);
                    content = loader(content);
                    if (len >= 0) {
                        startLoader();
                    }
                }
                startLoader();
            }
        }
        return content;
    }

    parse(source, parentPath) {
        const dependencies = [];
        const ast = babylon.parse(source, { sourceType: "module" });

        console.log("ast:", ast);

        traverse(ast, {
            CallExpression(p) {
                const node = p.node;
                if (node.callee.name == "require") {
                    node.callee.name = "__webpack_require__";
                    let moduleName = node.arguments[0].value;
                    if (moduleName) {
                        const extname = path.extname(moduleName) ? "" : ".js";
                        moduleName = moduleName + extname;
                        moduleName = "./" + path.join(parentPath, moduleName);
                        dependencies.push(moduleName);
                        node.arguments = [types.stringLiteral(moduleName)];
                    }
                }
            },
        });
        const sourceCode = generator(ast).code; 
        return { sourceCode, dependencies };
    }

    emitFile() {
        const outputFile = path.join(this.config.output.path, this.config.output.filename);
        const templateStr = this.getSource(path.join(__dirname, "template.ejs"));
        const code = ejs.render(templateStr, { entryId: this.entryId, modules: this.modules });
        this.assets = {};
        this.assets[outputFile] = code;
        fs.writeFileSync(outputFile, this.assets[outputFile]);
    }
}

module.exports = Compiler;
