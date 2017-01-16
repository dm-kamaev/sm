'use strict';

const logger = require('../components/logger/logger').getLogger('app');
const ApiError = require('nodules/controller/ControllerError');

module.exports = function(err, req, res, next) {
    let result;
    logger.critical(err);
    if (err instanceof ApiError) {
        res.status(err.status);
        result = [{
            code: err.code,
            message: err.message
        }];
        res.send(result);
        res.end();
    } else if (/^Sequelize/.test(err.name)) {
        logger.critical(JSON.stringify(err, null, 2));
        res.status(422);
        result = [{
            code: 'ValidationError',
            validationErrors: err.errors
        }];
        res.send(result);
        res.end();
    } else {
        if (/(\/error)$/.test(req.path)) {
            res.status(500);
            result = [{
                code: 'InternalServerError',
                message: err.message
            }];
            res.send(result);
            res.end();
        } else {
            res.redirect('/error');
        }
    }
};





