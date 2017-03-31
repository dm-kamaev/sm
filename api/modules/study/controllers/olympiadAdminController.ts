/**
 * @fileOverview Olympiad result controller
 */

import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

const awardType = require('../enums/olimpStatusType');
const olympiadType = require('../enums/olimpType');

import {service as olympiadResultService} from '../services/olimpResult';
import {OlympiadResultNotFound} from './errors/OlympiadResultNotFound';
import {OlympiadResultsAlreadyExists}
    from './errors/OlympiadResultAlreadyExists';

class OlympiadAdminController extends Controller {
    public readonly errors: any;
    constructor() {
        super();

        this.errors = {
            OlympiadResultNotFound,
            OlympiadResultsAlreadyExists
        };
    }

    /**
     * @apiDefine OlympiadResultsNotFoundError
     * @apiError (404) OlympiadResultsNotFound Olympiad result not found
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 404 Not Found
     *      {
     *           "code": "OlympiadResultNotFound",
     *           "message": "Olympiad result with id = 5 not found"
     *      }
     */

    /**
     * @apiDefine OlympiadResultsAlreadyExistsError
     * @apiError (422) OlympiadResultsAlreadyExists
     *     Olympiad result with same parameters already exists
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 404 Not Found
     *      {
     *           "code": "OlympiadResultsAlreadyExists",
     *           "message":
     *               "Olympiad result with given parameters already exists"
     *      }
     */

    /**
     * @api {get} /api/admin/school/:schoolId/olympiadResult/:id Get one result
     * @apiVersion 0.1.0
     * @apiName GetOneOlympiadResult
     * @apiGroup Olympiad Results
     *
     * @apiSuccess {Object} olympiadResult
     * @apiSuccess {Number} olympiadResult.schoolId      Id of school of
     *     current olympiad result
     * @apiSuccess {Number} olympiadResult.subjectId     Id of subject of
     *     current olympiad result
     * @apiSuccess {String="всероссийская","московская"} olympiadResult.type
     *     Type of current olympiad
     * @apiSuccess {Number} olympiadResult.class         Education grade of
     *     current olympiad result
     * @apiSuccess {String="призер","победитель"} olympiadResult.status
     *     Status of participants of olympiad
     * @apiSuccess {Number} olympiadResult.awardeeAmount Amount of olympiad
     *     participants with current status
     * @apiSuccess {Number} olympiadResult.year          Year which current
     *     result of olympiad was
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP 1/1 200 OK
     *     {
     *         schoolId: 10,
     *         subjectId: 12,
     *         type: "всероссийская",
     *         class: 10,
     *         status: "победитель",
     *         year: 2016,
     *         awardeeAmount: 5
     *     }
     *
     * @apiUse OlympiadResultsNotFoundError
     */
    public async actionGet(
            actionContext: any, schoolId: number, id: number) {
        return await olympiadResultService.getOne(id);
    }

    /**
     * @api {get} /api/admin/school/:schoolId/olympiadResult Get all results
     * @apiVersion 0.1.0
     * @apiName GetAllOlympiadResults
     * @apiGroup Olympiad Results
     *
     * @apiSuccess {Object} olympiadResult
     * @apiSuccess {Number} olympiadResult.schoolId      Id of school of
     *     current olympiad result
     * @apiSuccess {Number} olympiadResult.subjectId     Id of subject of
     *     current olympiad result
     * @apiSuccess {String="всероссийская","московская"} olympiadResult.type
     *     Type of current olympiad
     * @apiSuccess {Number} olympiadResult.class         Education grade of
     *     current olympiad result
     * @apiSuccess {String="призер","победитель"} olympiadResult.status
     *     Status of participants of olympiad
     * @apiSuccess {Number} olympiadResult.awardeeAmount Amount of olympiad
     *     participants with current status
     * @apiSuccess {Number} olympiadResult.year          Year which current
     *     result of olympiad was
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP 1/1 200 OK
     *     {
     *         schoolId: 10,
     *         subjectId: 12,
     *         type: "всероссийская",
     *         class: 10,
     *         status: "победитель",
     *         year: 2016,
     *         awardeeAmount: 5
     *     }
     */
    public async actionList(actionContext: any, schoolId: number) {
        return await olympiadResultService.getAllBySchoolId(schoolId);
    }

