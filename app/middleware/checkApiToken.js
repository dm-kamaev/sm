"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Middleware, that check if given api token is valid
 */
const config = require('../../app/config/config.json');
const tokenHeaderName = config.backendApiHeaders.token.name;
const tokenValue = config.backendApiHeaders.token.value;
const middleware = function (req, res, next) {
    const passedToken = req.get(tokenHeaderName);
    if (passedToken === tokenValue) {
        next();
    }
    else {
        res.status(403).end();
    }
};
exports.middleware = middleware;
