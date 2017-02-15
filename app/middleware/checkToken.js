'use strict';

const config = require('../config/admin.json');

const tokenHeaderName = config.headers.token.name;
const tokenValue = config.headers.token.value;

module.exports = function(req, res, next) {
    let passedToken = req.get(tokenHeaderName);
    if (passedToken === tokenValue) {
        next();
    } else {
        res.status(403).end();
    }
};
