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
const programEgeExam_1 = require("../services/programEgeExam");
const ExamNotFound_1 = require("./errors/ExamNotFound");
class ExamAdminController extends Controller {
    constructor() {
        super();
        this.errors = {
            ExamNotFoundException: ExamNotFound_1.ExamNotFound
        };
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
    actionList(actionContext, programId) {
        return __awaiter(this, void 0, void 0, function* () {
            return programEgeExam_1.service.getByProgramId(Number(programId));
        });
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
     *
     * @apiError (404) ExamNotFound Exam with given Id not found.
     */
    actionGet(actionContext, programId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return programEgeExam_1.service.get(Number(id));
        });
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
    actionCreate(actionContext, programId) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = actionContext.request.body;
            const data = {
                programId: Number(programId),
                subjectId: body.subjectId,
                isMain: body.isMain
            };
            return programEgeExam_1.service.create(data);
        });
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
    actionUpdate(actionContext, programId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = actionContext.request.body;
            const data = {
                subjectId: body.subjectId,
                isMain: body.isMain
            };
            return programEgeExam_1.service.update(Number(id), data);
        });
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
    actionDelete(actionContext, programId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return programEgeExam_1.service.delete(Number(id));
        });
    }
}
exports.ExamAdminController = ExamAdminController;
