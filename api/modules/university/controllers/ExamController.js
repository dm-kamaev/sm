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
const programEgeExam_1 = require("../services/programEgeExam");
const Controller = require('nodules/controller').Controller;
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
    actionList(actionContext, programId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield programEgeExam_1.service.getByProgramId(+programId);
        });
    }
}
exports.ExamController = ExamController;
