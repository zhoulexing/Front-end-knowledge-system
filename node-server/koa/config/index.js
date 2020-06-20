module.exports = {
    port: process.env.PORT || 3001,
    // 模板引擎
    viewEngine: "ejs",
    // jwt 加密串
    jwtSecret: "jwt zzpt",
    baseUrl: "http://192.168.10.142:8080/comparison/rest/",
    mongodb: {
        url: "mongodb://192.168.10.142/test",
        options: {
            useNewUrlParser: true,
            db: {
                safe: true
            }
        }
    }
};