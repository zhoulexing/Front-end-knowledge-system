const { parseQueryString } = require("utils/index");

module.exports = {
    doLogin: {
        url: /\/api\/doLogin.*/,
        method: "get",
        data: options => {
            return {
                success: true,
                username: "admin"
            }
        } 
    },
}
