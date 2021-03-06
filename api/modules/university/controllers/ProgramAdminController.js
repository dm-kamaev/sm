"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller = require('nodules/controller').Controller;
const program_1 = require("../services/program");
const programAdmin_1 = require("../views/programAdmin");
const ProgramNotFound_1 = require("./errors/ProgramNotFound");
class ProgramAdminController extends Controller {
    constructor() {
        super();
        this.errors = {
            ProgramNotFoundException: ProgramNotFound_1.ProgramNotFound
        };
    }
    /**
     * @api {get} /api/admin/university/:universityId/program Get programs by
     *     university id
     * @apiVersion 1.0.0
     * @apiName getAllPrograms
     * @apiGroup Admin Program
     *
     * @apiSuccess {Object[]} -                 Response body.
     * @apiSuccess {Number}   -.id              Id.
     * @apiSuccess {String}   -.name            Name.
     * @apiSuccess {Number}   -.commentCount    Number of comments.
     * @apiSuccess {Number}   -.passScore       Ege pass score.
     * @apiSuccess {String}   -.programUrl      Program's URL.
     * @apiSuccess {String}   -.updatedAt       Updated at.
     *
     * @apiSuccessExample {json} Success-Response:
     *     [
     *         {
     *             "id": 5,
     *             "name": "Прикладная математика",
     *             "commentCount": 14,
     *             "passScore": 256,
     *             "programUrl": "/vuz/msu/program/managment",
     *             "updatedAt": "2017-03-07T06:59:52.220Z"
     *         }
     *     ]
     */
    actionList(actionContext, universityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const programs = yield program_1.service.getByUniversityId(Number(universityId));
            const programUrls = yield program_1.service.getUrls(programs);
            return programAdmin_1.programAdminView.renderList(programs, programUrls);
        });
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
     * @apiSuccess {Number}   universityId    University's id.
     * @apiSuccess {Number}   pageMetaId      Id of page with meta information.
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
     * @apiSuccess {String}   phone           Phone number.
     * @apiSuccess {String}   exchangeProgram
     *     Array country for exchange program
     * @apiSuccess {Object}   programMajor    Major program for program
     * @apiSuccess {Number}   -.id            Major program id
     * @apiSuccess {String}   -.name          Major program name
     * @apiSuccess {String}   oksoCode        Specialization code.
     * @apiSuccess {String}   createdAt       Created at.
     * @apiSuccess {String}   updatedAt       Updated at.
     *
     * @apiError (404) ProgramNotFound Program with given Id not found.
     * @apiSuccessExample {json} Success-Response:
     *    {
     *        "id": 5,
     *        "name": "Прикладная математика",
     *        "universityId": 62,
     *        "pageMetaId": 62,
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
     *        "exchangeProgram": "да",
     *        "phone": "+7 125 367 23 41",
     *        "oksoCode": "12.1.1",
     *        "createdAt": "2017-03-07T06:59:52.220Z",
     *        "updatedAt": "2017-03-07T06:59:52.220Z",
     *        "programMajor": {
     *            "id": 1,
     *            "name": "экономист"
     *        },
     *        "addressName": null
     *    }
     */
    actionGet(actionContext, universityId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return program_1.service.get(id);
        });
    }
    /**
     * @api {post} /api/admin/university/:universityId/program Create program
     * @apiVersion 1.0.0
     * @apiName createProgram
     * @apiGroup Admin Program
     *
     * @apiParam {String}   name            Name.
     * @apiParam {String}   description     Description.
     * @apiParam {String}   addressName     Name of address.
     * @apiParam {String[]} extraExam       Array of extra exams.
     * @apiParam {String}   category        Program's category.
     * @apiParam {Number}   duration        Number of studying years.
     * @apiParam {Number}   employment      Percent of employment.
     * @apiParam {Number}   salary          Salary after graduation.
     * @apiParam {String[]} links           Array of links
     *     (official site, facebook communities).
     * @apiParam {String[]} specializations Array of program specializations
     * @apiParam {String}   phone           Phone number.
     * @apiParam {Number}   programMajorId  Program major Id
     * @apiParam {String}   exchangeProgram Exchange program
     * @apiParam {String}   oksoCode        Specialization code.
     *
     *
     * @apiSuccess {Number}   id              Id.
     * @apiSuccess {String}   name            Name.
     * @apiSuccess {String}   universityId    University's id.
     * @apiSuccess {String}   description     Description.
     * @apiSuccess {String[]} extraExam       Array of extra exams.
     * @apiSuccess {String}   category        Program's category.
     * @apiSuccess {Number}   duration        Number of studying years.
     * @apiSuccess {Number}   employment      Percent of employment.
     * @apiSuccess {Number}   salary          Salary after graduation.
     * @apiSuccess {String[]} links           Array of links
     *     (official site, facebook communities).
     * @apiSuccess {Number}   programMajorId  Program major Id
     * @apiSuccess {String}   phone           Phone number.
     * @apiSuccess {String}   exchangeProgram Exchange program
     * @apiSuccess {String}   commentGroupId  Comment group's id.
     * @apiSuccess {String[]} specializations Array of specializations.
     * @apiSuccess {Number}   totalScore      Total score.
     * @apiSuccess {Number[]} score           Array of scores.
     * @apiSuccess {Number[]} scoreCount      Array of scores' count.
     * @apiSuccess {Number}   reviewCount     Number of reviews.
     * @apiParam   {String}   oksoCode        Specialization code.
     * @apiSuccess {String}   createdAt       Created at.
     * @apiSuccess {String}   updatedAt       Updated at.
     * @apiSuccess {String}   created_at      Created at.
     * @apiSuccess {String}   updated_at      Updated at.
     *
     * @apiSuccessExample {json} Success-Response:
     *     {
     *         "id": 8,
     *         "name": "кибернетика",
     *         "universityId": 62,
     *         "description": "вуз номер ",
     *         "extraExam": [],
     *         "category": "something",
     *         "duration": 4,
     *         "employment": 1.9,
     *         "salary": 80000,
     *         "links": [],
     *         "programMajorId": 1,
     *         "exchangeProgram": "да",
     *         "commentGroupId": 372,
     *         "phone": "+7 125 167 45 31",
     *         "updated_at": "2017-03-07T10:43:42.034Z",
     *         "created_at": "2017-03-07T10:43:42.034Z",
     *         "specializations": [
     *             "прикладная математика",
     *             "химия"
     *         ],
     *         "createdAt": "2017-03-07T10:43:42.034Z",
     *         "updatedAt": "2017-03-07T10:43:42.034Z",
     *         "totalScore": 3,
     *         "score": [3, 3, 3, 3],
     *         "scoreCount": [10, 10, 10, 10],
     *         "reviewCount": 14,
     *         "oksoCode": "12.1.1"
     *     }
     */
    actionCreate(actionContext, universityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = actionContext.request;
            const body = request.body;
            const programData = {
                name: body.name,
                universityId: Number(universityId),
                description: body.description,
                extraExam: body.extraExam,
                category: body.category,
                duration: body.duration,
                employment: body.employment,
                salary: body.salary,
                links: body.links,
                specializations: body.specializations,
                addressName: body.addressName,
                programMajorId: Number(body.programMajorId),
                phone: body.phone,
                oksoCode: body.oksoCode,
                exchangeProgram: body.exchangeProgram && body.exchangeProgram.trim()
            };
            return program_1.service.create(programData);
        });
    }
    /**
     * @api {put} /api/admin/university/:universityId/program/:id Update program
     * @apiVersion 1.0.0
     * @apiName updateProgram
     * @apiGroup Admin Program
     *
     * @apiParam {String}   name            Name.
     * @apiParam {String}   description     Description.
     * @apiParam {String}   addressName     Name of address.
     * @apiParam {String[]} extraExam       Array of extra exams.
     * @apiParam {String}   category        Program's category.
     * @apiParam {Number}   duration        Number of studying years.
     * @apiParam {Number}   employment      Percent of employment.
     * @apiParam {Number}   salary          Salary after graduation.
     * @apiParam {String[]} links           Array of links
     *     (official site, facebook communities).
     * @apiParam {String[]} specializations Array of program specializations
     * @apiParam {Number}   programMajorId  Program major Id
     * @apiParam {String}   phone           Phone number.
     * @apiParam {String}   oksoCode        Specialization code.
     *
     * @apiSuccess {Array}    -    Response body.
     * @apiSuccess {Number}   -[0] Number of updated rows (Should be always 1).
     * @apiSuccess {Object[]} -[1] Array of updated programs.
     *
     * @apiSuccessExample {json} Example response:
     *     HTTP/1.1 200 OK
     *     [
     *         1,
     *         [
     *             {
     *                 "id": 1,
     *                 "name": "Менеджмент",
     *                 "universityId": 1,
     *                 "commentGroupId": 382,
     *                 "specializations": ["Прикладная математика", "Химия"],
     *                 "programMajorId": 3,
     *                 "totalScore": null,
     *                 "score": null,
     *                 "scoreCount": null,
     *                 "reviewCount": null,
     *                 "oksoCode": "12.1.1",
     *                 "createdAt": "2017-03-20T16:15:22.915Z",
     *                 "updatedAt": "2017-03-20T16:15:22.915Z",
     *                 "created_at": "2017-03-20T16:15:22.915Z",
     *                 "updated_at": "2017-03-20T16:25:56.292Z",
     *                 "university_id": 1,
     *                 "comment_group_id": 382,
     *                 "program_major_id": 3
     *             }
     *         ]
     *     ]
     */
    actionUpdate(actionContext, universityId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = actionContext.request;
            const body = request.body;
            const programData = {
                name: body.name,
                universityId: Number(universityId),
                description: body.description,
                extraExam: body.extraExam,
                category: body.category,
                duration: body.duration,
                employment: body.employment,
                salary: body.salary,
                links: body.links,
                specializations: body.specializations,
                addressName: body.addressName,
                programMajorId: Number(body.programMajorId),
                phone: body.phone,
                oksoCode: body.oksoCode,
                exchangeProgram: body.exchangeProgram && body.exchangeProgram.trim()
            };
            return program_1.service.update(Number(id), programData);
        });
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
    actionDelete(actionContext, universityId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return program_1.service.delete(Number(id));
        });
    }
    /**
     * @api {get} /api/admin/program/:id/alias
     * @apiVersion 1.0.0
     * @apiName getAlias
     * @apiGroup Admin Program
     *
     * @apiParam {Number} id Program's id.
     *
     * @apiSuccess {String} - alias.
     *
     * @apiSuccessExample {json} Example response:
     *     HTTP/1.1 200 OK
     *     mgu
     */
    actionGetAlias(actionContext, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return program_1.service.getProgramAlias(Number(id));
        });
    }
}
exports.ProgramAdminController = ProgramAdminController;
