使用说明
=======

# 安装运行打包

## 安装环境
执行
```
cnpm i 
or
npm i
```

##  配置远程服务的地址
定位到 `app/config.js`文件
```
url : 'http://127.0.0.1:3100/index.html'  // 配置你的服务地址,比如云索的,众智的等
```

## 测试运行
运行命令
```
npm start
```
如果要调试的话,修改 `app/main.js`文件
```
  21行 //win.showDevTools();
```
将21行注释打开.

## 生成预 `exe` 文件

修改根目录下的`package.json`文件,换成你的`name`
```
"name": "你的name",
```

运行命令
```
npm run build
```
将在根目录下生成 `build`目录,暂时只生成了`win32` 位的exe及相关文件,
点击 `xx.exe`文件即可打开应用

## 生成安装文件
需借助 `innoSetup` 软件,安装它,安装包及编译脚本在共享盘 `Z:\software\开发\InnoSetup`位置

编译安装脚本模板已写好，需要改动的地方有两处：

1. 版本号
```
#define MyAppName "shark"     //exe名称,默认也是打开它的协议(唤醒协议)
#define MyAppVersion "1.0.0"  //你的此次程序的版本号
```

2. 打包的exe安装路径
修改打包的exe路径,定位到脚本的这行
```
#define ExePath "D:\git\shark\build\shark-win32-ia32"  //你的打包exe源路径
```
一般情况下,这个path就是指当前根目录下的 `$/build/win32平台` 的这个目录


# 对接使用说明

## 参数对接
从第三方平台跳转到本APP,其方式如下:

程序唤醒格式:
```
 shark://cid=120,username=admin 
```
说明:
`shark:` 指的打开安装在本地的exe程序协议,这个就是上面安装时编译脚本指定的.
`cid=120,username=admin`  传参参数,格式为 `key=value,key=value,....`,多个以`,`隔开

示例:
```html

    <a href="shark://cid=120,username=admin">  
        app唤醒
    </a>
```













