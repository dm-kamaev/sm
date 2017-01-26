'use strict';

// author: dm-kamaev
// profile for school

const util = require('util');

import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

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
     * @api {get} /api/admin/school/:schoolId/profile/:profileNumber
     * Get school profile
     * @apiVersion 1.0.0
     * @apiName getProfileCurrentClass
     * @apiGroup School Profile Admin
     *
     * @apiParam {Number} schoolId  School's id.
     * @apiParam {Number} profileNumber Profile's id.
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
    public async actionGet(ctx: any, schoolId: string, profileNumber: string) {
        return await profileAdminService.getById(
            parseInt(schoolId, 10),
            parseInt(profileNumber, 10)
        );
    }

    /**
    * @api {post} /api/admin/school/:schoolId/profile
    * Create school profile
    * @apiVersion 1.0.0
    * @apiName createSchoolProfileClass
    * @apiGroup School Profile Admin
    *
    * @apiParam {Number} schoolId  School's id.
    * @apiParam {Number} profileNumber Profile's id.
    *
    * @apiSuccess {Object}   school object.
    * @apiSuccess {Number[][]} school.specializedClasses  array of array number.
    * @apiSuccess {Number[]}   school.specializedClass    array of number.
    * @apiSuccess {Number} .-.0   class number
    * @apiSuccess {Number} .-.1   profile Id
    *
    * @apiSuccessExample {json} Example response:
    *    {
    *        "specializedClasses": [ [10, 1], [11, 2] ],
    *    }
    */
    public async actionCreate(ctx: any, schoolId: string) {
        const profileData: { classNumber: number, profileId: number }
            = ctx.request.body;
        return await profileAdminService.create(
            parseInt(schoolId, 10),
            profileData
        );
    }


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
    * @api {get} /api/admin/schoolprofiles
    * Get all profiles for all school
    * @apiVersion 1.0.0
    * @apiName getAllSchoolProfiles
    * @apiGroup School Profile Admin
    *
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
    public async actionListProfiles() {
        return await profileAdminService.getListProfiles();
    }

}

export {ProfileAdminController};
