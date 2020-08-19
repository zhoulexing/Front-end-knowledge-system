const fs = require("fs");
const parser = require("@babel/parser"); // 解析成ast
const traverse = require("@babel/traverse").default; // 遍历ast
const { transformFromAst } = require("@babel/core"); // ES6转换ES5


/**
 * 1. 读取参数
 * 2. 实例化Compiler
 * 3. entryOption阶段，读取入口文件
 * 4. Loader 编译对应文件，解析成 AST
 * 5. 找到对应依赖，递归编译处理，生成 chunk
 * 6. 输出到 dist
 */
class Webpack {
    constructor(options) {
        const { entry, output } = options;
        this.entry = entry;
        this.output = output;
        this.modulesArr = [];
    }

    run() {
        const info = this.build(this.entry);
        this.modulesArr.push(info);
        for (let i = 0; i < this.modulesArr.length; i++) {
            // 判断有依赖对象,递归解析所有依赖项
            const item = this.modulesArr[i];
            const { dependencies } = item;
            if (dependencies) {
                for (let j in dependencies) {
                    this.modulesArr.push(this.build(dependencies[j]));
                }
            }
        }

        const obj = {};
        this.modulesArr.forEach((item) => {
            obj[item.entryFile] = {
                dependencies: item.dependencies,
                code: item.code,
            };
        });
        this.emitFile(obj);
    }

    build(entryFile) {
        const conts = fs.readFileSync(entryFile, "utf-8");
        const ast = parser.parse(conts, {
            sourceType: "module",
        });
        const dependencies = {};
        traverse(ast, {
            //  类型为 ImportDeclaration 的 AST 节点，
            // 其实就是我们的 import xxx from xxxx
            ImportDeclaration({ node }) {
                const newPath =
                    "./" +
                    path.join(path.dirname(entryFile), node.source.value);
                dependencies[node.source.value] = newPath;
                // console.log(dependencies)
            },
        });
        const { code } = transformFromAst(ast, null, {
            presets: ["@babel/preset-env"],
        });
        return {
            entryFile,
            dependencies,
            code,
        };
    }

    emitFile(code) {
        const filePath = path.join(this.output.path, this.output.filename);
        const newCode = JSON.stringify(code);
        const bundle = `(function(modules){
           // moduleId 为传入的 filename ，即模块的唯一标识符
            function require(moduleId){
                function localRequire(relativePath){
                   return require(modules[moduleId].dependencies[relativePath]) 
                }
                var exports = {};
                (function(require,exports,code){
                    eval(code)
                })(localRequire,exports,modules[moduleId].code)
                return exports;
            }
            require('${this.entry}')
        })(${newCode})`;

        fs.writeFileSync(filePath, bundle, "utf-8");
    }
}
