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
const universityPage_1 = require("../services/universityPage");
const universityPageView_1 = require("../views/universityPageView");
const UniversityAliasNotFound_1 = require("./errors/UniversityAliasNotFound");
const urlsService = require('../../entity/services/urls');
class UniversityPageController extends Controller {
    constructor() {
        super();
        this.errors = {
            UniversityAliasNotFoundException: UniversityAliasNotFound_1.UniversityAliasNotFound
        };
    }
    /**
     * @api {get} /api/university/alias/:alias Get university by alias
     * @apiVersion 1.0.0
     * @apiName getUniversityByAlias
     * @apiGroup University Page
     *
     * @apiSuccess {Object} University
     * @apiSuccess {Number} University.UniversityId Id of found university
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         UniversityId: 10
     *     }
     *
     * @apiError (404) UniversityNotFound University not found by alias
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 404 Not Found
     *      [{
     *           "code": "UniversityNotFound",
     *           "message": "University with alias = %some-alias% not found"
     *      }]
     */
    actionFindByAlias(actionContext, alias) {
        return __awaiter(this, void 0, void 0, function* () {
            const sanitizedAlias = urlsService.stringToURL(alias), universityPage = yield universityPage_1.service.getByAlias(sanitizedAlias);
            return universityPageView_1.universityPageView.renderUniversityId(universityPage);
        });
    }
}
exports.UniversityPageController = UniversityPageController;
