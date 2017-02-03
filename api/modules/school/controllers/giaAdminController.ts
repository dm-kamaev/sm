'use strict';

// author: dm-kamaev
// gia for school

const util = require('util');

import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {giaAdminService} from '../services/giaAdminService';
import {profileAdminService} from '../services/profileAdminService';
const logger =
    require('../../../../app/components/logger/logger').getLogger('app');
import {SchoolProfileNameIsShorter} from './errors/SchoolProfileNameIsShorter';

class GiaAdminController extends Controller {
    constructor() {
        super();
        this.errors = {
            SchoolProfileNameIsShorter,
        };
    }


    /**
     * @api {get} /api/admin/school/:schoolId/gia Get all school gia
     * @apiVersion 1.0.0
     * @apiName getAllGia
     * @apiGroup School Gia Admin
     *
     * @apiParam {Number} schoolId School's id.
     *
     * @apiSuccess {Object[]} gias               Array of object.
     * @apiSuccess {Number}   gias.id            Id.
     * @apiSuccess {String}   gias.subject       School's ubject
     * @apiSuccess {Number}   gias.year          gia year
     * @apiSuccess {Number}   gias.averageResult averageResult by subject
     * @apiSuccess {Number}   gias.passedNumber  count passed
     *
     * @apiSuccessExample {json} Example response:
     *    [{
     *        "id": 5543,
     *        "subject": "Математика",
     *        "year": 2015,
     *        "averageResult": 4.9,
     *        "passedNumber": 143
     *    }, {
     *        "id": 5545,
     *        "subject": "Информатика",
     *        "year": 2015,
     *        "averageResult": 4.6,
     *        "passedNumber": 7
     *    }, {
     *        "id": 5546,
     *        "subject": "Литература",
     *        "year": 2015,
     *        "averageResult": 5,
     *        "passedNumber": 1
     *    }]
     */
    public async actionList(ctx: any, schoolId: string) {
        return await giaAdminService.getList(parseInt(schoolId, 10));
    }


     /**
     * @api {get} /api/admin/school/:schoolId/profile/:giaId
     * Get school profile
     * @apiVersion 1.0.0
     * @apiName getGia
     * @apiGroup School Gia Admin
     *
     * @apiParam {Number} schoolId  School's id.
     * @apiParam {Number} giaId Gia's id.
     *
     * @apiSuccess {Number}   gia.id            Id.
     * @apiSuccess {String}   gia.subject       School's ubject
     * @apiSuccess {Number}   gia.year          gia year
     * @apiSuccess {Number}   gia.averageResult averageResult by subject
     * @apiSuccess {Number}   gia.passedNumber  count passed
     *
     * @apiSuccessExample {json} Example response:
     *    {
     *        "id": 5543,
     *        "subject": "Математика",
     *        "year": 2015,
     *        "averageResult": 4.9,
     *        "passedNumber": 143
     *    }
     */
    public async actionGet(ctx: any, schoolId: string, giaResultId: string) {
        return await giaAdminService.getById(
            parseInt(schoolId, 10),
            parseInt(giaResultId, 10)
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
    * @api {put} /api/admin/school/:schoolId/profile/:profileNumber
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
    * @apiParam {Number} profileNumber  profile class number.
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
    * @api {delete} /api/admin/school/:schoolId/profile/:profileNumber
    * Delete school profile class
    * @apiVersion 1.0.0
    * @apiName deleteSchoolProfileClass
    * @apiGroup School Profile Admin
    *
    * @apiParam {Number} schoolId  School's id.
    * @apiParam {Number} profileNumber  profile class number.
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
    * @api {get} /api/admin/schoolprofiles/?searchString=соц
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
        const profileName: string  = query.searchString;
        return await profileAdminService.searchProfiles(profileName);
    }

}

export {GiaAdminController};
