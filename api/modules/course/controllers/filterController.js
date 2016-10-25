'use strict';

const services = require('../../../../app/components/services').all;


const logger = require('../../../../app/components/logger/logger')
    .getLogger('app');


let controller = {};


/**
 * @api {get} /coursefilter Get all filters
 * @apiVersion 1.0.0
 * @apiGroup CourseFilter
 * @apiName getAllFilters
 * @apiSuccess {String[]} coursefilters
 * @apiSuccessExample {json} Response-example
 *     HTTP/1.1 200 OK
 *     ['age', 'type', 'weekDays', 'cost', 'online']
 */

controller.list = function(req, res) {
    let result;
    try {
        result = services.courseFilter.getAll();
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
};


module.exports = controller;
