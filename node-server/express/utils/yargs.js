/*
* 通过argv属性就可以读取命令行中的key, value, 例如：
* node yargs --ships=10, --distance=100
* ships:10, distance:100
* */
// const argv = require("yargs").argv;
// console.log("ships:",argv.ships, "distance:", argv.distance);

/*
* 统计变量出现的次数
* node yargs --verbose --verbose
* verbose: 2
* */
// var argv = require("yargs").count("verbose").alias("v", "verbose").argv;
// console.log("verbose:", argv.verbose);

/*
* 通过usage方法(usage参数为字符串）,node yargs --w=10 --h=9
* argv: { _: [],
* help: false,
* version: false,
* w: 10,
* h: 9,
* '$0': 'yargs.js' }
* */
// var argv = require("yargs")
//     .usage("Usage: $0 -w [num] -h [num]")
//     .argv;
// console.log("argv:", argv);

/*
* 必选参数
* */
// var argv = require("yargs")
//     .usage("Usage: $0 -w [num] -h [num]")
//     .demand(['w','h'])
//     .argv;

/*
* 提供参数默认值
* 10, 10
* */
// var argv = require("yargs")
//     .default("x", 10)
//     .default("y", 10)
//     .argv;
// console.log(argv.x, argv.y);





