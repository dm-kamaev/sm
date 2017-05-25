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
const program_2 = require("../views/program");
const ProgramNotFound_1 = require("./errors/ProgramNotFound");
const ProgramNameIsShorter_1 = require("./errors/ProgramNameIsShorter");
class ProgramController extends Controller {
    constructor() {
        super();
        this.errors = {
            ProgramNotFoundException: ProgramNotFound_1.ProgramNotFound,
            ProgramNameIsShorterException: ProgramNameIsShorter_1.ProgramNameIsShorter
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
    actionProgramPage(actionContext, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return program_1.service.get(Number(id));
        });
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
     *         "searchString" : "ика"
     *     }
     *
     * @apiSuccess {Object[]} programs                       Array of found
     *     programs.
     * @apiSuccess {Number}   programs.id                    Program's id.
     * @apiSuccess {String}   programs.name                  Program's name.
     * @apiSuccess {String}   program.universityAbbreviation Abbreviation of
     *     university.
     * @apiSuccess {String}   programs.alias                 Program's url.
     * @apiSuccess {Number[]} programs.score                 Program's scores
     *     array.
     * @apiSuccess {Number}   programs.totalScore            Program's total
     *     score.
     *
     * @apiSuccessExample {json} Success-Response:
     *    {
     *        "programs": [
     *            {
     *                "id": 12,
     *                "name": "Экономика",
     *                "universityAbbreviation": "МГТУ им. Н. Э. Баумана",
     *                "alias": "/vuz/niu-vshe/specialnost/ekonomika",
     *                "score": [
     *                    1,
     *                    2,
     *                    3,
     *                    4
     *                ],
     *                "totalScore": 12
     *            },
     *            {
     *                "id": 13,
     *                "name": "Экономика",
     *                "universityAbbreviation": "МИРЭА, МГУПИ, МИТХТ",
     *                "alias": "/vuz/msu/specialnost/ekonomika",
     *                "score": [],
     *                "totalScore": 0
     *            }
     *        ]
     *    }
     *
     * @apiError (422) ProgramNameIsShorter  Program's name is very short
     */
    actionSuggestSearch(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = actionContext.request || {};
            const query = request.query || {};
            const searchString = query.searchString || '';
            const data = yield program_1.service.suggestSearch(searchString);
            const result = {
                programs: []
            };
            if (data) {
                const urls = yield program_1.service.getUrls(data);
                result.programs = program_2.programView.suggestSearch(data, urls);
            }
            return result;
        });
    }
    /* tslint:disable:max-line-length */
    /**
     * @api {get} /api/program/search Search programs by name and / or filters
     * @apiVersion 1.0.0
     * @apiName SearchProgram
     * @apiGroup Program
     *
     * @apiExample {curl} Example usage:
     *     curl 'http://localhost.lan:3000/universities/api/program/search?cities=2&cities=1&discount=1&ege=%7B%2212%22%3A+80%7D&ege=%7B%2213%22%3A+85%7D&ege=%7B%2214%22%3A+70%7D&limit=10&page=0&searchString=%D0%BA%D0%B0'
     *
     * @apiParam (query) {Number} [limit] Limit quantity of search results.
     * @apiParam (query) {Number} [page] Page of result.
     *     Applied only if limit parameter exists.
     * @apiParam (query) {Number=0,1,2} [sortType=0] Sort results by:
     *     0 – ege pass score; 1 – cost; 2 – total score.
     * @apiParam (query) {String} [searchString] Program names will contain
     *     that search string.
     * @apiParam (query) {Number[]} [cities] Cities' id search programs in.
     * @apiParam (query) {Object[]} [ege] Array of ege objects.
     *     Ex: [{"12": 60}, {"13": 70}, {"14": 70}].
     * @apiParam (query) {Number[]=0,1} [payType] Program's pay type:
     *     0 – budget type; 1 – commercial type.
     * @apiParam (query) {Number[]} [majors] Array of program's majors.
     * @apiParam (query) {Boolean=1} [discount] Search programs with discount.
     * @apiParam (query) {Number[]=0,1,2} [features] Array of program's
     *     features. 0 – exchange program; 1 – military department;
     *     2 – dormitory.
     * @apiParam (query) {Number} [maxPrice] Program's price cap.
     *
     * @apiSuccess {Number} programCount Count of found programs.
     * @apiSuccess {Number} universityCount Count of programs' universities.
     * @apiSuccess {Object[]} programs Array of found programs.
     * @apiSuccess {Number} programs.id Program's id.
     * @apiSuccess {String} programs.name Program's name.
     * @apiSuccess {Number} programs.totalScore Program's total score.
     * @apiSuccess {String} programs.exchangeProgram Program's exchange program.
     * @apiSuccess {String[]} programs.extraExam Program's extra exam.
     * @apiSuccess {Number} programs.egeScore Program's ege score in last
     *     statistic we have.
     * @apiSuccess {Number} programs.cost Program's cost in last statistic we
     *     have.
     * @apiSuccess {Number} programs.budgetPlaces Count of budget places.
     * @apiSuccess {Number} programs.commercialPlaces Count of commercital
     *     places.
     * @apiSuccess {Number} programs.competition Number of people on one place
     *     in last statistic we have.
     * @apiSuccess {String} programs.imageUrl Url on university's logo.
     * @apiSuccess {String} programs.universityName University's name.
     * @apiSuccess {String} programs.universityAbbreviation University's name
     *     abbreviation.
     * @apiSuccess {String} programs.cityName Name of a city the program in.
     * @apiSuccess {String} programs.programAlias Program's alias.
     * @apiSuccess {String} programs.universityAlias: University's alias.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "programCount": 1,
     *         "universityCount": 1,
     *         "programs": [{
     *             "id": 3,
     *             "name": "Any Prther",
     *             "totalScore": 4.4,
     *             "exchangeProgram": "USA",
     *             "extraExam": [
     *                 "Mathemetics"
     *             ],
     *             "egeScore": 280,
     *             "cost": 120000,
     *             "budgetPlaces": 30,
     *             "commercialPlaces": 15,
     *             "competition": 3.3,
     *             "imageUrl": "www",
     *             "universityName": "Питерский государственный университет",
     *             "universityAbbreviation": "СПбГУ",
     *             "cityName": "Москва",
     *             "programAlias": "any-prther",
     *             "universityAlias": "piterskij-gosudarstvennyj-universitet"
     *         }]
     *     }
     */
    /* tslint:enable:max-line-length */
    actionSearch(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = actionContext.data;
            return program_1.service.searchList(queryParams);
        });
    }
    /**
     * @api {get} /api/program/search/count
     *     Search program's count by name and / or filters
     * @apiVersion 1.0.0
     * @apiName SearchProgramCount
     * @apiGroup Program
     *
     * @apiParam (query) {String} [searchString] Program names will contain
     *     that search string.
     * @apiParam (query) {Number[]} [cities] Cities' id search programs in.
     * @apiParam (query) {Object[]} [ege] Array of ege objects.
     *     Ex: [{"12": 60}, {"13": 70}, {"14": 70}].
     * @apiParam (query) {Number[]=0,1} [payType] Program's pay type:
     *     0 – budget type; 1 – commercial type.
     * @apiParam (query) {Number[]} [majors] Array of program's majors.
     * @apiParam (query) {Boolean=1} [discount] Search programs with discount.
     * @apiParam (query) {Number[]=0,1,2} [features] Array of program's
     *     features. 0 – exchange program; 1 – military department;
     *     2 – dormitory.
     * @apiParam (query) {Number} [maxPrice] Program's price cap.
     *
     * @apiSuccess {Number} programCount Count of found programs.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "programCount": 125
     *     }
     */
    actionCountSearch(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = actionContext.data;
            return program_1.service.searchCountList(queryParams);
        });
    }
}
exports.ProgramController = ProgramController;
