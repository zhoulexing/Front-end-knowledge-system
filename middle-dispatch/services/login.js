const utils = require('../utils/index');

module.exports.doLogin = (req, res) => {
    const ip = utils.getClientIp(req);
    return res.render('login', { title: '中转页' });
}