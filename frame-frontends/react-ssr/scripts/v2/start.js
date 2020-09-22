const { spawn } = require("child_process");
const chalk = require("chalk");

console.log(chalk.red("server starting ..."));

// 前端代码构建
const frontCodeProcess = spawn("npm", ["run", "start:v2-front"], {
    stdio: "inherit",
    shell: process.platform === "win32",
});

// 后端代码监控和编译进程
const endCodeProcess = spawn("npm", ["run", "start:v2-end"], {
    shell: process.platform === "win32",
});

let nodeServerProcess = null;
const startNodeServer = () => {
    nodeServerProcess && nodeServerProcess.kill();
    nodeServerProcess = spawn("node", ["./dist/v2/server/app.js"], {
        shell: process.platform === "win32",
    });
    nodeServerProcess.stdout.on("data", print);
};

const print = (data) => {
    console.log(chalk.red(data));
    let str = data.toString();
    if (str.indexOf("SVRCODECOMPLETED") > -1) {
        //服务端代码编译完成
        startNodeServer(); //重启 node 服务
    } else {
        console.log(str);
    }
};

endCodeProcess.stdout.on("data", print);

const killChild = () => {
    endCodeProcess && endCodeProcess.kill();
    nodeServerProcess && nodeServerProcess.kill();
    frontCodeProcess && frontCodeProcess.kill();
};

//主进程关闭退出子进程
process.on("close", (code) => {
    console.log("main process  close", code);
    killChild();
});

//主进程关闭退出子进程
process.on("exit", (code) => {
    console.log("main process  exit", code);
    killChild();
});

//非正常退出情况
process.on("SIGINT", function () {
    endCodeProcess.stdin.write("exit", (error) => {
        console.log("svr code watcher process exit!");
    });
    killChild();
});
