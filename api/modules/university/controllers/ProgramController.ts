import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {
    ProgramSuggest,
    ProgramInstance,
} from '../types/program';

import {service as programService} from '../services/program';
import {programView} from '../views/program';

import {ProgramNotFound} from './errors/ProgramNotFound';
import {ProgramNameIsShorter} from './errors/ProgramNameIsShorter';

class ProgramController extends Controller {
    constructor() {
        super();

        this.errors = {
            ProgramNotFoundException: ProgramNotFound,
            ProgramNameIsShorterException: ProgramNameIsShorter
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


    /**
     * @api {get} /api/program/search/suggest Search program data by string
     * @apiVersion 0.1.0
     * @apiName SuggestSearch
     * @apiGroup Program
     *
     * @apiParam {String} searchString The search string.
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *         "searchString" : "ика",
     *     }
     *
     * @apiSuccess {Object[]} programs            Array of found programs.
     * @apiSuccess {Number}   programs.id         Program's id.
     * @apiSuccess {String}   programs.name       Program's name.
     * @apiSuccess {String}   programs.alias      Program's url
     * @apiSuccess {Number[]} programs.score      Program's scores array
     * @apiSuccess {Number}   programs.totalScore Program's total score.
     *
     * @apiSuccessExample {json} Success-Response:
     *    [
     *        {
     *            "id": 13,
     *            "name": "Экономика",
     *            "alias": "ehkonomika",
     *            "score": [],
     *            "totalScore": 0
     *        },
     *        {
     *            "id": 12,
     *            "name": "Прикладная математика",
     *            "alias": "prikladnaya-matematika",
     *            "score": [
     *                1,
     *                2,
     *                3,
     *                4
     *            ],
     *            "totalScore": 12
     *        }
     *    ]
     *
     * @apiError (422) ProgramNameIsShorter  Program's name is very short
     */
    public async actionSuggestSearch(actionContext: any) {
        const request = actionContext.request || {};
        const query = request.query || {};
        const searchString: string = query.searchString || '';

        const data: ProgramInstance[] | null
            = await programService.suggestSearch(searchString);
        let result: ProgramSuggest[] | undefined[] = [];
        if (data) {
            result = programView.suggestSearch(data);
        }
        return result;
    }
}

export {ProgramController};
