import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {service as examService} from '../services/programEgeExam';

import {ProgramEgeExamAttribute} from '../models/ProgramEgeExam';

import {ExamNotFound} from './errors/ExamNotFound';

class ExamAdminController extends Controller {
    constructor() {
        super();

        this.errors = {
            ExamNotFoundException: ExamNotFound
        }
    }

    /**
     * @api {get} /api/admin/program/:programId/exam Get all program's exams
     * @apiVersion 1.0.0
     * @apiName getAllProgramExam
     * @apiGroup Admin Program Exam
     *
     * @apiSuccess {Object[]} -             Response body.
     * @apiSuccess {Number}   -.id          Id.
     * @apiSuccess {Number}   -.subjectId   Subject's id.
     * @apiSuccess {String}   -.subjectName Subject's name.
     * @apiSuccess {Number}   -.programId   Program's id.
     * @apiSuccess {Boolean}  -.isMain      Is that exam main.
     * @apiSuccess {String}   -.createdAt   Created at.
     * @apiSuccess {String}   -.updatedAt   Updated at.
     */
    public async actionList(actionContext: any, programId: string) {
        return examService.getByProgramId(Number(programId));
    }

    /**
     * @api {get} /api/admin/program/:programId/exam/:id Get program's exam
     * @apiVersion 1.0.0
     * @apiName getProgramExam
     * @apiGroup Admin Program Exam
     *
     * @apiSuccess {Number}  id          Id.
     * @apiSuccess {Number}  subjectId   Subject's id.
     * @apiSuccess {String}  subjectName Subject's name.
     * @apiSuccess {Number}  programId   Program's id.
     * @apiSuccess {Boolean} isMain      Is that exam main.
     * @apiSuccess {String}  createdAt   Created at.
     * @apiSuccess {String}  updatedAt   Updated at.
     */
    public async actionGet(actionContext: any, programId: string, id: string) {
        return examService.get(Number(id));
    }

    /**
     * @api {post} /api/admin/program/:programId/exam Create program's exam
     * @apiVersion 1.0.0
     * @apiName createProgramExam
     * @apiGroup Admin Program Exam
     *
     * @apiParam {Number}  subjectId Subject's id.
     * @apiParam {Boolean} isMain    Is that exam main.
     *
     * @apiSuccess {Number}  id          Id.
     * @apiSuccess {Number}  subjectId   Subject's id.
     * @apiSuccess {Number}  programId   Program's id.
     * @apiSuccess {Boolean} isMain      Is that exam main.
     * @apiSuccess {String}  createdAt   Created at.
     * @apiSuccess {String}  updatedAt   Updated at.
     * @apiSuccess {String}  created_at  Created at.
     * @apiSuccess {String}  updated_at  Updated at.
     */
    public async actionCreate(actionContext: any, programId: string) {
        const body = actionContext.request.body;
        const data: ProgramEgeExamAttribute = {
            programId: Number(programId),
            subjectId: body.subjectId,
            isMain: body.isMain
        };
        return examService.create(data);
    }

    /**
    * @api {put} /api/admin/program/:programId/exam/:id update program's exam
    * @apiVersion 1.0.0
    * @apiName updateProgramExam
    * @apiGroup Admin Program Exam
    *
    * @apiParam {Number}  subjectId Subject's id.
    * @apiParam {Boolean} isMain    Is that exam main.
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
            actionContext: any, programId: string, id: string) {
        const body = actionContext.request.body;
        const data: ProgramEgeExamAttribute = {
            subjectId: body.subjectId,
            isMain: body.isMain
        };
        return examService.update(Number(id), data);
    }

    /**
     * @api {delete} /api/admin/program/:programId/exam/:id
     *     Delete program's exam
     * @apiVersion 1.0.0
     * @apiName deleteProgramExam
     * @apiGroup Admin Program Exam
     *
     * @apiSuccess {Number}  - Number of deleted rows (Should be always 1).
     *
     * @apiSuccessExample {json} Example response:
     *     HTTP/1.1 200 OK
     *     1
     */
    public async actionDelete(
            actionContext: any, programId: string, id: string) {
        return examService.delete(Number(id));
    }
}

export {ExamAdminController};
