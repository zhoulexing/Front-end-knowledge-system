const config = require("../config");
const inquirer = require("inquirer");
const download = require("download-git-repo");
// 改变输出文字的颜色
const chalk = require("chalk");
// ora小图标
const ora = require("ora");
const fs = require("fs");

module.exports = () => {
    inquirer.prompt(config.react.options).then(answers => {  
        cloneProject(answers);
    });
}

// 根据参数克隆项目
function cloneProject({ name, version, redux, css }) {
    const spinner = ora("正在从github下载zlx-build").start();
    download("github:zhoulexing/zlx-build", name, err => {
        if(!err) {
            // 将输出的文字转化为蓝色
            console.info(chalk.blueBright("下载成功"));
            updatePackageName(name);
        } else {
            console.error(err);
        }
        spinner.stop();
    });
}

// // 修改项目名
function updatePackageName(name) {
    fs.readFile(`${ process.cwd() }/${ name }/package.json`, (err, data) => {
        if(err) throw err;
        let _data = JSON.parse(data.toString());
        _data.name = name;
        let str = JSON.stringify(_data, null, 4);
        fs.writeFile(`${ process.cwd() }/${ name }/package.json`, str, err => {
            if(err) throw err;
        });
    });
}