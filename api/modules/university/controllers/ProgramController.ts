import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {service as programService} from '../services/program';

import {ProgramNotFound} from './errors/ProgramNotFound';

class ProgramController extends Controller {
    constructor() {
        super();

        this.errors = {
            ProgramNotFoundException: ProgramNotFound
        };
    }

    /**
     * @api {get} /api/program/:id
     *     Get program by id
     * @apiVersion 1.0.0
     * @apiName getProgram
     * @apiGroup Program
     *
     * @apiSuccess {Number}   id                Id.
     * @apiSuccess {String}   name              Name.
     * @apiSuccess {String}   universityId      University's id.
     * @apiSuccess {String}   description       Description.
     * @apiSuccess {Number}   commentGroupId    Comment group's id.
     * @apiSuccess {String[]} links             Array of links
     *     (official site, facebook communities).
     * @apiSuccess {String[]} specializations   Array of specializations.
     * @apiSuccess {Number}   duration          Number of studying years.
     * @apiSuccess {Number}   employment        Percent of employment.
     * @apiSuccess {Number}   salary            Salary after graduation.
     * @apiSuccess {String[]} extraExam         Array of extra exams.
     * @apiSuccess {String}   exchangeProgram   Exchange program.
     * @apiSuccess {String}   phone             Phone number.
     * @apiSuccess {String}   addressName       Name of address.
     * @apiSuccess {Object}   programMajor      Major program for program
     * @apiSuccess {Number}   programMajor.id   Major program id
     * @apiSuccess {String}   programMajor.name Major program name
     * @apiSuccess {String}   oksoCode          Specialization code.
     * @apiSuccess {String}   createdAt         Created at.
     * @apiSuccess {String}   updatedAt         Updated at.
     *
     * @apiSuccessExample {json} Success-Response:
     *     {
     *         "id": 5,
     *         "name": "Прикладная математика",
     *         "universityId": 62,
     *         "description": "lalala",
     *         "commentGroupId": 369,
     *         "category": "sadadasdsadsad",
     *         "links": [
     *             "http://yandex.ru",
     *             "http://yandex1.ru"
     *         ],
     *         "specializations": [
     *             "прикладная математика",
     *             "химия"
     *         ],
     *         "duration": 1,
     *         "employment": 1.2,
     *         "salary": 12000,
     *         "extraExam": [
     *             "100 отжимагий",
     *             "рисование"
     *         ],
     *         "exchangeProgram": "Amurica",
     *         "phone": "+7 125 167 54 13",
     *         "oksoCode": "12.1.1",
     *         "createdAt": "2017-03-07T06:59:52.220Z",
     *         "updatedAt": "2017-03-07T06:59:52.220Z",
     *         "programMajor": {
     *             "id": 1,
     *             "name": "экономист"
     *         },
     *         "addressName": "Садовническая ул., 69"
     *     }
     *
     * @apiError (404) ProgramNotFound Program with given Id not found.
     */
    public async actionProgramPage(actionContext: any, id: string) {
        return programService.get(Number(id));
    }
}

export {ProgramController};
