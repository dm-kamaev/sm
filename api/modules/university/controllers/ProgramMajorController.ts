import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {service as programMajorService} from '../services/programMajor';
const courseService = require('../../course/services/course');

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
     * @apiSuccess {Object[]} courses
     * @apiSuccess {Number}   courses.id
     * @apiSuccess {String}   courses.name
     * @apiSuccess {Number}   courses.brandId
     * @apiSuccess {Number}   courses.type
     * @apiSuccess {String}   courses.description
     * @apiSuccess {String}   courses.fullDescription
     * @apiSuccess {String}   courses.about
     * @apiSuccess {String}   courses.entranceExam
     * @apiSuccess {String}   courses.learningOutcome
     * @apiSuccess {String}   courses.leadType
     * @apiSuccess {Number[]} courses.score
     * @apiSuccess {Number}   courses.scoreCount
     * @apiSuccess {Number}   courses.totalScore
     * @apiSuccess {String}   courses.imageUrl
     * @apiSuccess {String}   courses.embedId
     * @apiSuccess {Number}   courses.ctr
     * @apiSuccess {Object}   courses.courseType     Course type of course
     * @apiSuccess {Number}   course.courseType.id   Id of course type
     * @apiSuccess {String}   course.courseType.name Name of course type
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [{
     *         "id": 49,
     *         "name": "Английский язык для 7-11 класса",
     *         "brandId": 13,
     *         "type": 4,
     *         "description": "Комплексное обучение для развития письменной",
     *         "fullDescription": "В первые два года изучения английского",
     *         "about": null,
     *         "entranceExam": null,
     *         "learningOutcome": "Понимать и поддерживать разговор.",
     *         "leadType": null,
     *         "score": null,
     *         "scoreCount": null,
     *         "totalScore": 0,
     *         "imageUrl": "/static/images/kursy-anglijskogo-jazyka.jpg",
     *         "embedId": "",
     *         "ctr": 5.37634408602151,
     *         courseType":{
     *             "id": 4,
     *             "name": "Английский язык"
     *         }
     *     }]
     */
    public async actionGetAdvicedCourses(
            actionContext: any, programMajorId: string) {
        const programMajor =
            await programMajorService.get(Number(programMajorId));

        return courseService.getByTypes(programMajor.courseTypes, 3);
    }
}

export {ProgramMajorController};
