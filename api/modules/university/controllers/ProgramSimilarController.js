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
const programSimilar_1 = require("../services/programSimilar");
const program_1 = require("../services/program");
const program_2 = require("../views/program");
class ProgramSimilarController extends Controller {
    /**
     * @api {get} /api/program/:programId/similar Get similar programs
     * @apiVersion 1.0.0
     * @apiName getSimilarPrograms
     * @apiGroup Similar programs
     *
     * @apiSuccess {Object[]} similarPrograms      Found similar programs
     * @apiSuccess {Number}   similarPrograms.id   Id of similar program
     * @apiSuccess {String}   similarPrograms.name Name of similar program
     * @apiSuccess {String}   similarPrograms.url  Builded url of similar
     *     program
     *
     * @apiSuccessExample Success-Responce:
     *     HTTP 1/1 200 OK
     *     [{
     *         id: 10,
     *         name: "Прикладная математика",
     *         url: "vuz/mgu/specialnost/prikladnaya-matemtika"
     *     }]
     */
    actionGet(actionContext, programId) {
        return __awaiter(this, void 0, void 0, function* () {
            const similarPrograms = yield programSimilar_1.service.getByProgramId(Number(programId));
            const urls = yield program_1.service.getUrls(similarPrograms);
            return program_2.programView.renderSimilar(similarPrograms, urls);
        });
    }
}
exports.ProgramSimilarController = ProgramSimilarController;
