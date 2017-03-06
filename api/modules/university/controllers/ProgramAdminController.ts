import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {service as programService} from '../services/program';

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
     * @apiSuccess {String}   -.universityId    University's id.
     * @apiSuccess {String}   -.description     Description.
     * @apiSuccess {String}   -.commentGroupId  Comment group's id.
     * @apiSuccess {String}   -.category        Program's category.
     * @apiSuccess {String[]} -.links           Array of links
     *     (official site, facebook communities).
     * @apiSuccess {String[]} -.specializations Array of specializations.
     * @apiSuccess {Number}   -.duration        Number of studying years.
     * @apiSuccess {Number}   -.employment      Percent of employment.
     * @apiSuccess {Number}   -.salary          Salary after graduation.
     * @apiSuccess {String[]} -.extraExam       Array of extra exams.
     * @apiSuccess {String}   -.createdAt       Created at.
     * @apiSuccess {String}   -.updatedAt       Updated at.
     */
    public async actionList(actionContext: any, universityId: string) {
        return programService.getAll();
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
     * @apiSuccess {String}   createdAt       Created at.
     * @apiSuccess {String}   updatedAt       Updated at.
     *
     * @apiError (404) ProgramNotFound Program with given Id not found.
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
     * @apiSuccess {String}   createdAt       Created at.
     * @apiSuccess {String}   updatedAt       Updated at.
     * @apiSuccess {String}   created_at      Created at.
     * @apiSuccess {String}   updated_at      Updated at.
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
            addressName: body.addressName
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
            addressName: body.addressName
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
