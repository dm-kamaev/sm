'use strict';

// author: dm-kamaev
// admin for school

const util = require('util');

import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

// import schoolCommentService from '../services/schoolComment';
// import commentView from '../views/commentView';
import profileAdminService from '../services/profileAdminService';
// import SchoolNotExistTypeError from './errors/SchoolNotExistTypeError';
const logger =
    require('../../../../app/components/logger/logger').getLogger('app');

class ProfileAdminController extends Controller {
    constructor() {
        super();
        this.errors = {
            // SchoolNotExistTypeError,
        };
    }


    /**
     * @api {get} /api/admin/school/:schoolId/profile Get all school profile
     * @apiVersion 1.0.0
     * @apiName getAllProfileClass
     * @apiGroup School Profile Admin
     *
     * @apiParam {Number} schoolId School's id.
     *
     * @apiSuccess {Object[]} profiles   Array of object.
     * @apiSuccess {String}   profiles.id      Id.
     * @apiSuccess {String}   profiles.class   class's name.
     * @apiSuccess {String}   profiles.profile profile school.
     *
     * @apiSuccessExample {json} Example response:
     *    [{
     *        "id": 1,
     *        "class": 10,
     *        "profile": "Химико-биологический"
     *    }, {
     *        "id": 2,
     *        "class": 10,
     *        "profile": "Биолого-географический"
     *    }, {
     *        "id": 3,
     *        "class": 10,
     *        "profile": "Социально-гуманитарный"
     *    }, {
     *        "id": 4,
     *        "class": 10,
     *        "profile": "Филологический"
     *    }]
     */
    public async actionList(ctx: any, schoolId: string) {
        return await profileAdminService.getList(parseInt(schoolId, 10));
    }


     /**
     * @api {get} /api/admin/school/:schoolId/profile/:profileId
     * Get school profile
     * @apiVersion 1.0.0
     * @apiName getProfileCurrentClass
     * @apiGroup School Profile Admin
     *
     * @apiParam {Number} schoolId  School's id.
     * @apiParam {Number} profileId Profile's id.
     *
     * @apiSuccess {Object}   profile         object.
     * @apiSuccess {String}   profile.id      Id.
     * @apiSuccess {String}   profile.class   class's name.
     * @apiSuccess {String}   profile.profile profile school.
     *
     * @apiSuccessExample {json} Example response:
     *    {
     *        "id": 1,
     *        "class": 10,
     *        "profile": "Химико-биологический"
     *    }
     */
    public async actionGet(ctx: any, schoolId: string, profileId: string) {
        return await profileAdminService.getById(
            parseInt(schoolId, 10),
            parseInt(profileId, 10)
        );
    }


     /**
     * @api {get} /api/admin/schoolclasses
     * Get school profile
     * @apiVersion 1.0.0
     * @apiName getSchoolClasses
     * @apiGroup School Profile Admin
     *
     *
     * @apiSuccess {Object}   profile         object.
     * @apiSuccess {String}   profile.id      Id.
     * @apiSuccess {String}   profile.class   class's name.
     * @apiSuccess {String}   profile.profile profile school.
     *
     * @apiSuccessExample {json} Example response:
     *    [
     *        1,
     *        2,
     *        3,
     *        4,
     *        5,
     *        6,
     *        7,
     *        8,
     *        9,
     *        10,
     *        11
     *    ]
     */
    public async actionListClasses() {
        return profileAdminService.getListClasses();
    }

}

export {ProfileAdminController};
