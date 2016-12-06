'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const services = require('../../../../app/components/services').all;
const categoryView = require('../views/courseCategoryView');

const logger = require('../../../../app/components/logger/logger')
    .getLogger('app');

const entityType = require('../../entity/enums/entityType');

let controller = {};

/**
 * @api {get} /coursecategory Get all categories
 * @apiVersion 1.0.0
 * @apiGroup CourseCategory
 * @apiName getAllCategories
 * @apiSuccess {CourseCategory[]} courseCategories
 * @apiSuccessExample {json} Response-example
 *     HTTP/1.1 200 OK
 *     [{
 *         "id": 1,
 *         "name": "course's name"
 *         "isActive": true,
 *         "priceType": "total_cost",
 *         "courseCount": 14,
 *         "filters": ["age", "costPerHour"],
 *         "updatedAt": "2016-10-19T15:56:35.234Z"
 *     }]
 */
controller.list = async(function(req, res) {
    let result;
    try {
        result = await(services.courseCategory.getAll());
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {get} /coursecategory/:id Get category
 * @apiVersion 1.0.0
 * @apiGroup CourseCategory
 * @apiName getCategory
 * @apiSuccess {CourseCategory} coursecategory
 * @apiSuccessExample {json} Response-example
 *     HTTP/1.1 200 OK
 *     {
 *         "id": 1,
 *         "name": "Профориентация",
 *         "filters": ["age", "costPerHour"],
 *         "isActive": true,
 *         "priceType": "total_cost",
 *         "tabTitle": "Курсы профориентации в Москве: стоимость обучения.",
 *         "metaDescription": "Удобный фильтр для поиска курсов профориентации",
 *         "openGraphTitle": "Выбор профессии и вуза",
 *         "openGraphDescription": "Все полезные курсы профориентации",
 *         "listTitle": "Курсы профориентации",
 *         "searchDescription": "Курсы профориентации",
 *         "seoText1": "Курсы профориентации",
 *         "seoText2": "Курсы профориентации"
 *         "created_at": "2016-10-19T15:56:35.234Z",
 *         "updated_at": "2016-10-19T15:56:35.234Z"
 *     }
 */
controller.get = async(function(req, res) {
    let result;
    try {
        let categoryId = req.params.id;
        let courseCategory = await(services.courseCategory.getById(categoryId)),
            seoCourseList = await(services.seoCourseList.getByCategoryId(
                categoryId
            )),
            page = await(services.page.getOne(
                categoryId, entityType.COURSE_CATEGORY
            ));
        result = categoryView.render({
            category: courseCategory,
            page: page,
            seoData: seoCourseList
        });
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {post} /coursecategory Create course category
 * @apiVersion 1.0.0
 * @apiGroup CourseCategory
 * @apiName createCategory
 * @apiSuccess {CourseCategory} courseCategory
 * @apiParamExample {json} Response-example
 *     {
 *         "id": 1,
 *         "name": "Профориентация",
 *         "filters": ["age", "costPerHour"],
 *         "isActive": true,
 *         "priceType": "total_cost",
 *         "tabTitle": "Курсы профориентации в Москве: стоимость обучения.",
 *         "metaDescription": "Удобный фильтр для поиска курсов профориентации",
 *         "openGraphTitle": "Выбор профессии и вуза",
 *         "openGraphDescription": "Все полезные курсы профориентации.",
 *         "listTitle": "Курсы профориентации",
 *         "searchDescription": "Курсы профориентации",
 *         "seoText1": "Курсы профориентации",
 *         "seoText2": "Курсы профориентации"
 *         "created_at": "2016-10-19T15:56:35.234Z",
 *         "updated_at": "2016-10-19T15:56:35.234Z"
 *     }
 */
controller.create = async(function(req, res) {
    let result;
    try {
        let data = req.body,
            courseCategory = await(services.courseCategory.create(data)),
            seoCourseList = await(services.seoCourseList.create(
                courseCategory.id, data
            ));

        result = courseCategory.toJSON();
        result.seoCourseList = seoCourseList.toJSON();
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {put} /coursecategory/:id Update category
 * @apiVersion 1.0.0
 * @apiGroup CourseCategory
 * @apiName updateCategory
 * @apiSuccess {number[]} updatedRowsCount
 * @apiParamExample {json} Response-example
 *     {
 *         "id": 1,
 *         "name": "Профориентация",
 *         "filters": ["age", "costPerHour"],
 *         "isActive": true,
 *         "priceType": "total_cost"
 *         "tabTitle": "Курсы профориентации в Москве: стоимость обучения.",
 *         "metaDescription": "Удобный фильтр для поиска курсов профориентации",
 *         "openGraphTitle": "Выбор профессии и вуза",
 *         "openGraphDescription": "Все полезные курсы профориентации",
 *         "listTitle": "Курсы профориентации",
 *         "searchDescription": "Курсы профориентации",
 *         "seoText1": "Курсы профориентации",
 *         "seoText2": "Курсы профориентации"
 *         "created_at": "2016-10-19T15:56:35.234Z",
 *         "updated_at": "2016-10-19T15:56:35.234Z"
 *     }
 */
controller.update = async(function(req, res) {
    let result;
    try {
        let data = req.body,
            categoryId = req.params.id;

        result = await(services.courseCategory.update(
            categoryId, data
        ));
        await(services.seoCourseList.createUpdate(categoryId, data));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {delete} /coursecategory/:id Delete category
 * @apiVersion 1.0.0
 * @apiGroup CourseCategory
 * @apiName deleteCategory
 */
controller.delete = async(function(req, res) {
    let result;
    try {
        result = await(services.courseCategory.delete(req.params.id));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

module.exports = controller;
