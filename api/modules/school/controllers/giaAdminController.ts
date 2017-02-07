'use strict';

// author: dm-kamaev
// gia for school

const util = require('util');

import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {giaAdminService} from '../services/giaAdminService';
const logger =
    require('../../../../app/components/logger/logger').getLogger('app');
import {ExamDataAlreadyExistBySubject} from
    './errors/ExamDataAlreadyExistBySubject';

class GiaAdminController extends Controller {
    constructor() {
        super();
        this.errors = {
            ExamDataAlreadyExistBySubject,
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
     * @api {get} /api/admin/school/:schoolId/gia/:giaId
     * Get school gia
     * @apiVersion 1.0.0
     * @apiName getGia
     * @apiGroup School Gia Admin
     *
     * @apiParam {Number} schoolId  School's id.
     * @apiParam {Number} giaId Gia's id.
     *
     * @apiSuccess {Number}   gia.id            Gia's id
     * @apiSuccess {String}   gia.subject       School's ubject
     * @apiSuccess {Number}   gia.year          Gia's year
     * @apiSuccess {Number}   gia.averageResult AverageResult by subject
     * @apiSuccess {Number}   gia.passedCount   Count passed exam
     *
     * @apiSuccessExample {json} Example response:
     *    {
     *        "id": 5543,
     *        "subject": "Математика",
     *        "year": 2015,
     *        "averageResult": 4.9,
     *        "passedCount": 143
     *    }
     */
    public async actionGet(ctx: any, schoolId: string, giaResultId: string) {
        return await giaAdminService.getById(
            parseInt(schoolId, 10),
            parseInt(giaResultId, 10)
        );
    }

    /**
    * @api {post} /api/admin/school/:schoolId/gia
    * Create gia result for school
    * @apiVersion 1.0.0
    * @apiName createGiaResult
    * @apiGroup School Gia Admin
    *
    * @apiParamExample {json} Request-Example:
    *    {
    *        "subjectId": 8,
    *        "year":  2016,
    *        "averageResult": 3.5,
    *        "passedCount": 143
    *    }
    *
    * @apiParam {Number} schoolId  School's id.
    *
    * @apiSuccess {Number}   gia.id            Id.
    * @apiSuccess {Number}   gia.schoolId      School's id
    * @apiSuccess {Number}   gia.subjectId     Subject's id
    * @apiSuccess {Number}   gia.year          Gia year
    * @apiSuccess {Number}   gia.result        averageResult by subject
    * @apiSuccess {Number}   gia.count         count passed exam
    *
    * @apiSuccessExample {json} Example response:
    *    {
    *        "id": 5723,
    *        "schoolId": 697,
    *        "subjectId": 9,
    *        "year": 2014,
    *        "result": 3.5,
    *        "count": 143,
    *        "updated_at": "2017-02-06T09:52:40.086Z",
    *        "created_at": "2017-02-06T09:52:40.086Z"
    *    }
    * @apiError (422) ExamDataAlreadyExistBySubject
    *     already gia data by subject
    */
    public async actionCreate(ctx: any, schoolId: string) {
        const giaResult: {
          subjectId: number,
          year: number,
          averageResult: number,
          passedCount: number
        } = ctx.request.body;
        return await giaAdminService.create(
            parseInt(schoolId, 10),
            giaResult
        );
    }


    /**
    * @api {put} /api/admin/school/:schoolId/:giaId
    * Update school gia data
    * @apiVersion 1.0.0
    * @apiName updateGiaResult
    * @apiGroup School Gia Admin
    *
    * @apiParamExample {json} Request-Example:
    *    {
    *        "subjectId": 8,
    *        "year":  2016,
    *        "averageResult": 3.5,
    *        "passedCount": 143
    *    }
    *
    * @apiParam {Number} schoolId  School's id.
    * @apiParam {Number} giaId     Gia's id
    *
    * @apiSuccess {Number}   gia.id            Id.
    * @apiSuccess {Number}   gia.schoolId      School's id
    * @apiSuccess {Number}   gia.subjectId     Subject's id
    * @apiSuccess {Number}   gia.year          Gia year
    * @apiSuccess {Number}   gia.averageResult averageResult by subject
    * @apiSuccess {Number}   gia.passedCount   count passed exam

    *
    * @apiSuccessExample {json} Example response:
    *    {
    *        "id": 5722,
    *        "schoolId": 37,
    *        "subjectId": 10,
    *        "year": 2014,
    *        "averageResult": 3.5,
    *        "passedCount": 143
    *    }
    * @apiError (422) ExamDataAlreadyExistBySubject
    *     already gia data by subject
    */
    public async actionUpdate(
        ctx: any,
        schoolId: string,
        giaId: string
    ) {
        const giaResult: {
          subjectId: number,
          year: number,
          averageResult: number,
          passedCount: number
        } = ctx.request.body;
        return await giaAdminService.update(
            parseInt(schoolId, 10),
            parseInt(giaId, 10),
            giaResult
        );
    }

    /**
    * @api {delete} /api/admin/school/:schoolId/:giaId
    * Delete gia data for school
    * @apiVersion 1.0.0
    * @apiName deleteGiaData
    * @apiGroup School Gia Admin
    *
    * @apiParam {Number} schoolId  School's id.
    * @apiParam {Number} giaId     Gia's id
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
        giaId: string
    ) {
        return await giaAdminService.delete(
            parseInt(schoolId, 10),
            parseInt(giaId, 10),
        );
    }
}

export {GiaAdminController};
