'use strict';

const errorController =
    require('../modules/error/controllers/errorController');

module.exports = function(req, res, next) {
    let subdomain = req.hostname.split('.')[0],
        entityType = subdomain.replace(/s$/, '');

    errorController.generalError(req, res, next, entityType);
};
