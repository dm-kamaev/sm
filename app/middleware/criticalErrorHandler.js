'use strict';

const logger = require('../components/logger/logger').getLogger('app');

module.exports = function(err, req, res, next) {
    logger.critical(err);
    if (/(\/error)$/.test(req.path)) {
        res.status(500).end('Internal Server Error');
    } else {
        res.redirect('/error');
    }
};
