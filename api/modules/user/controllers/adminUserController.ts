interface LegacyController {
    new(): LegacyController
};

const Controller: LegacyController = require('nodules/controller').Controller;

import AdminUserAlreadyExistError from './errors/AdminUserAlreadyExists';
import AdminUserNotFoundError from './errors/AdminUserNotFound';
import WrongAccessAttributesError from './errors/WrongAccessAttributes';

import adminUserService from '../services/adminUser';

class AdminUserController extends Controller{
    public errors: Object;

    constructor() {
        super();

        this.errors = {
            AdminUserAlreadyExistsException: AdminUserAlreadyExistError,
            AdminUserNotFoundException: AdminUserNotFoundError,
            WrongAccessAttributesException: WrongAccessAttributesError
        };
    }

    /**
     * @apiDefine AdminUserNotFoundError
     * @apiError (404) AdminUserNotFound Admin user not found
     * @apiErrorExample {json} Error-Responce:
     *      HTTP/1.1 404 Not Found
     *      {
     *           "code": "AdminUserNotFound",
     *           "message": "Admin user with given id not found"
     *      }
     */

    /**
     * @apiDefine AdminUserAlreadyExistsError
     * @apiError (403) AdminUserAlreadyExists Admin user already exists
     * @apiErrorExample {json} Error-Responce:
     *      HTTP/1.1 409 Conflict
     *      {
     *           "code": "AdminUserAlreadyExists",
     *           "message": "Admin user with given id already exits"
     *      }
     */

    /**
     * @apiDefine WrongAttributesError
     * @apiError (404) WrongAttributes Entity in access attributes not exists
     * @apiErrorExample {json} Error-Responce:
     *      HTTP/1.1 400 BAd Request
     *      {
     *           "code": "WrongAttributes",
     *           "message": "One of access attributes not found"
     *      }
     */

    /**
     * @api {get} /adminuser Get all admin users
     * @apiVersion 0.1.0
     * @apiName getAdminUsers
     * @apiGroup AdminUser
     *
     * @apiSuccess {Object[]} adminUsers                             Array of finded administrative users
     * @apiSuccess {Number}   adminUsers.userId                      Id of user in administrative console db
     * @apiSuccess {Object}   adminUsers.accessAttributes            Access attributes of user
     * @apiSuccess {Number}   adminUsers.accessAttributes.schoolId   Id of school which user can edit
     * @apiSuccess {Number}   adminUsers.accessAttributes.brandId    Id of course brand which user can edit
     * @apiSuccess {Boolean}  adminUser.accessAttributes.isSuperUser Is user is super user
     *
     * @apiSuccessExample {json} Success-Responce:
     *     HTTP/1.1 200 OK
     *     [{
     *         "userId": 10,
     *         "accessAttributes": {
     *             "schoolId": 25,
     *             "brandId": 17,
     *             "isSuperUser": false
     *         }
     *     }]
     *
     */
    async actionList(actionContext) {
        return await adminUserService.getAll();
    }

    /**
     * @api {get} /adminuser/:id Get admin user
     * @apiVersion 0.1.0
     * @apiName getAdminUser
     * @apiGroup AdminUser
     *
     * @apiSuccess {Object}  adminUser                              Array of finded administrative users
     * @apiSuccess {Number}  adminUser.userId                       Id of user in administrative console db
     * @apiSuccess {Object}  adminUser.accessAttributes             Access attributes of user
     * @apiSuccess {Number}  adminUser.accessAttributes.schoolId    Id of school which user can edit
     * @apiSuccess {Number}  adminUser.accessAttributes.brandId     Id of course brand which user can edit
     * @apiSuccess {Boolean} adminUser.accessAttributes.isSuperUser Is user is super user
     *
     * @apiSuccessExample {json} Success-Responce:
     *     HTTP/1.1 200 OK
     *     {
     *         "userId": 10,
     *         "accessAttributes": {
     *             "schoolId": 25,
     *             "brandId": 17,
     *             "isSuperUser": false
     *         }
     *     }
     *
     * @apiUse AdminUserNotFoundError
     */
    async actionGet(actionContext, adminUserId) {
        return await adminUserService.getByUserId(adminUserId);
    }

    /**
     * @api {post} /adminuser Create admin user
     * @apiVersion 0.1.0
     * @apiName createAdminUser
     * @apiGroup AdminUser
     *
     * @apiParam {Number}  userId                       User id from administration console database
     * @apiParam {Object}  accessAttributes             Access attributes of user
     * @apiParam {Number}  accessAttributes.schoolId    Id of school which user can edit
     * @apiParam {Number}  accessAttributes.brandId     Id of course brand which user can edit
     * @apiParam {Boolean} accessAttributes.isSuperUser Is user is super user
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *         "userId": 1,
     *         "accessAttributes": {
     *             "schoolId": 25,
     *             "brandId": 17,
     *             "isSuperUser": false
     *         }
     *     }
     *
     * @apiSuccess {Object}  adminUser                              Array of finded administrative users
     * @apiSuccess {Number}  adminUser.userId                       Id of user in administrative console db
     * @apiSuccess {Object}  adminUser.accessAttributes             Access attributes of user
     * @apiSuccess {Number}  adminUser.accessAttributes.schoolId    Id of school which user can edit
     * @apiSuccess {Number}  adminUser.accessAttributes.brandId     Id of course brand which user can edit
     * @apiSuccess {Boolean} adminUser.accessAttributes.isSuperUser Is user is super user
     *
     * @apiUse AdminUserAlreadyExistsError
     * @apiUse WrongAttributesError
     */
    async actionCreate(actionContext) {
        let userData = actionContext.data;
        let adminUser = await adminUserService.create(userData);

        return adminUser.toJSON();
    }

    /**
     * @api {put} /adminuser/:id Update admin user
     * @apiVersion 0.1.0
     * @apiName updateAdminUser
     * @apiGroup AdminUser
     *
     * @apiParam {Number}  userId                       User id from administration console database
     * @apiParam {Object}  accessAttributes             Access attributes of user
     * @apiParam {Number}  accessAttributes.schoolId    Id of school which user can edit
     * @apiParam {Number}  accessAttributes.brandId     Id of course brand which user can edit
     * @apiParam {Boolean} accessAttributes.isSuperUser Is user is super user
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *         "userId": 1,
     *         "accessAttributes": {
     *             "schoolId": 25,
     *             "brandId": 17,
     *             "isSuperUser": false
     *         }
     *     }
     *
     * @apiSuccessExample {json} Success-Responce:
     *     HTTP/1.1 204 OK
     *
     * @apiUse AdminUserAlreadyExistsError
     * @apiUse WrongAttributesError
     */
    async actionUpdate(actionContext, adminUserId) {
        let userData = actionContext.data;
        await adminUserService.update(adminUserId, userData);
    }

    /**
     * @api {delete} /adminuser/:id Delete admin user
     * @apiVersion 0.1.0
     * @apiName deleteAdminUser
     * @apiGroup AdminUser
     *
     * @apiSuccessExample {json} Success-Responce:
     *     HTTP/1.1 204 OK
     *
     * @apiUse AdminUserNotFoundError
     */
    async actionDelete(actionContext, adminUserId) {
        await adminUserService.deleteUser(adminUserId);
    }
}

export {AdminUserController};
