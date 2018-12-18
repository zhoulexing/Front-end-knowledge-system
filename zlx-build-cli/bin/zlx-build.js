#! /usr/bin/env node 

// 解析用户输入的命令
const program = require("commander");
const package = require("../package.json");
const config = require("../config");


program.version(package.version);

// 定义使用方法
program
    .command("list")
    .description("list all the templates")
    .alias("-l")
    .action(() => {
        require("../command/list")();
    });

program
    .command("init")
    .option("-t, --type [type]", "select frame type")
    .action(obj => {
        switch(obj.type) {
            case config.react.type:
                require("../command/react")();
                break;
            default:
                require("../command/list")();
                break;
        }
    });

program.parse(process.argv);

if(!program.args.length) {
    program.help();
}
