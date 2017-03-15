import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {service as programService} from '../services/program';
import {programAdminView} from '../views/programAdmin';

import {ProgramAdmin} from '../types/program';

import {ProgramNotFound} from './errors/ProgramNotFound';

class ProgramAdminController extends Controller {
    constructor() {
        super();

        this.errors = {
            ProgramNotFoundException: ProgramNotFound
        };
    }

    /**
     * @api {get} /api/admin/university/:universityId/program Get all programs
     * @apiVersion 1.0.0
     * @apiName getAllPrograms
     * @apiGroup Admin Program
     *
     * @apiSuccess {Object[]} -                 Response body.
     * @apiSuccess {Number}   -.id              Id.
     * @apiSuccess {String}   -.name            Name.
     * @apiSuccess {Number}   -.commentCount    Number of comments.
     * @apiSuccess {Number}   -.passScore       Ege pass score.
     * @apiSuccess {String}   -.updatedAt       Updated at.
     *
     * @apiSuccessExample {json} Success-Response:
     *     [
     *         {
     *             "id": 5,
     *             "name": "Прикладная математика",
     *             "commentCount": 14,
     *             "passScore": 256,
     *             "updatedAt": "2017-03-07T06:59:52.220Z"
     *         }
     *     ]
     */
    public async actionList(actionContext: any, universityId: string) {
        const programs = await programService.getAll();
        return programAdminView.renderList(programs);
    }

    /**
     * @api {get} /api/admin/university/:universityId/program/:id
     *     Get program by id
     * @apiVersion 1.0.0
     * @apiName getProgram
     * @apiGroup Admin Program
     *
     * @apiSuccess {Number}   id              Id.
     * @apiSuccess {String}   name            Name.
     * @apiSuccess {String}   universityId    University's id.
     * @apiSuccess {String}   description     Description.
     * @apiSuccess {String}   commentGroupId  Comment group's id.
     * @apiSuccess {String}   category        Program's category.
     * @apiSuccess {String[]} links           Array of links
     *     (official site, facebook communities).
     * @apiSuccess {String[]} specializations Array of specializations.
     * @apiSuccess {Number}   duration        Number of studying years.
     * @apiSuccess {Number}   employment      Percent of employment.
     * @apiSuccess {Number}   salary          Salary after graduation.
     * @apiSuccess {String[]} extraExam       Array of extra exams.
     * @apiSuccess {String}   addressName     Name of address.
     * @apiSuccess {Object}   programMajor    Major program for program
     * @apiSuccess {String}   exchangeProgram Exchange program
     * @apiSuccess {Number}       -.programMajor.id   Major program id
     * @apiSuccess {String}       -.programMajor.name Major program name
     * @apiSuccess {String}   createdAt       Created at.
     * @apiSuccess {String}   updatedAt       Updated at.
     *
     * @apiError (404) ProgramNotFound Program with given Id not found.
     * @apiSuccessExample {json} Success-Response:
     *    {
     *        "id": 5,
     *        "name": "Прикладная математика",
     *        "universityId": 62,
     *        "description": "lalala",
     *        "commentGroupId": 369,
     *        "category": "sadadasdsadsad",
     *        "links": [
     *            "http://yandex.ru",
     *            "http://yandex1.ru"
     *        ],
     *        "specializations": [
     *            "прикладная математика",
     *            "химия"
     *        ],
     *        "duration": 1,
     *        "employment": 1.2,
     *        "salary": 12000,
     *        "extraExam": [
     *            "100 отжимагий",
     *            "рисование"
     *        ],
     *        "exchangeProgram": true,
     *        "createdAt": "2017-03-07T06:59:52.220Z",
     *        "updatedAt": "2017-03-07T06:59:52.220Z",
     *        "programMajor": {
     *            "id": 1,
     *            "name": "экономист"
     *        },
     *        "addressName": null
     *    }
     */
    public async actionGet(actionContext: any, universityId: string, id: any) {
        return programService.get(id);
    }

