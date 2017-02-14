'use strict';

// author: dm-kamaev
// profile for school

const util = require('util');

import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {profileAdminService} from '../services/profileAdminService';
import {view as profileAdminView} from '../views/profileAdminView';
const logger =
    require('../../../../app/components/logger/logger').getLogger('app');
import {SchoolProfileNameIsShorter} from './errors/SchoolProfileNameIsShorter';

class ProfileAdminController extends Controller {
    constructor() {
        super();
        this.errors = {
            SchoolProfileNameIsShorter,
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
    public async actionList(ctx: any, schoolId: string) {
        const res = await profileAdminService.getList(parseInt(schoolId, 10));
        return profileAdminView.listProfile(
            res.specializedClasses,
            res.hashClassType,
        );

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
    public async actionGet(ctx: any, schoolId: string, profileNumber: string) {
        const res = await profileAdminService.getById(
            parseInt(schoolId, 10),
            parseInt(profileNumber, 10)
        );

        return profileAdminView.oneProfile(
            parseInt(profileNumber, 10),
            res.specializedClass,
            res.hashClassType
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
    * @apiSuccess {Number[][]} specializedClasses  array of array number.
    * @apiSuccess {Number[]}   specializedClass    array of number.
    * @apiSuccess {Number}     .-.0                class number
    * @apiSuccess {Number}     .-.1                profile Id
    *
    * @apiSuccessExample {json} Example response:
    *    [
    *        [ 10, 1 ],
    *        [ 11, 2 ]
    *    ]
    *
    */
    public async actionCreate(ctx: any, schoolId: string) {
        const profileData: { classNumber: number, profileId: number }
            = ctx.request.body;
        return await profileAdminService.create(
            parseInt(schoolId, 10),
            profileData
        );
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
    * @apiSuccess {Number[][]} specializedClasses  array of array number.
    * @apiSuccess {Number[]}   specializedClass    array of number.
    * @apiSuccess {Number}     .-.0                class number
    * @apiSuccess {Number}     .-.1                profile Id
    *
    * @apiSuccessExample {json} Example response:
    *    [
    *        [ 10, 1 ],
    *        [ 11, 2 ]
    *    ]
    *
    */
    public async actionUpdate(
        ctx: any,
        schoolId: string,
        profileNumber: string
    ) {
        const profileData: { classNumber: number, profileId: number }
            = ctx.request.body;
        return await profileAdminService.update(
            parseInt(schoolId, 10),
            parseInt(profileNumber, 10),
            profileData
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
    *
    */
    public async actionDelete(
        ctx: any,
        schoolId: string,
        profileNumber: string
    ) {
        return await profileAdminService.delete(
            parseInt(schoolId, 10),
            parseInt(profileNumber, 10),
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
