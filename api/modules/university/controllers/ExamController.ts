import {LegacyController} from '../../../components/interface';

import {service as programEgeExamService} from '../services/programEgeExam';

const Controller: LegacyController = require('nodules/controller').Controller;

class ExamController extends Controller {
    constructor() {
        super();

        this.errors = {};
    }

    /**
     * @api {get} /api/program/:programId/exam Get all ege exams by program
     * @apiVersion 1.0.0
     * @apiName getAllProgramExam
     * @apiGroup ProgramExam
     *
     * @apiSuccess {Object[]} egeExams             Response body.
     * @apiSuccess {Number}   egeExams.id          Id.
     * @apiSuccess {Number}   egeExams.subjectId   Subject's id.
     * @apiSuccess {String}   egeExams.subjectName Subject's name.
     * @apiSuccess {Number}   egeExams.programId   Program's id.
     * @apiSuccess {Boolean}  egeExams.isMain      Is that exam main.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [{
     *         "id": 10,
     *         "subjectId": "1",
     *         subjectName: "Математика",
     *         "programId": 5,
     *         "isMain"" true
     *     }]
     */
    public async actionList(actionContext: any, programId: string) {
        return await programEgeExamService.getByProgramId(+programId);
    }
}

export {ExamController};