    /**
     * @api {post} /api/admin/university/:universityId/program Create program
     * @apiVersion 1.0.0
     * @apiName createProgram
     * @apiGroup Admin Program
     *
     * @apiParam {String}   name        Name.
     * @apiParam {String}   description Description.
     * @apiParam {String}   addressName Name of address.
     * @apiParam {String[]} extraExam   Array of extra exams.
     * @apiParam {String}   category    Program's category.
     * @apiParam {Number}   duration    Number of studying years.
     * @apiParam {Number}   employment  Percent of employment.
     * @apiParam {Number}   salary      Salary after graduation.
     * @apiParam {String[]} links       Array of links
     *     (official site, facebook communities).
     * @apiParam {Number}   programMajorId Program major Id
     * @apiParam {String} -.exchangeProgram Exchange program
     *
     *
     * @apiSuccess {Number}   id              Id.
     * @apiSuccess {String}   name            Name.
     * @apiSuccess {String}   universityId    University's id.
     * @apiSuccess {String}   description     Description.
     * @apiSuccess {String}   commentGroupId  Comment group's id.
     * @apiSuccess {String}   category        Program's category.
     * @apiSuccess {String[]} links           Array of links
     *     (official site, facebook communities).
     * @apiSuccess {String[]} specializations Array of specializations.
     * @apiSuccess {Number}   duration        Number of studying years.
     * @apiSuccess {Number}   employment      Percent of employment.
     * @apiSuccess {Number}   salary          Salary after graduation.
     * @apiSuccess {Number}   programMajorId  Program major Id
     * @apiSuccess {String[]} extraExam       Array of extra exams.
     * @apiSuccess {String} -.exchangeProgram Exchange program
     * @apiSuccess {String}   createdAt       Created at.
     * @apiSuccess {String}   updatedAt       Updated at.
     * @apiSuccess {String}   created_at      Created at.
     * @apiSuccess {String}   updated_at      Updated at.
     * @apiSuccessExample {json} Success-Response:
     *    {
     *        "id": 8,
     *        "name": "кибернетика",
     *        "universityId": 62,
     *        "description": "вуз номер ",
     *        "extraExam": [],
     *        "category": "something",
     *        "duration": 4,
     *        "employment": 1.9,
     *        "salary": 80000,
     *        "links": [],
     *        "programMajorId": 1,
     *        "commentGroupId": 372,
     *        "updated_at": "2017-03-07T10:43:42.034Z",
     *        "created_at": "2017-03-07T10:43:42.034Z",
     *        "specializations": null,
     *        "createdAt": "2017-03-07T10:43:42.034Z",
     *        "updatedAt": "2017-03-07T10:43:42.034Z",
     *        "exchangeProgram": 'да'
     *    }
     */
    public async actionCreate(actionContext: any, universityId: string) {
        const request = actionContext.request;
        const body = request.body;
        const programData: ProgramAdmin = {
            name: body.name,
            universityId: Number(universityId),
            description: body.description,
            extraExam: body.extraExam,
            category: body.category,
            duration: body.duration,
            employment: body.employment,
            salary: body.salary,
            links: body.links,
            addressName: body.addressName,
            programMajorId: Number(body.programMajorId),
            exchangeProgram: body.exchangeProgram && body.exchangeProgram.trim()
        };
        return programService.create(programData);
    }

    /**
    * @api {put} /api/admin/university/:universityId/program/:id Update program
    * @apiVersion 1.0.0
    * @apiName updateProgram
    * @apiGroup Admin Program
     *
     * @apiParam {String}   name        Name.
     * @apiParam {String}   description Description.
     * @apiParam {String}   addressName Name of address.
     * @apiParam {String[]} extraExam   Array of extra exams.
     * @apiParam {String}   category    Program's category.
     * @apiParam {Number}   duration    Number of studying years.
     * @apiParam {Number}   employment  Percent of employment.
     * @apiParam {Number}   salary      Salary after graduation.
     * @apiParam {String[]} links       Array of links
     *     (official site, facebook communities).
     * @apiParam {Number}   programMajorId Program major Id
     *
     * @apiSuccess {Array}  -    Response body.
     * @apiSuccess {Number} -[0] Number of updated rows (Should be always 1).
     *
     * @apiSuccessExample {json} Example response:
     *     HTTP/1.1 200 OK
     *     [
     *         1
     *     ]
     */
    public async actionUpdate(
            actionContext: any, universityId: string, id: string) {
        const request = actionContext.request;
        const body = request.body;
        const programData: ProgramAdmin = {
            name: body.name,
            universityId: Number(universityId),
            description: body.description,
            extraExam: body.extraExam,
            category: body.category,
            duration: body.duration,
            employment: body.employment,
            salary: body.salary,
            links: body.links,
            addressName: body.addressName,
            programMajorId: Number(body.programMajorId),
            exchangeProgram: body.exchangeProgram && body.exchangeProgram.trim()
        };
        return programService.update(Number(id), programData);
    }

    /**
     * @api {delete} /api/admin/university/:universityid/program/:id
     *     Delete program
     * @apiVersion 1.0.0
     * @apiName deleteProgram
     * @apiGroup Admin Program
     *
     * @apiParam {Number} id Program's id.
     *
     * @apiSuccess {Number} - Number of deleted rows (Should be always 1).
     *
     * @apiSuccessExample {json} Example response:
     *     HTTP/1.1 200 OK
     *     1
     */
    public async actionDelete(
            actionContext: any, universityId: string, id: string) {
        return programService.delete(Number(id));
    }
}

export {ProgramAdminController};
