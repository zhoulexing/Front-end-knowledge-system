## 调试web程序

```
node --inspect app.js
```
1. chrome浏览器输入 chrome://inspect 或者 about:inspect;
2. 点击target下面的inspect;


## 调试非服务脚本

```
node --inspect-brk=9229 app.js
```
1. chrome浏览器输入 chrome://inspect 或者 about:inspect;

## 运行中程序调试

某些情况下需要对正在运行的程序进行调试，比如Express Web服务。

```
ps ax | grep app.js 或者
px | grep node 

//eg
30464 pts/11 ...

kill -SIGUSR1 30464 
// window 平台
node -e 'process._debugProcess(30464)'
```



