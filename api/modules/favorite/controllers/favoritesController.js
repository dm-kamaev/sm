'use strict';

const schoolView = require('../../school/views/schoolView');
const favoriteView = require('../views/favoriteView');

const entityType = require('../../entity/enums/entityType');

const async = require('asyncawait/async');
const await = require('asyncawait/await');
const services = require('../../../../app/components/services').all;

var logger =
    require('../../../../app/components/logger/logger').getLogger('app');


/**
 * @api {post} api/favorite Get comment view
 * @apiName Create
 * @apiGroup Favorite
 * @apiVersion 0.0.1
 *
 * @apiParam {{
 *     id: number,
 *     type: string
 * }} entity
 * @apiParamExample {json} Request-Example:
 * {
 *     "entity": {
 *         "id": 200,
 *         "type": "school"
 *     }
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
 *         "score": 4.2,
 *         "metro": Array<{
 *             "id":60,
 *             "name":"Юго-Западная"
 *         }>,
 *         "area": Array<{
 *              "id":3,
 *              "name":"Тропарёво-Никулино"
 *         }>
 *     }
 * @apiError (Error 404) NotFoundError favorite entry not found
 * @apiError (Error 400) AlreadyExists favorite entry already exists
 */
exports.create = async(function(req, res) {
    var result;

    try {
        var user = req.user,
            entity = req.body.entity;

        var entityData = await(services.favorite.addToFavoriteAndGetEntity(
            user.id,
            entity
        ));

        if (entity.type == entityType.SCHOOL) {
        // TODO delete when in school will be new b-sm-favorite-link
            result = schoolView.listCompactItem({
                item: entityData.entity,
                itemUrl: entityData.url
            });
        } else {
            result = favoriteView.item(entityData);
        }

        res.status(200);
    } catch (error) {
        res.status(400);
        logger.error(error.message);
        result = error.message;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {delete} api/favorite Delete favorite entry with given id and type
 * @apiName Delete
 * @apiGroup Favorite
 * @apiVersion 0.0.1
 *
 * @apiParam {{
 *     id: number,
 *     type: string
 * }} entity
 * @apiParamExample {json} Request-Example:
 * {
 *     "entity": {
 *         "id": 200,
 *         "type": "school"
 *     }
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 *
 * @apiError (Error 404) NotFoundError favorite entry not found
 */
exports.delete = async(function(req, res) {
    try {
        var user = req.user,
            entity = req.body.entity;

        services.favorite.deleteByUserIdAndEntityData(user.id, entity);
        res.status(204);
    } catch (error) {
        res.status(404);
        logger.error(error.message);
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end();
    }
});
