'use strict';

// author: dm-kamaev
// CRUD via admin for search catalog on main page

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const services = require('../../../../app/components/services').all;
const SearchCatalogNotFound = require('./errors/SearchCatalogNotFound.js');
const enumTypes = require('../enums/searchCatalog.js');

const logger = require('../../../../app/components/logger/logger')
    .getLogger('app');

let controller = {};

/**
 * @api {get} /api/course/search-catalog Get all links
 * @apiVersion 0.1.0
 * @apiName CourseGetAllSearchCatalogLink
 * @apiGroup Course
 *
 * @apiSuccess {Object[]} links from search catalog for main page.
 * [
 *    {
 *       "id": 1,
 *       "name": "Профориентация для дошкольников",
 *       "url": "http://yandex.ru",
 *       "type": "juniorSchool",
 *       "created_at": "2016-11-25T09:20:47.996Z",
 *       "updated_at": "2016-11-25T09:20:47.996Z"
 *    },
 * ]
 */
controller.list = async(function(req, res) {
    let result = {};
    result = await(services.courseSearchCatalog.getAll());
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(result));
});


/**
 * @api {get} /api/course/search-catalog/:id Get link by id
 * @apiVersion 1.0.0
 * @apiGroup Course
 * @apiName CourseGetSearchCatalogLink
 * @apiSuccess {Object{}} link from search catalog for main page by id.
 * {
 *    "id": 1,
 *    "name": "Профориентация для дошкольников",
 *    "url": "http://yandex.ru",
 *    "type": "juniorSchool",
 *    "created_at": "2016-11-25T09:20:47.996Z",
 *    "updated_at": "2016-11-25T09:20:47.996Z"
 * }
 * @apiError (404) SearchCatalogNotFound  not found link by id.
*/
controller.get = async(function(req, res) {
    let result, linkId = req.params.id;

    let handlerErr_ = function(err) {
        logger.error(err);
        if (err instanceof SearchCatalogNotFound) {
            res.status(err.status);
            return err.response;
        }
        return err;
    };

    try {
        result = await(services.courseSearchCatalog.getById(linkId));
        if (!result) { throw new SearchCatalogNotFound(linkId); }
    } catch (err) {
        result = handlerErr_(err);
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {post} /api/course/search-catalog/ Create link in catalog
 * @apiVersion 1.0.0
 * @apiGroup Course
 * @apiName createCourseSearchCatalogLink
 * @apiSuccess {Object{}} empty or error.
 * @apiParamExample {json} Request-example
 * {
 *    "name": "Профориентация для дошкольников",
 *    "url": "http://yandex.ru",
 *    "type": "middleSchool"
 * }
 * @apiError (422) SequelizeValidationError  type for link not valid.
 */
controller.create = async(function(req, res) {
    let result = {}, data = req.body;

    let handlerErr_ = function(err) {
        logger.error(err);
        if (err.name === 'SequelizeValidationError') {
            res.status(422);
            return '"type" must be: ' + enumTypes.toArray().join(',');
        }
        return err;
    };

    try {
        await(services.courseSearchCatalog.create(data));
    } catch (err) {
        result = handlerErr_(err);
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {put} /api/course/search-catalog/:id Update link from catalog search
 * @apiVersion 1.0.0
 * @apiGroup Course
 * @apiName updateCourseSearchCatalogLink
 * @apiSuccess {Object{}} empty or error
 * @apiParamExample {json} Request-example
 * {
 *    "name": "Профориентация для дошкольников",
 *    "url": "http://yandex.ru",
 *    "type": "middleSchool"
 * }
 * @apiError (404) SearchCatalogNotFound not found libk by id
 * @apiError (422) SequelizeValidationError  type for link not valid.
 */
controller.update = async(function(req, res) {
    let result = {}, linkId = req.params.id, data = req.body;

    let handlerErr_ = function(err) {
        logger.error(err);
        if (err.name === 'SequelizeValidationError') {
            res.status(422);
            return '"type" must be: ' + enumTypes.toArray().join(',');
        } else if (err instanceof SearchCatalogNotFound) {
            res.status(err.status);
            return err.response;
        } else {
            return err;
        }
    };

    try {
        var link = await(services.courseSearchCatalog.getById(linkId));
        if (!link) { throw new SearchCatalogNotFound(linkId); }
        await(services.courseSearchCatalog.update(linkId, data));
    } catch (err) {
        result = handlerErr_(err);
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {delete} /api/course/search-catalog/:id Delete link from
 * catalog search by id
 * @apiVersion 1.0.0
 * @apiGroup Course
 * @apiName deleteCourseSearchCatalogLink
 * @apiSuccess {Object{}} empty
 */
controller.delete = async(function(req, res) {
    let result = {}, linkId = req.params.id;
    await(services.courseSearchCatalog.delete(linkId));
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(result));
});

module.exports = controller;
