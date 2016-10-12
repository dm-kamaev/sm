'use strict';

const config = require('../config/admin.json');

module.exports = function(req, res, next) {
    let passedToken = req.get(config.headerName);
    if (passedToken === config.token) {
        next();
    } else {
        res.status(403).end();
    }
};
