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
const programMajorService_1 = require("../services/programMajorService");
const programMajorView_1 = require("../views/programMajorView");
class ProgramMajorController extends Controller {
    /**
     * @api {get} /programmajor/search Search program major by name
     * @apiVersion 1.0.0
     * @apiName searchProgramMajor
     * @apiGroup Program Major
     *
     * @apiParam {String} name Part of a program major's name you search for.
     *
     * @apiSuccess {Object[]} -       Response body.
     * @apiSuccess {Number}   -.value Id.
     * @apiSuccess {String}   -.label Name.
     */
    actionSearch(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundProgramMajors = yield programMajorService_1.programMajorService.findByName(actionContext.data.name);
            return programMajorView_1.programMajorView.filtersListRender(foundProgramMajors);
        });
    }
    /**
     * @api {get} /programmajor/popular Get popular program majors
     * @apiVersion 1.0.0
     * @apiName popularProgramMajor
     * @apiGroup Program Major
     *
     * @apiParam (query) {Number} count Count of popular program major,
     *     which you want to retrieve.
     *
     * @apiSuccess {Object[]} programMajor       Program major.
     * @apiSuccess {Number}   programMajor.value Id of program major.
     * @apiSuccess {String}   programMajor.label Name of program major.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     [{
     *         value: 10,
     *         label: "Математика и механика"
     *     }]
     */
    actionGetPopular(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = Number(actionContext.data.count) || null;
            const popularMajors = yield programMajorService_1.programMajorService.getPopular(count);
            return programMajorView_1.programMajorView.filtersListRender(popularMajors.programMajor);
        });
    }
}
exports.ProgramMajorController = ProgramMajorController;
