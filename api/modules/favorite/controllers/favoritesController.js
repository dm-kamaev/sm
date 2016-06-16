'use strict';

const schoolView = require('../../school/views/schoolView');
const entityType = require('../../entity/enums/entityType');

const async = require('asyncawait/async');
const await = require('asyncawait/await');
const services = require('../../../../app/components/services').all;


/**
 * @api {post} api/favorite Get comment view
 * @apiName Delete
 * @apiGroup Favorite
 * @apiVersion 0.0.1
 *
 * @apiParam {number} itemId
 * @apiParamExample {json} Request-Example:
 * {
 *     "itemId": 200
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "id": 21,
 *         "name": {
 *             "light": "Гимназия",
 *             "bold": "№ 1543"
 *         },
 *         "alias": "gimnazija-1543",
 *         "score": {
 *             "visibleMark": {
 *                 "value": 4.66428884986831
 *             },
 *             "hiddenMarks": []
 *         }
 *         "metroStations": [
 *              {"id":60,"name":"Юго-Западная"}
 *         ],
 *         "area": {
 *             "id":3,
 *             "name":"Тропарёво-Никулино"
 *         }
 *     }
 * @apiError (Error 404) NotFoundError favorite item not found
 */
exports.create = async(function(req, res) {
    var user = req.user,
        itemId = req.body.itemId;
    var favoriteSchool = await(services.school.getByIdsWithGeoData([itemId]))[0];
    
    if (favoriteSchool) {
        var page = await(services.page.getOne(
                favoriteSchool.id,
                entityType.SCHOOL
            )),
            result = schoolView.listCompactItem({
                item: favoriteSchool,
                itemUrl: page
            });

        await(services.favorite.create(user.id, itemId));
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.status(200);
        res.end(JSON.stringify(result));
    } else {
        res.status(404);
        res.end();
    }
});


/**
 * @api {delete} api/favorite Delete favorite entry with given id
 * @apiName Delete
 * @apiGroup Favorite
 * @apiVersion 0.0.1
 *
 * @apiParam {number} itemId
 * @apiParamExample {json} Request-Example:
 * {
 *     "itemId": 200
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 *
 * @apiError (Error 404) NotFoundError favorite entry not found
 */
exports.delete = async(function(req, res) {
    var user = req.user,
        itemId = req.body.itemId;

    try {
        services.favorite.deleteByUserIdAndItemId(user.id, itemId);
    } catch (error) {
        if (error) {
            res.status(404);
        } else {
            res.header('Content-Type', 'application/json; charset=utf-8');
            res.status(204);
        }
    }
    res.end();
});
