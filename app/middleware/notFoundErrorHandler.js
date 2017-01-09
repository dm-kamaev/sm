'use strict';

const entityTypeEnum = require('../../api/modules/entity/enums/entityType');

const errorController =
    require('../modules/error/controllers/errorController');

module.exports = function(req, res, next) {
    let subdomain = req.hostname.split('.')[0],
        entityType = subdomain.replace(/s$/, '');

    if (entityType == entityTypeEnum.SCHOOL) {
        errorController.schoolNotFound(req, res);
    } else {
        errorController.generalError(req, res, next, entityType, subdomain);
    }
};
