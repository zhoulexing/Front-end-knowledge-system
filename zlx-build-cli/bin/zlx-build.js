#! /usr/bin/env node 

// 解析用户输入的命令
const program = require("commander");
const package = require("../package.json");

// 定义命令
// program
//     .command("list")
//     .description("list all the frame")
//     .alias("l")
//     .action(() => {
//         require("../command/list")();
//     });

program
    .version(package.version)
    .option("-l --list", "list all the frame")
    .option("-t, --type [type]", "select frame type")
    .parse(process.argv);

if(program.list) {
    require("../command/list")();
}

if(program.type) {
    if(program.type === true) {
        program.help();
    } else {
        require(`../command/${ program.type }`)();
    }
}
