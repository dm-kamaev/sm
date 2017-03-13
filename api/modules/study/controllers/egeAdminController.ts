'use strict';

// author: dm-kamaev
// admin ege for school

const util = require('util');

import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {egeAdminService} from '../services/egeAdminService';
import {view as egeAdminView} from '../views/egeAdminView';
const logger =
    require('../../../../app/components/logger/logger').getLogger('app');
import {ExamDataAlreadyExistBySubject} from
    './errors/ExamDataAlreadyExistBySubject';

class EgeAdminController extends Controller {
    constructor() {
        super();
        this.errors = {
            ExamDataAlreadyExistBySubject,
        };
    }


    /**
     * @api {get} /api/admin/school/:schoolId/ege Get all school ege
     * @apiVersion 1.0.0
     * @apiName getAllEge
     * @apiGroup School Ege Admin
     *
     * @apiParam {Number} schoolId School's id.
     *
     * @apiSuccess {Object[]} eges               Array of object.
     * @apiSuccess {Number}   eges.id            Ege's id.
     * @apiSuccess {String}   eges.subject       School's subject
     * @apiSuccess {Number}   eges.year          Ege year
     * @apiSuccess {Number}   eges.averageResult AverageResult by subject
     * @apiSuccess {Number}   eges.passedNumber  Count passed
     *
     * @apiSuccessExample {json} Example response:
     *    [
     *        {
     *            "id": 9880,
     *            "subject": "Русский язык",
     *            "year": 2015,
     *            "averageResult": 83,
     *            "passedCount": 0
     *        },
     *        {
     *            "id": 9884,
     *            "subject": "История",
     *            "year": 2015,
     *            "averageResult": 55,
     *            "passedCount": 0
     *        },
     *        {
     *            "id": 9889,
     *            "subject": "Английский",
     *            "year": 2015,
     *            "averageResult": 81,
     *            "passedCount": 0
     *        }
     *    ]
     */
    public async actionList(ctx: any, schoolId: string) {
        const res = await egeAdminService.getList(parseInt(schoolId, 10));
        return egeAdminView.listGia(res.eges, res.hashSubjectName);
    }


     /**
     * @api {get} /api/admin/school/:schoolId/ege/:id
     * Get school ege
     * @apiVersion 1.0.0
     * @apiName getGia
     * @apiGroup School Ege Admin
     *
     * @apiParam {Number} schoolId  School's id.
     * @apiParam {Number} id        Ege's id.
     *
     * @apiSuccess {Number}   ege.id            Ege's id
     * @apiSuccess {String}   ege.subject       School's ubject
     * @apiSuccess {Number}   ege.year          Ege's year
     * @apiSuccess {Number}   ege.averageResult AverageResult by subject
     * @apiSuccess {Number}   ege.passedCount   Count passed exam
     *
     * @apiSuccessExample {json} Example response:
     *    {
     *        "id": 9889,
     *        "subject": "Английский",
     *        "year": 2015,
     *        "averageResult": 81,
     *        "passedCount": 0
     *    }
     */
    public async actionGet(ctx: any, schoolId: string, egeId: string) {
        const res = await egeAdminService.getById(
            parseInt(schoolId, 10),
            parseInt(egeId, 10)
        );
        return egeAdminView.oneEge(res.ege, res.hashSubjectName);
    }

    /**
    * @api {post} /api/admin/school/:schoolId/ege
    * Create ege result for school
    * @apiVersion 1.0.0
    * @apiName createEgeResult
    * @apiGroup School Ege Admin
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
    * @apiSuccess {Number}   ege.id            Id.
    * @apiSuccess {Number}   ege.schoolId      School's id
    * @apiSuccess {Number}   ege.subjectId     Subject's id
    * @apiSuccess {Number}   ege.year          Ege year
    * @apiSuccess {Number}   ege.averageResult AverageResult by subject
    * @apiSuccess {Number}   ege.passedCount   Count passed exam
    *
    * @apiSuccessExample {json} Example response:
    *    {
    *        "id": 5723,
    *        "schoolId": 697,
    *        "subjectId": 9,
    *        "year": 2014,
    *        "averageResult": 3.5,
    *        "passedCount": 143
    *    }
    * @apiError (422) ExamDataAlreadyExistBySubject
    *     already gia data by subject
    */
    public async actionCreate(ctx: any, schoolId: string) {
        const egeResult: {
          subjectId: number,
          year: number,
          averageResult: number,
          passedCount: number
        } = ctx.request.body;
        const ege = await egeAdminService.create(
            parseInt(schoolId, 10),
            egeResult
        );
        return egeAdminView.create(ege);
    }


    /**
    * @api {put} /api/admin/school/:schoolId/ege/:id
    * Update school ege data
    * @apiVersion 1.0.0
    * @apiName updateEgeResult
    * @apiGroup School Ege Admin
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
    * @apiParam {Number} id       Ege's id
    *
    * @apiSuccess {Number}   ege.id            Id.
    * @apiSuccess {Number}   ege.schoolId      School's id
    * @apiSuccess {Number}   ege.subjectId     Subject's id
    * @apiSuccess {Number}   ege.year          Ege year
    * @apiSuccess {Number}   ege.averageResult AverageResult by subject
    * @apiSuccess {Number}   ege.passedCount   Count passed exam

    *
    * @apiSuccessExample {json} Example response:
    *    {
    *        "id": 5723,
    *        "schoolId": 697,
    *        "subjectId": 9,
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
        egeId: string
    ) {
        const egeResult: {
          subjectId: number,
          year: number,
          averageResult: number,
          passedCount: number
        } = ctx.request.body;

        const ege = await egeAdminService.update(
            parseInt(schoolId, 10),
            parseInt(egeId, 10),
            egeResult
        );
        return egeAdminView.update(ege);
    }

    /**
    * @api {delete} /api/admin/school/:schoolId/ege/:id
    * Delete ege data for school
    * @apiVersion 1.0.0
    * @apiName deleteEgeData
    * @apiGroup School Ege Admin
    *
    * @apiParam {Number} schoolId School's id.
    * @apiParam {Number} id       Ege's id
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
        egeId: string
    ) {
        return await egeAdminService.delete(
            parseInt(schoolId, 10),
            parseInt(egeId, 10),
        );
    }
}

export {EgeAdminController};
