module.exports = {
    "/api/*": {
        target: "http://ip:port",
        socket: "socket",
        // 接受https
        secure: true
    }
}