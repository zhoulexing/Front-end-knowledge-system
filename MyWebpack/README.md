#搭建自己的webpack
## webpack的打包流程
1. 运行命令的时候，首先找到全局环境下的webpack.cmd  
    如：C:\Users\js\AppData\Roaming\npm\webpack.cmd
2. 在安装node的情况下，cmd文件会执行webpack/bin/webpack.js,这个文件进行的操作如下：
 * 通过yargs获得shell中的参数，具体yargs信息见"utils/yargs.js"
 * 把webpack.config.js中的参数和shell参数整合到options对象上
 * 调用lib/webpack.js进行打包
 
    
  