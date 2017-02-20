'use strict';

// author: dm-kamaev
// profile for school

const util = require('util');

import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {profileAdminService} from '../services/profileAdminService';
import {
    service as schoolSpecializedClassService
} from '../services/schoolSpecializedClass';

import {view as profileAdminView} from '../views/profileAdminView';
const logger =
    require('../../../../app/components/logger/logger').getLogger('app');
import {SchoolProfileNameIsShorter} from './errors/SchoolProfileNameIsShorter';
import {ProfileNotFound} from './errors/ProfileNotFound';
import {SchoolSpecializedClassInstance} from '../models/schoolSpecializedClass';

class ProfileAdminController extends Controller {
    constructor() {
        super();
        this.errors = {
            SchoolProfileNameIsShorter,
            ProfileNotFoundException: ProfileNotFound
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
     * @apiSuccess {Object[]} profiles              Array of object.
     * @apiSuccess {String}   profiles.id           Id.
     * @apiSuccess {String}   profiles.classNumber  Class's number.
     * @apiSuccess {Object}   profile.profile       Profile school class
     * @apiSuccess {Number}   -.id                  Specialized's Id.
     * @apiSuccess {String}   -.name                Specialized's name.
     *
     * @apiSuccessExample {json} Example response:
     *    [{
     *        "id": 1,
     *        "classNumber": 10,
     *        "profile": {
     *            "id": 2,
     *            "name": "Химико-биологический"
     *        }
     *    }, {
     *        "id": 2,
     *        "classNumber": 10,
     *        "profile": {
     *            "id": 3,
     *            "name": "Биолого-географический"
     *        }
     *    }, {
     *        "id": 3,
     *        "classNumber": 10,
     *        "profile": {
     *            "id": 4,
     *            "name": "Социально-гуманитарный"
     *        }
     *    }, {
     *        "id": 4,
     *        "classNumber": 10,
     *        "profile": {
     *            "id": 5,
     *            "name": "Филологический"
     *        }
     *    }]
     */
    public async actionList(actionContext: any, schoolId: string) {
        const profiles: Array<SchoolSpecializedClassInstance> =
            await profileAdminService.getList(
                parseInt(schoolId, 10)
            );
        return profiles.map(profileAdminView.render);
    }


    /**
     * @api {get} /api/admin/school/:schoolId/profile/:id
     * Get school profile
     * @apiVersion 1.0.0
     * @apiName getProfileCurrentClass
     * @apiGroup School Profile Admin
     *
     * @apiParam {Number} schoolId  School's id.
     * @apiParam {Number} id        Profile's id.
     *
     * @apiSuccess {Object}   profile               Profile
     * @apiSuccess {String}   profile.id            Id
     * @apiSuccess {String}   profile.classNumber   Class Number
     * @apiSuccess {Object}   profile.profile       Profile school class
     * @apiSuccess {Number}   -.id                  Specialized's Id.
     * @apiSuccess {String}   -.name                Specialized's name.
     *
     * @apiSuccessExample {json} Example response:
     *    {
     *        "id": 1,
     *        "classNumber": 10,
     *        "profile": {
     *            "id": 2,
     *            "name": "Химико-биологический"
     *        }
     *    }
     */
    public async actionGet(
            actionContext: any, schoolId: string, profileNumber: string) {
        const profile: SchoolSpecializedClassInstance =
            await profileAdminService.getById(
                parseInt(schoolId, 10),
                parseInt(profileNumber, 10)
            );
        return profileAdminView.render(
            profile
        );
    }

    /**
     * @api {post} /api/admin/school/:schoolId/profile
     * Create school profile class
     * @apiVersion 1.0.0
     * @apiName createSchoolProfileClass
     * @apiGroup School Profile Admin
     *
     * @apiParamExample {json} Request-Example:
     *   {
     *       "classNumber": 5,
     *       "profileId":  10
     *   }
     *
     * @apiParam {Number} schoolId  School's id.
     *
     * @apiSuccess {Number} id                     Created profile's id.
     * @apiSuccess {Number} schoolId               School's id.
     * @apiSuccess {Number} specializedClassTypeId Id of profile's type.
     * @apiSuccess {Number} class                  Grade.
     * @apiSuccess {String} updated_at             Updated at.
     * @apiSuccess {String} created_at             Created at.
     * @apiSuccess {String} updatedAt              Updated at.
     * @apiSuccess {String} createdAt              Created at.
     *
     * @apiSuccessExample {json} Example response:
     *     {
     *         "id": 562,
     *         "schoolId": 246,
     *         "specializedClassTypeId": 35,
     *         "class": 6,
     *         "updated_at": "2017-02-20T12:03:44.451Z",
     *         "created_at": "2017-02-20T12:03:44.451Z",
     *         "createdAt": "2017-02-20T12:03:44.451Z",
     *         "updatedAt": "2017-02-20T12:03:44.451Z"
     *     }
     *
     */
    public async actionCreate(actionContext: any, schoolId: string) {
        const profileData: {classNumber: number, profileId: number}
            = actionContext.request.body;
        return schoolSpecializedClassService.create({
            schoolId: parseInt(schoolId, 10),
            specializedClassTypeId: profileData.profileId,
            class: profileData.classNumber
        });
    }


    /**
    * @api {put} /api/admin/school/:schoolId/profile/:id
    * Update school profile class
    * @apiVersion 1.0.0
    * @apiName updateSchoolProfileClass
    * @apiGroup School Profile Admin
    *
    * @apiParamExample {json} Request-Example:
    *   {
    *       "classNumber": 5,
    *       "profileId":  10
    *   }
    *
    * @apiParam {Number} schoolId  School's id.
    * @apiParam {Number} id        Profile' id
    *
    * @apiSuccess {Number} - Response body, number of deleted rows.
    *
    * @apiSuccessExample {json} Example response:
    *     1
    */
    public async actionUpdate(
            actionContext: any, schoolId: string, id: string) {
        const profileData: {classNumber: number, profileId: number}
            = actionContext.request.body;
        return schoolSpecializedClassService.update(
            parseInt(id, 10), {
                class: profileData.classNumber,
                specializedClassTypeId: profileData.profileId
            }
        );
    }

    /**
    * @api {delete} /api/admin/school/:schoolId/profile/:id
    * Delete school profile class
    * @apiVersion 1.0.0
    * @apiName deleteSchoolProfileClass
    * @apiGroup School Profile Admin
    *
    * @apiParam {Number} schoolId  School's id.
    * @apiParam {Number} id        Profile's id.
    *
    * @apiSuccess {Number} result delete
    *
    * @apiSuccessExample {json} Example response:
    *     1
    */
    public async actionDelete(
            actionContext: any, schoolId: string, id: string) {
        return await schoolSpecializedClassService.delete(
            parseInt(id, 10)
        );
    }


     /**
     * @api {get} /api/admin/schoolclasses
     * Get classes for all school
     * @apiVersion 1.0.0
     * @apiName getSchoolClasses
     * @apiGroup School Profile Admin
     *
     * @apiSuccess {Number[]}   number of classes
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


    /**
    * @api {get} /api/admin/schoolprofiles?searchString=соц
    * Search profiles for school
    * @apiVersion 1.0.0
    * @apiName searchSchoolProfiles
    * @apiGroup School Profile Admin
    *
    * @apiParam {String} searchString        search profile name
    *
    * @apiSuccess {Object[]} profile         array of object.
    * @apiSuccess {Number}   profile.id      Id.
    * @apiSuccess {String}   profile.name    Name
    *
    * @apiSuccessExample {json} Example response:
    *    [{
    *        "id": 1,
    *        "name": "Социально-гуманитарный"
    *    }, {
    *        "id": 2,
    *        "name": "Социально-экономический"
    *    }, {
    *        "id": 3,
    *        "name": "Универсальный"
    *    }]
    */
    public async actionListProfiles(ctx: any) {
        const query: { searchString: string } = ctx.request.query;
        const profileName: string  = query.searchString || '';
        return await profileAdminService.searchProfiles(profileName);
    }

}

export {ProfileAdminController};
