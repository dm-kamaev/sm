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
const searchService_1 = require("../services/searchService");
const searchView_1 = require("../views/searchView");
const ProgramNameIsShorter_1 = require("./errors/ProgramNameIsShorter");
class UniversityController extends Controller {
    constructor() {
        super();
        this.errors = {
            ProgramNameIsShorterException: ProgramNameIsShorter_1.ProgramNameIsShorter
        };
    }
    /**
     * @api {get} /university/suggest
     * @apiVersion 1.0.0
     * @apiName Suggest search
     * @apiGroup Search
     *
     * @apiParam (query) {string} name Part of program's name to search for
     *
     * @apiSuccess {Object[]} programs            Array of found programs.
     * @apiSuccess {Number}   programs.id         Program's id.
     * @apiSuccess {String}   programs.name       Program's name.
     * @apiSuccess {String}   programs.alias      Program's alias.
     * @apiSuccess {Number[]} programs.score      Array of scores.
     * @apiSuccess {Number}   programs.totalScore Programs's total score.
     */
    actionSuggestSearch(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = actionContext.data;
            const foundData = yield searchService_1.searchService.findByName(params.searchString);
            return searchView_1.searchView.suggestList(foundData);
        });
    }
}
exports.UniversityController = UniversityController;
