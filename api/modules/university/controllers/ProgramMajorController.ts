import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {service as programMajorService} from '../services/programMajor';
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
     * @apiParam {string} name Part of a program major's name you search for.
     *
     * @apiSuccess {Number} id         Id.
     * @apiSuccess {String} name       Name.
     * @apiSuccess {String} createdAt  Created at.
     * @apiSuccess {String} updatedAt  Updated at.
     */
    public async actionSearch(actionContext: any) {
        return programMajorService.search(actionContext.request.query.name);
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
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [{
     *         "id": 49,
     *         "name": "Английский язык для 7-11 класса",
     *         "brandName": "Unium",
     *         "categoryName": "Английский",
     *         "imageUrl": "/static/kursy-anglijskogo-jazyka.jpg",
     *         "url": "anglijskij/unium/anglijskij-jazyk-dlja-7-11-klassa"
     *     }]
     */
    public async actionGetAdvicedCourses(
            actionContext: any, programMajorId: string) {
        const programMajor =
            await programMajorService.get(Number(programMajorId));
        const types = programMajor.courseTypes;
        const courses =
            await courseService.getByTypes(types, 3);

        const [
                brands,
                categories
            ] = await Promise.all([
                courseBrandService.getByIds(courses.map(
                    course => course.brandId)),
                courseCategoryService.getByIds(types.map(
                    type => type.categoryId))
            ]);
        const fulldataCourses = courseView.joinCategory({
            courses, types, categories
        });

        const aliases = await courseService.getAliases(fulldataCourses);
        const aliasedCourses = courseView.joinAliases(fulldataCourses, aliases);

        return courseView.listAdviced(
            aliasedCourses, brands, categories
        );
    }
}

export {ProgramMajorController};
