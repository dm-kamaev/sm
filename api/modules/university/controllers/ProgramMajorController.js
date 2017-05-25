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
const programMajor_1 = require("../services/programMajor");
const courseService = require('../../course/services/course');
const courseBrandService = require('../../course/services/courseBrand');
const courseCategoryService = require('../../course/services/courseCategory');
const courseView = require('../../course/views/courseView');
class ProgramMajorController extends Controller {
    /**
     * @api {get} /api/programmajor/search Search program major by name
     * @apiVersion 1.0.0
     * @apiName searchProgramMajor
     * @apiGroup Program Major
     *
     * @apiParam {String} name Part of a program major's name you search for.
     *
     * @apiSuccess {Number} id         Id.
     * @apiSuccess {String} name       Name.
     * @apiSuccess {String} createdAt  Created at.
     * @apiSuccess {String} updatedAt  Updated at.
     */
    actionSearch(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            return programMajor_1.service.search(actionContext.request.query.name);
        });
    }
    /**
     * @api {get} /api/programmajor/popular Get popular program majors
     * @apiVersion 1.0.0
     * @apiName popularProgramMajor
     * @apiGroup Program Major
     *
     * @apiParam {Number} count Count of popular program major, which you want
     * to retrieve
     *
     * @apiSuccess {Object[]} programMajor            Program major
     * @apiSuccess {Number}   programMajor.id         Id of program major
     * @apiSuccess {String}   programMajor.name       Name of program major
     * @apiSuccess {Number}   programMajor.popularity Popularity of program
     *     major
     * @apiSuccess {Number}   count                   Amount of all program
     *     majors
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP 1/1 200 OK
     *     {
     *         programMajor: [{
     *             id: 10,
     *             name: "Математика и механика",
     *             popularity: 25
     *         }],
     *         count: 150
     *     }
     */
    actionGetPopular(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = actionContext.request.query.count ?
                Number(actionContext.request.query.count) :
                null;
            const programMajor = yield programMajor_1.service.getPopular(limit);
            const count = yield programMajor_1.service.getCount();
            return { programMajor, count };
        });
    }
    /**
     * @api {get} /api/programmajor/:programMajorId/advicedcourses
     *     Get adviced courses by program major
     *
     * @apiVersion 1.0.0
     * @apiName advicedCourses
     * @apiGroup Program Major
     *
     * @apiSuccess {Object[]} courses              Course object
     * @apiSuccess {Number}   courses.id           Id of course
     * @apiSuccess {String}   courses.name         Name of course
     * @apiSuccess {String}   courses.brandName    Name of brand of course
     * @apiSuccess {String}   courses.categoryName Name of category of course
     * @apiSuccess {String}   course.url           Url of course on
     *     courses.mel.fm site
     * @apiSuccess {String}   course.categoryUrl  Url of course category
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [{
     *         "id": 49,
     *         "name": "Английский язык для 7-11 класса",
     *         "brandName": "Unium",
     *         "categoryName": "Английский",
     *         "imageUrl": "/static/kursy-anglijskogo-jazyka.jpg",
     *         "url": "anglijskij/unium/anglijskij-jazyk-dlja-7-11-klassa",
     *         "categoryUrl": "anglijskij"
     *     }]
     */
    actionGetAdvicedCourses(actionContext, programMajorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const programMajor = yield programMajor_1.service.get(Number(programMajorId));
            const types = programMajor.courseTypes;
            const courses = yield courseService.getByTypes(types, 3);
            const [brands, categories] = yield Promise.all([
                courseBrandService.getByIds(courses.map(course => course.brandId)),
                courseCategoryService.getByIds(types.map(type => type.categoryId))
            ]);
            const fulldataCourses = courseView.joinCategory({
                courses, types, categories
            });
            const aliases = yield courseService.getAliases(fulldataCourses);
            const aliasedCourses = courseView.joinAliases(fulldataCourses, aliases);
            return courseView.listAdviced(aliasedCourses, brands, categories);
        });
    }
}
exports.ProgramMajorController = ProgramMajorController;
