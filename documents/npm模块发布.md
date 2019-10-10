# npm publish

## step
1. 在github上创建项目
2. 编写基础模块代码
3. 注册npm账号 (如果没有的话)
4. 配置package.json (name: 名称, version: 版本, main: 入口文件, repository: 仓库)
5. 发布
    - npm login
    - 依次输入用户名、密码和邮箱
    - 登录成功后会出现以下信息
        Logged in as ${username} on https://registry.npmjs.org/
    - 执行发布命令
        npm publish 
    - 发布成功会出现以下信息
        + zlx-watermark@1.0.0