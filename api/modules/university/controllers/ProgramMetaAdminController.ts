import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

// import {programMetaService} from '../services/programMeta';
// import {programMetaView} from '../views/programMeta';

// import {ProgramAdmin} from '../types/program';

// import {ProgramNotFound} from './errors/ProgramNotFound';

class ProgramMetaAdminController extends Controller {
    constructor() {
        super();

        this.errors = {
            // ProgramNotFoundException: ProgramNotFound
        };
    }

    /**
     * @api {get} /api/admin/university/program/:id/pagemeta
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
    public async actionGet(actionContext: any, programId: string) {
        // const res = await programMetaService.get(parseInt(programId, 10));
        // console.log('HERE=', programMetaView.render(res));
        // return res;
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
    // public async actionUpdate(
    //         actionContext: any, universityId: string, id: string) {
    //     const request = actionContext.request;
    //     const body = request.body;
    //     const programData: ProgramAdmin = {
    //         name: body.name,
    //         universityId: Number(universityId),
    //         description: body.description,
    //         extraExam: body.extraExam,
    //         category: body.category,
    //         duration: body.duration,
    //         employment: body.employment,
    //         salary: body.salary,
    //         links: body.links,
    //         addressName: body.addressName,
    //         programMajorId: Number(body.programMajorId),
    //     };
    //     return programService.update(Number(id), programData);
    // }


}

export {ProgramMetaAdminController};
