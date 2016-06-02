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
 *     {Object}
 *
 * @apiError (Error 404) NotFoundError user not found
 */
exports.create = async(function(req, res) {
    var user = req.user,
        itemId = req.params.itemId;


    var favorite = await(services.favorite.create(user.id, itemId)),
        favoriteSchool = await(services.school.getByIdWithLocation(itemId));
    res.status(200);
    res.end(JSON.stringify(favoriteSchool));
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
        itemId = req.params.itemId;

    try {
        services.favorite.deleteByUserIdAnditemId(user.id, itemId);
    } catch (error) {
        if(error) {
            res.status(404);
        } else {
            res.status(200);
        }
        res.end();
    }
});
