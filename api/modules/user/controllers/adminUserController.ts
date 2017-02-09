import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {
    AdminUserAlreadyExists as AdminUserAlreadyExistError
} from './errors/AdminUserAlreadyExists';
import {
    AdminUserAlreadyExists as AdminUserNotFoundError
} from './errors/AdminUserNotFound';
import {
    WrongAttributes as WrongAccessAttributesError
} from './errors/WrongAccessAttributes';

import {service as adminUserService} from '../services/adminUser';
import {adminUserView} from '../views/adminUserView';

class AdminUserController extends Controller {
    constructor() {
        super();

        /**
         * Possible errors
         */
        this.errors = {
            AdminUserAlreadyExistsException: AdminUserAlreadyExistError,
            AdminUserNotFoundException: AdminUserNotFoundError,
            WrongAccessAttributesException: WrongAccessAttributesError
        };
    }

    /**
     * @apiDefine AdminUserNotFoundError
     * @apiError (404) AdminUserNotFound Admin user not found
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 404 Not Found
     *      {
     *           "code": "AdminUserNotFound",
     *           "message": "Admin user with given id not found"
     *      }
     */

    /**
     * @apiDefine AdminUserAlreadyExistsError
     * @apiError (403) AdminUserAlreadyExists Admin user already exists
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 409 Conflict
     *      {
     *           "code": "AdminUserAlreadyExists",
     *           "message": "Admin user with given id already exits"
     *      }
     */

    /**
     * @apiDefine WrongAttributesError
     * @apiError (404) WrongAttributes Entity in access attributes not exists
     * @apiErrorExample {json} Error-Response:
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
     * @apiSuccess {Object[]} adminUsers
     *     Array of found administrative users
     * @apiSuccess {Number}   adminUsers.userId
     *     Id of user in administrative console db
     * @apiSuccess {Object}   adminUsers.accessAttributes
     *     Access attributes of user
     * @apiSuccess {Number}   adminUsers.accessAttributes.schoolId
     *     Id of school which user can edit
     * @apiSuccess {Number}   adminUsers.accessAttributes.brandId
     *     Id of course brand which user can edit
     * @apiSuccess {Boolean}  adminUser.accessAttributes.isSuperUser
     *     Is user is super user
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     [{
     *         "userId": 10,
     *         "accessAttributes": {
     *             "schoolName": "Школа №1034",
     *             "brandName": "Alibra",
     *             "isSuperUser": false
     *         }
     *     }]
     *
     */
    public async actionList(actionContext) {
        const adminUsers = await adminUserService.getAll(),
            accessAttributesInstances =
                await adminUserService.getInstancesByAttributes(adminUsers);

        return adminUserView.renderList({
            adminUsers: adminUsers,
            schools: accessAttributesInstances.schools,
            brands: accessAttributesInstances.brands
        });
    }

    /**
     * @api {get} /adminuser/:id Get admin user
     * @apiVersion 0.1.0
     * @apiName getAdminUser
     * @apiGroup AdminUser
     *
     * @apiSuccess {Object}  adminUser
     *     Array of finded administrative users
     * @apiSuccess {Number}  adminUser.userId
     *     Id of user in administrative console db
     * @apiSuccess {Object}  adminUser.accessAttributes
     *     Access attributes of user
     * @apiSuccess {String}  adminUser.accessAttributes.schoolName
     *     Name of school which user can edit
     * @apiSuccess {String}  adminUser.accessAttributes.brandName
     *     Name of course brand which user can edit
     * @apiSuccess {Boolean} adminUser.accessAttributes.isSuperUser
     *     Is user is super user
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "userId": 10,
     *         "accessAttributes": {
     *             "schoolName": "Школа №1034",
     *             "brandName": "Alibra",
     *             "isSuperUser": false
     *         }
     *     }
     *
     * @apiUse AdminUserNotFoundError
     */
    public async actionGet(actionContext, adminUserId) {
        const adminUser = await adminUserService.getByUserId(adminUserId),
            accessAttributesInstances =
                await adminUserService.getInstancesByAttributes(adminUser);
        return adminUserView.render({
            adminUser: adminUser,
            brand: accessAttributesInstances.brand,
            school: accessAttributesInstances.school
        });
    }

    /**
     * @api {post} /adminuser Create admin user
     * @apiVersion 0.1.0
     * @apiName createAdminUser
     * @apiGroup AdminUser
     *
     * @apiParam {Number}  userId
     *     User id from administration console database
     * @apiParam {Object}  accessAttributes
     *     Access attributes of user
     * @apiParam {String}  accessAttributes.schoolName
     *     Name of school which user can edit
     * @apiParam {String}  accessAttributes.brandName
     *     Name of course brand which user can edit
     * @apiParam {Boolean} accessAttributes.isSuperUser
     *     Is user is super user
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *         "userId": 1,
     *         "accessAttributes": {
     *             "schoolName": "Школа №1034",
     *             "brandName": "Alibra",
     *             "isSuperUser": false
     *         }
     *     }
     *
     * @apiSuccess {Object}  adminUser
     *     Array of found administrative users
     * @apiSuccess {Number}  adminUser.userId
     *     Id of user in administrative console db
     * @apiSuccess {Object}  adminUser.accessAttributes
     *     Access attributes of user
     * @apiSuccess {String}  adminUser.accessAttributes.schoolName
     *     Name of school which user can edit
     * @apiSuccess {String}  adminUser.accessAttributes.brandName
     *     Name of course brand which user can edit
     * @apiSuccess {Boolean} adminUser.accessAttributes.isSuperUser
     *     Is user is super user
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "userId": 10,
     *         "accessAttributes": {
     *             "schoolName": "Школа №1034",
     *             "brandName": "Alibra",
     *             "isSuperUser": false
     *         }
     *     }
     *
     * @apiUse AdminUserAlreadyExistsError
     * @apiUse WrongAttributesError
     */
    public async actionCreate(actionContext) {
        const userData = actionContext.data;
        const adminUser = await adminUserService.create(userData);

        return adminUser.toJSON();
    }

    /**
     * @api {put} /adminuser/:id Update admin user
     * @apiVersion 0.1.0
     * @apiName updateAdminUser
     * @apiGroup AdminUser
     *
     * @apiParam {Number}  userId
     *     User id from administration console database
     * @apiParam {Object}  accessAttributes
     *     Access attributes of user
     * @apiParam {String}  accessAttributes.schoolName
     *     Name of school which user can edit
     * @apiParam {String}  accessAttributes.brandName
     *     Name of course brand which user can edit
     * @apiParam {Boolean} accessAttributes.isSuperUser
     *     Is user is super user
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *         "userId": 1,
     *         "accessAttributes": {
     *             "schoolName": 25,
     *             "brandName": 17,
     *             "isSuperUser": false
     *         }
     *     }
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 204 OK
     *
     * @apiUse AdminUserAlreadyExistsError
     * @apiUse WrongAttributesError
     */
    public async actionUpdate(actionContext, adminUserId) {
        const userData = actionContext.data;
        await adminUserService.update(adminUserId, userData);
    }

    /**
     * @api {delete} /adminuser/:id Delete admin user
     * @apiVersion 0.1.0
     * @apiName deleteAdminUser
     * @apiGroup AdminUser
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 204 OK
     *
     * @apiUse AdminUserNotFoundError
     */
    public async actionDelete(actionContext, adminUserId) {
        await adminUserService.deleteUser(adminUserId);
    }
}

export {AdminUserController};
