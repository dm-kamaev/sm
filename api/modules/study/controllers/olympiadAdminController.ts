/**
 * @fileOverview Olympiad result controller
 */

import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {service as olympiadResultService} from '../services/olimpResult';
import {OlympiadResultNotFound} from './errors/OlympiadResultNotFound';

class OlympiadAdminController extends Controller {
    public readonly errors: any;
    constructor() {
        super();

        this.errors = {
            OlympiadResultNotFound
        };
    }
    /**
     * @api {get} /api/admin/school/:schoolId/olympiadResult/:id
     * @apiVersion 0.1.0
     * @apiName GetOneOlympiadResult
     * @apiGroup Olympiad Results
     *
     * @apiSuccess {Object}   olympiadResult
     * @apiSuccess {Number}   olympiadResult.schoolId  Id of school of current
     *     olympiad result
     * @apiSuccess {Number}   olympiadResult.subjectId Id of subject of current
     *     olympiad result
     * @apiSuccess {String="всероссийская", "московская"}
     *     olympiadResult.type   Type of current olympiad
     * @apiSuccess {Number}   olympiadResult.class     Education grade of
     *     current olympiad result
     * @apiSuccess {String="призер", "победитель"}
     *     olympiadResult.status Status of participants of olympiad
     * @apiSuccess {Number}   olympiadResult.amount   Amount of olympiad
     *     participants with current status
     * @apiSuccess {Date}     olympiadResult.year     Year which current result
     *     of olympiad was
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
     *         amount: 5
     *     }
     */
    public async actionGetOne(
        actionContext: any, schoolId: number, id: number
    ) {
        return await olympiadResultService.getOne(id);
    }

    /**
     * @api {get} /api/admin/school/:schoolId/olympiadResult
     * @apiVersion 0.1.0
     * @apiName GetAllOlympiadResults
     * @apiGroup Olympiad Results
     *
     * @apiSuccess {Object}   olympiadResult
     * @apiSuccess {Number}   olympiadResult.schoolId  Id of school of current
     *     olympiad result
     * @apiSuccess {Number}   olympiadResult.subjectId Id of subject of current
     *     olympiad result
     * @apiSuccess {String="всероссийская", "московская"}
     *     olympiadResult.type   Type of current olympiad
     * @apiSuccess {Number}   olympiadResult.class     Education grade of
     *     current olympiad result
     * @apiSuccess {String="призер", "победитель"}
     *     olympiadResult.status Status of participants of olympiad
     * @apiSuccess {Number}   olympiadResult.amount   Amount of olympiad
     *     participants with current status
     * @apiSuccess {Date}     olympiadResult.year     Year which current result
     *     of olympiad was
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
     *         amount: 5
     *     }
     */
    public async actionGetAllBySchoolId(actionContext: any, schoolId: number) {
        return await olympiadResultService.getAllBySchoolId(schoolId);
    }

    /**
     * @api {post} /api/admin/school/:schoolId/olympiadResult/:id
     * @apiVersion 0.1.0
     * @apiName GetOneOlympiadResult
     * @apiGroup Olympiad Results
     *
     * @apiParam {Object}   olympiadResult
     * @apiParam {Number}   olympiadResult.schoolId  Id of school of current
     *     olympiad result
     * @apiParam {Number}   olympiadResult.subjectId Id of subject of current
     *     olympiad result
     * @apiParam {String="всероссийская", "московская"}
     *     olympiadResult.type   Type of current olympiad
     * @apiParam {Number}   olympiadResult.class     Education grade of
     *     current olympiad result
     * @apiParam {String="призер", "победитель"}
     *     olympiadResult.status Status of participants of olympiad
     * @apiParam {Number}   olympiadResult.amount   Amount of olympiad
     *     participants with current status
     * @apiParam {Date}     olympiadResult.year     Year which current result
     *     of olympiad was
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *         schoolId: 10,
     *         subjectId: 12,
     *         type: "всероссийская",
     *         class: 10,
     *         status: "победитель",
     *         year: 2016,
     *         amount: 5
     *     }
     *
     *  @apiSuccessExample {json} Success-Response:
     *      HTTP 1/1 203 OK
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
            amount: data.amount
        });
    }

    /**
     * @api {put} /api/admin/school/:schoolId/olympiadResult/:id
     * @apiVersion 0.1.0
     * @apiName UpdateOneOlympiadResult
     * @apiGroup Olympiad Results
     *
     * @apiParam {Object}                               olympiadResult
     * @apiParam {Number}                               olympiadResult.schoolId
     *     Id of school of current olympiad result
     * @apiParam {Number}                               olympiadResult.subjectId
     *     Id of subject of current olympiad result
     * @apiParam {String="всероссийская", "московская"} olympiadResult.type
     *     Type of current olympiad
     * @apiParam {Number}                               olympiadResult.class
     *     Education grade of current olympiad result
     * @apiParam {String="призер", "победитель"}        olympiadResult.status
     *     Status of participants of olympiad
     * @apiParam {Number}                               olympiadResult.amount
     *     Amount of olympiad participants with current status
     * @apiParam {Date}                                 olympiadResult.year
     *     Year which current result of olympiad was
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *         schoolId: 10,
     *         subjectId: 12,
     *         type: "всероссийская",
     *         class: 10,
     *         status: "победитель",
     *         year: 2016,
     *         amount: 5
     *     }
     * 
     * @apiSuccessExample {json} Success-Response:
     *     HTTP 1/1 203 OK
     */
    public async actionUpdate(actionContext: any, schoolId: number, id: number) {
        const data = actionContext.data;
        
        return await olympiadResultService.update(id, {
            schoolId: schoolId,
            subjectId: data.subjectId,
            class: data.class,
            type: data.type,
            year: data.year,
            stage: data.stage,
            status: data.status,
            amount: data.amount
        });
    }

