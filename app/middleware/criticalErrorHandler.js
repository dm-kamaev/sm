'use strict';

const logger = require('../components/logger/logger').getLogger('app');

module.exports = function(err, req, res, next) {
    let isInternalError = ((err.code / 100).toFixed() == 5) || !err.code;

    if (isInternalError) {
        logger.critical(err);
    }
    next();
};
