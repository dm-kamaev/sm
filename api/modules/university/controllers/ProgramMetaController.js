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
const programMeta_1 = require("../services/programMeta");
const ProgramMetaNotFound_1 = require("./errors/ProgramMetaNotFound");
class ProgramMetaController extends Controller {
    constructor() {
        super();
        this.errors = {
            ProgramMetaNotFoundException: ProgramMetaNotFound_1.ProgramMetaNotFound
        };
    }
    /**
     * @api {get} /api/program/:programId/pagemeta
     *     Get program meta by program id
     * @apiVersion 1.0.0
     * @apiName getProgramMeta
     * @apiGroup Program Meta
     *
     * @apiParam {Number} programId             Program's id
     *
     * @apiSuccess {Number} id                    Id.
     * @apiSuccess {Number} programId             Program's id.
     * @apiSuccess {String} keywords              Keywords
     * @apiSuccess {String} tabTitle              h1.
     * @apiSuccess {String} seoDescription        Meta description.
     * @apiSuccess {String} openGraphDescription  Open graph description.
     * @apiSuccess {String} createdAt             Created at.
     * @apiSuccess {String} updatedAt             Updated at.
     *
     * @apiSuccessExample {json} Success-Response:
     *    {
     *        "id": 5,
     *        "programId": 12,
     *        "keywords": "test_keywords",
     *        "tabTitle": "test_title",
     *        "seoDescription": "test_description",
     *        "openGraphDescription": "open_graph_description",
     *        "createdAt": "2017-03-28T07:27:40.260Z",
     *        "updatedAt": "2017-03-28T07:27:40.260Z"
     *    }
     *
     * @apiError (404) ProgramMetaNotFound
     *     Program meta with program id = programId not found.
     */
    actionGet(actionContext, programId) {
        return __awaiter(this, void 0, void 0, function* () {
            return programMeta_1.programMetaService.getByProgramId(Number(programId));
        });
    }
}
exports.ProgramMetaController = ProgramMetaController;
