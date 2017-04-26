import {LegacyController} from '../../../../api/components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {searchService} from '../services/searchService';
import {QueryParams} from '../types/programSearch';

export class ProgramController extends Controller {
    /* tslint:disable:max-line-length */
    /**
     * @api {get} /program/filtersearch Search programs by name and / or filters
     * @apiVersion 1.0.0
     * @apiName SearchProgram
     * @apiGroup Program
     *
     * @apiExample {curl} Example usage:
     *     curl 'http://vuz.mel.fm/program/filtersearch?limit=10&searchString=%D0%B8%D0%BD%D0%B6&sortType=1&page=0&cityId=2&ege=11%2C12%2C13%2C14%2C15&features=0%2C2&maxPrice=130000'
     *
     * @apiParam (query) {Number} [limit] Limit quantity of search results.
     * @apiParam (query) {Number} [page] Page of result.
     *     Applied only if limit parameter exists.
     * @apiParam (query) {Number=0,1,2} [sortType=0] Sort results by:
     *     0 – ege pass score; 1 – cost; 2 – total score.
     * @apiParam (query) {String} [searchString] Program names will contain
     *     that search string.
     * @apiParam (query) {Number[]} [cities] Cities' id search programs in.
     * @apiParam (query) {Number[]} [ege] Array of ege's ids
     *     that program have to contain.
     * @apiParam (query) {Number[]=0,1} [payType] Program's pay type:
     *     0 – budget type; 1 – commercial type.
     * @apiParam (query) {Number[]} [majors] Array of program's majors.
     * @apiParam (query) {Boolean=1} [discount] Search programs with discount.
     * @apiParam (query) {Number[]=0,1,2} [features] Array of program's
     *     features. 0 – exchange program; 1 – military department;
     *     2 – dormitory.
     * @apiParam (query) {Number} [maxPrice] Program's price cap.
     * @apiParam (query) {Number} [maxPassScore] Program's ege pass cap.
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
    public async actionSearch(actionContext: any) {
        const queryParams: QueryParams = actionContext.data;
        return searchService.findByParams(queryParams);
    }
}