    /**
     * @api {delete} /api/admin/school/:schoolId/olympiadResult/:id
     * @apiVersion 0.1.0
     * @apiName DeleteOneOlympiadResult
     * @apiGroup Olympiad Results
     *
     *  @apiSuccessExample {json} Success-Response:
     *      HTTP 1/1 203 OK
     */
    public async actionDelete(
        actionContext: any, schoolId: number, id: number
    ) {
        await olympiadResultService.delete(id);
    }

    /**
     * @api {get} /api/admin/school/:schoolId/olympiadResult/search
     * @apiVersion 0.1.0
     * @apiName SearchOlympiadResult
     * @apiGroup Olympiad Results
     *
     * @apiParam {Object} olympiadResult
     * @apiParam {String} olympiadResult.type
     * @apiParam {Number} olympiadResult.class
     * @apiParam {Number} olympiadResult.subjectId
     *
     * @apiParamExample {json} Request-Example:
     *      {
     *          type: "всероссийская",
     *          class: 10,
     *          subjectId: 12
     *      }
     *
     *
     * * @apiSuccess {Object}   olympiadResult
     * @apiSuccess {Number}   olympiadResult.schoolId  Id of school of current
     *     olympiad result
     * @apiSuccess {Number}   olympiadResult.subjectId Id of subject of current
     *     olympiad result
     * @apiSuccess {String="всероссийская", "московская"}
     *     olympiadResult.type   Type of current olympiad
     * @apiSuccess {Number}   olympiadResult.class     Education grade of
     *     current olympiad result
     * @apiSuccess {String="призер", "победитель"}
     *     olympiadResult.status Status of participants of olympiad
     * @apiSuccess {Number}   olympiadResult.amount    Amount of olympiad
     *     participants with current status
     * @apiSuccess {Date}     olympiadResult.year      Year which current result
     *     of olympiad was
     *
     *
     * @apiSuccess {Object}                               data           Found
     *     data
     * @apiSuccess {Number}                               data.id        Id of
     *     olympiad result
     * @apiSuccess {Number}                               data.schoolId  Id of
     *     school of olympiad result
     * @apiSuccess {Number}                               data.subjectId Id of
     *     subject of olympiad result
     * @apiSuccess {String="всероссийская", "московская"} data.type      Type of
     *     current olympiad
     * @apiSuccess {Number}                               data.class
     *     Education grade of current olympiad result
     * @apiSuccess {String}                               data.status    Status
     *     of participants of olympiad
     * @apiSuccess {Number}                               data.amount    Amount
     *     of olympiad participants with current status
     * @apiSuccess {Number}                               data.year      Year
     *     which current result of olympiad was
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP 200 OK
     *     {
     *         id: 21,
     *         schoolId: 10,
     *         subjectId: 12,
     *         type: "всероссийская",
     *         class: 10,
     *         status: "победитель",
     *         year: 2016,
     *         amount: 5
     *     }
     */
    public async actionFind(actionContext: any, schoolId: number) {
        const searchParams = actionContext.data;
        return await olympiadResultService.findByParameters(
            schoolId,
            {
                subjectId: searchParams.subjectId,
                class: searchParams.class,
                type: searchParams.type,
                year: searchParams.year,
                status: searchParams.status
            }
        );
    }
}

export {OlympiadAdminController};
