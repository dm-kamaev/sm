'use strict';

const logger = require('../components/logger/logger').getLogger('app');
const ApiError = require('nodules/controller/ControllerError');

module.exports = function(error, request, response, next) {
    let result;
    if (error instanceof ApiError) {
        response.status(error.status);
        result = [{
            code: error.code,
            message: error.message
        }];
        logger.critical(JSON.stringify(result, null, 2));
        response.send(result);
    } else if (/^Sequelize/.test(error.name)) {
        logger.critical(JSON.stringify(error, null, 2));
        response.status(422);
        result = [{
            code: 'ValidationError',
            validationErrors: error.errors || [error.message]
        }];
        response.send(result);
    } else {
        logger.critical(error);
        if (/(\/error)$/.test(request.path)) {
            response.status(500);
            result = [{
                code: 'InternalServerError',
                message: error.message
            }];
            response.send(result);
        } else {
            response.redirect('/error');
        }
    }
};
