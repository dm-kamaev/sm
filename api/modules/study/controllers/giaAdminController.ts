'use strict';

// author: dm-kamaev
// gia for school

const util = require('util');

import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {giaAdminService} from '../services/giaAdminService';
import {view as giaAdminView} from '../views/giaAdminView';
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
     * @apiSuccess {Number}   gias.passedCount   count passed
     *
     * @apiSuccessExample {json} Example response:
     *    [{
     *        "id": 5543,
     *        "subject": "Математика",
     *        "year": 2015,
     *        "averageResult": 4.9,
     *        "passedCount": 143
     *    }, {
     *        "id": 5545,
     *        "subject": "Информатика",
     *        "year": 2015,
     *        "averageResult": 4.6,
     *        "passedCount": 7
     *    }, {
     *        "id": 5546,
     *        "subject": "Литература",
     *        "year": 2015,
     *        "averageResult": 5,
     *        "passedCount": 1
     *    }]
     */
    public async actionList(ctx: any, schoolId: string) {
        const res = await giaAdminService.getList(parseInt(schoolId, 10));
        return giaAdminView.listGia(res.gias, res.hashSubjectName);
    }


     /**
     * @api {get} /api/admin/school/:schoolId/gia/:id
     * Get school gia
     * @apiVersion 1.0.0
     * @apiName getGia
     * @apiGroup School Gia Admin
     *
     * @apiParam {Number} schoolId School's id.
     * @apiParam {Number} id       Gia's id.
     *
     * @apiSuccess {Number}   gia.id            Gia's id
     * @apiSuccess {String}   gia.subject       School's subject
     * @apiSuccess {Number}   gia.subjectId     School's subject id
     * @apiSuccess {Number}   gia.year          Gia's year
     * @apiSuccess {Number}   gia.averageResult AverageResult by subject
     * @apiSuccess {Number}   gia.passedCount   Count passed exam
     *
     * @apiSuccessExample {json} Example response:
     *    {
     *        "id": 5543,
     *        "subject": "Математика",
     *        "subjectId": 1,
     *        "year": 2015,
     *        "averageResult": 4.9,
     *        "passedCount": 143
     *    }
     */
    public async actionGet(ctx: any, schoolId: string, giaId: string) {
        const res = await giaAdminService.getById(
            parseInt(schoolId, 10),
            parseInt(giaId, 10)
        );
        return giaAdminView.oneGia(res.gia, res.hashSubjectName);
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
    * @apiSuccess {Number}   gia.averageResult AverageResult by subject
    * @apiSuccess {Number}   gia.passedCount   Count passed exam
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
    public async actionCreate(ctx: any, schoolId: string) {
        const giaResult: {
          subjectId: number,
          year: number,
          averageResult: number,
          passedCount: number
        } = ctx.request.body;
        const gia = await giaAdminService.create(
            parseInt(schoolId, 10),
            giaResult
        );
        return giaAdminView.create(gia);
    }


    /**
    * @api {put} /api/admin/school/:schoolId/:id
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
    * @apiParam {Number} schoolId School's id.
    * @apiParam {Number} id       Gia's id
    *
    * @apiSuccess {Number}   gia.id            Id.
    * @apiSuccess {Number}   gia.schoolId      School's id
    * @apiSuccess {Number}   gia.subjectId     Subject's id
    * @apiSuccess {Number}   gia.year          Gia year
    * @apiSuccess {Number}   gia.averageResult AverageResult by subject
    * @apiSuccess {Number}   gia.passedCount   Count passed exam

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
        const gia = await giaAdminService.update(
            parseInt(schoolId, 10),
            parseInt(giaId, 10),
            giaResult
        );
        return giaAdminView.update(gia);
    }

    /**
    * @api {delete} /api/admin/school/:schoolId/:id
    * Delete gia data for school
    * @apiVersion 1.0.0
    * @apiName deleteGiaData
    * @apiGroup School Gia Admin
    *
    * @apiParam {Number} schoolId School's id.
    * @apiParam {Number} id       Gia's id
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