    /**
     * @api {post} /api/admin/school/:schoolId/olympiadResult/:id Create
     *     olympiad result
     * @apiVersion 0.1.0
     * @apiName GetOneOlympiadResult
     * @apiGroup Olympiad Results
     *
     * @apiParam {Object}   olympiadResult
     * @apiParam {Number}   olympiadResult.schoolId      Id of school of current
     *     olympiad result
     * @apiParam {Number}   olympiadResult.subjectId     Id of subject of
     *     current olympiad result
     * @apiParam {String="всероссийская","московская"} olympiadResult.type
     *     Type of current olympiad
     * @apiParam {Number}   olympiadResult.class         Education grade of
     *     current olympiad result
     * @apiParam {String="призер","победитель"} olympiadResult.status
     *     Status of participants of olympiad
     * @apiParam {Number}   olympiadResult.awardeeAmount Amount of olympiad
     *     participants with current status
     * @apiParam {Number}   olympiadResult.year          Year which current
     *     result of olympiad was
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *         schoolId: 10,
     *         subjectId: 12,
     *         type: "всероссийская",
     *         class: 10,
     *         status: "победитель",
     *         year: 2016,
     *         awardeeAmount: 5
     *     }
     *
     * @apiSuccess {Object} olympiadResult
     * @apiSuccess {Number} olympiadResult.schoolId      Id of school of
     *     current olympiad result
     * @apiSuccess {Number} olympiadResult.subjectId     Id of subject of
     *     current olympiad result
     * @apiSuccess {String="всероссийская","московская"} olympiadResult.type
     *     Type of current olympiad
     * @apiSuccess {Number} olympiadResult.class         Education grade of
     *     current olympiad result
     * @apiSuccess {String="призер","победитель"} olympiadResult.status
     *     Status of participants of olympiad
     * @apiSuccess {Number} olympiadResult.awardeeAmount Amount of olympiad
     *     participants with current status
     * @apiSuccess {Number} olympiadResult.year          Year which current
     *     result of olympiad was
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP 1/1 200 OK
     *     {
     *         schoolId: 10,
     *         subjectId: 12,
     *         type: "всероссийская",
     *         class: 10,
     *         status: "победитель",
     *         year: 2016,
     *         awardeeAmount: 5
     *     }
     *
     * @apiUse OlympiadResultsAlreadyExists
     */
    public async actionCreate(actionContext: any, schoolId: number) {
        const data = actionContext.data;
        return await olympiadResultService.create({
            schoolId: schoolId,
            subjectId: data.subjectId,
            type: data.type,
            class: data.class,
            status: data.status,
            year: data.year,
            stage: data.stage,
            awardeeAmount: data.awardeeAmount
        });
    }

    /**
     * @api {put} /api/admin/school/:schoolId/olympiadResult/:id Update olympiad
     *     result
     * @apiVersion 0.1.0
     * @apiName UpdateOneOlympiadResult
     * @apiGroup Olympiad Results
     *
     * @apiParam {Object}   olympiadResult
     * @apiParam {Number}   olympiadResult.schoolId      Id of school of current
     *     olympiad result
     * @apiParam {Number}   olympiadResult.subjectId     Id of subject of
     *     current olympiad result
     * @apiParam {String="всероссийская","московская"} olympiadResult.type
     *     Type of current olympiad
     * @apiParam {Number}   olympiadResult.class         Education grade of
     *     current olympiad result
     * @apiParam {String="призер","победитель"} olympiadResult.status
     *     Status of participants of olympiad
     * @apiParam {Number}   olympiadResult.awardeeAmount Amount of olympiad
     *     participants with current status
     * @apiParam {Number}   olympiadResult.year          Year which current
     *     result of olympiad was
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *         schoolId: 10,
     *         subjectId: 12,
     *         type: "всероссийская",
     *         class: 10,
     *         status: "победитель",
     *         year: 2016,
     *         awardeeAmount: 5
     *     }
     *
     * @apiSuccess {Object} olympiadResult
     * @apiSuccess {Number} olympiadResult.schoolId      Id of school of
     *     current olympiad result
     * @apiSuccess {Number} olympiadResult.subjectId     Id of subject of
     *     current olympiad result
     * @apiSuccess {String="всероссийская","московская"} olympiadResult.type
     *     Type of current olympiad
     * @apiSuccess {Number} olympiadResult.class         Education grade of
     *     current olympiad result
     * @apiSuccess {String="призер","победитель"} olympiadResult.status
     *     Status of participants of olympiad
     * @apiSuccess {Number} olympiadResult.awardeeAmount Amount of olympiad
     *     participants with current status
     * @apiSuccess {Number} olympiadResult.year          Year which current
     *     result of olympiad was
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP 1/1 200 OK
     *     {
     *         schoolId: 10,
     *         subjectId: 12,
     *         type: "всероссийская",
     *         class: 10,
     *         status: "победитель",
     *         year: 2016,
     *         awardeeAmount: 5
     *     }
     *
     * @apiUse OlympiadResultsNotFoundError
     */
    public async actionUpdate(
            actionContext: any, schoolId: number, id: number) {
        const data = actionContext.data;

        return await olympiadResultService.update(id, {
            schoolId: schoolId,
            subjectId: data.subjectId,
            class: data.class,
            type: data.type,
            year: data.year,
            stage: data.stage,
            status: data.status,
            awardeeAmount: data.awardeeAmount
        });
    }

    /**
     * @api {delete} /api/admin/school/:schoolId/olympiadResult/:id Delete
     *     olympiad result
     * @apiVersion 0.1.0
     * @apiName DeleteOneOlympiadResult
     * @apiGroup Olympiad Results
     *
     *  @apiSuccessExample {json} Success-Response:
     *      HTTP 1/1 203 OK
     *
     * @apiUse OlympiadResultsNotFoundError
     */
    public async actionDelete(
            actionContext: any, schoolId: number, id: number) {
        await olympiadResultService.delete(id);
    }


    /**
     * @api {get} /api/admin/awardetype Get all types of status olympiad
     * @apiVersion 1.0.0
     * @apiName GetAwardTypes
     * @apiGroup School Admin
     *
     * @apiSuccess {String[]} - school types.
     * @apiSuccessExample {json} Example response:
     *    [
     *        "победитель",
     *        "призер"
     *    ]
     */
    public actionGetAwardTypes(actionContext: any) {
        return awardType.toArray();
    }


    /**
     * @api {get} /api/admin/olymptype Get all types of olympiad
     * @apiVersion 1.0.0
     * @apiName GetOlympTypes
     * @apiGroup School Admin
     *
     * @apiSuccess {String[]} - school types.
     * @apiSuccessExample {json} Example response:
     *    [
     *        "всероссийская",
     *        "московская"
     *    ]
     */
    public actionGetOlympTypes(actionContext: any) {
        return olympiadType.toArray();
    }
}

export {OlympiadAdminController};
