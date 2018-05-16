const express = require('express');
const router = express.Router();
const service = require('../services/login.js');

router.get('/', service.doLogin);

module.exports = (app) => {
    app.use('/login', router);
};