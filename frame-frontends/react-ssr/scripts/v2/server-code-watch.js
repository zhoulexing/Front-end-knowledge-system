const webpack = require("webpack");
const config = require("../../config/v2/server");

const compiler = webpack(config);
compiler.watch(
    {
        aggregateTimeout: 300, // 类似节流功能,聚合多个更改一起构建
        ignored: /node_modules/, //排除文件
        poll: 2000, //轮训的方式检查变更 单位：秒  ,如果监听没生效，可以试试这个选项.
        "info-verbosity": "verbose", //在增量构建的开始和结束时，向控制台发送消息
    },
    (err, stats) => {
        let json = stats.toJson("minimal");

        if (json.errors) {
            json.errors.forEach((item) => {
                console.log(item);
            });
        }
        if (json.warnings) {
            json.warnings.forEach((item) => {
                console.log(item);
            });
        }

        //编译完成后 通知主进程来重启node 服务
        console.log("SVRCODECOMPLETED");
    }
);

compiler.hooks.done.tap("done", function (data) {
    console.log("\n svr code done"); //编译完成的时候  可以监听每次的监听
});

//收到退出信号 退出自身进程
process.stdin.on("data", function (data) {
    if (data.toString() === "exit") {
        process.exit();
    }
});
