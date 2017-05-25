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
const programPage_1 = require("../services/programPage");
const ProgramAliasNotFound_1 = require("./errors/ProgramAliasNotFound");
const urlsService = require('../../entity/services/urls');
class ProgramPageController extends Controller {
    constructor() {
        super();
        this.errors = {
            ProgramAliasNotFoundException: ProgramAliasNotFound_1.ProgramAliasNotFound
        };
    }
    /**
     * @api {get} /api/program/:alias Get program id by alias
     * @apiVersion 1.0.0
     * @apiName getProgramByAlias
     * @apiGroup Program Page
     *
     * @apiParam (query) {String} universityAlias Alias of university.
     *
     * @apiSuccess {Object} Program
     * @apiSuccess {Number} Program.programId Id of found program.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         programId: 10
     *     }
     *
     * @apiError (404) ProgramNotFound Program not found by alias
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 404 Not Found
     *      [{
     *           "code": "ProgramNotFound",
     *           "message": "Program with alias %some-alias% not found"
     *      }]
     */
    actionGet(actionContext, alias) {
        return __awaiter(this, void 0, void 0, function* () {
            const universityAlias = actionContext.data.universityAlias;
            const sanitizedProgramAlias = urlsService.stringToURL(alias), sanitizedUniversityAlias = urlsService.stringToURL(universityAlias), program = yield programPage_1.service.getByAlias(sanitizedProgramAlias, sanitizedUniversityAlias), programId = program.id;
            return { programId };
        });
    }
}
exports.ProgramPageController = ProgramPageController;
