module.exports = [
    {
        src: ["./client/**/*"],
        remotePath: "/opt/zlx/",
        server: {
            ignoreErrors: true,
            sshConfig: {
                host: "192.168.10.82",
                username: "root",
                password: "hzjs@123"
            }
        }
    }
];