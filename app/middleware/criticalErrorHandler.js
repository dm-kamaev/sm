'use strict';

const logger = require('../components/logger/logger').getLogger('app');
const ApiError = require('nodules/controller/ControllerError');

module.exports = function(err, req, res, next) {
    if (!(err instanceof ApiError)) {
        logger.critical(err);
        if (/(\/error)$/.test(req.path)) {
            res.status(500).end('Internal Server Error');
        } else {
            res.redirect('/error');
        }
    } else {
        logger.debug(err);
        res.status(err.status);
        res.send(err.message);
        res.end();
    }
};
