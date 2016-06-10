'use strict';


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
 *
 * @apiError (Error 404) NotFoundError favorite item not found
 */
exports.create = async(function(req, res) {
    var user = req.user,
        itemId = req.body.itemId;

    //TODO make an documentation of responce when this answer will be processed
    //TODO by frontend
    var favoriteSchool = await(services.school.getByIdsWithGeoData([itemId]));
    if (favoriteSchool) {
        await(services.favorite.create(user.id, itemId));
        res.status(200);
        res.end(JSON.stringify(favoriteSchool));
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
        if(error) {
            res.status(404);
        } else {
            res.status(200);
        }
    }
    res.end();
});
