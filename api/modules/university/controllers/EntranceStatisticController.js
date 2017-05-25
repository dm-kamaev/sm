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
const entranceStatistic_1 = require("../services/entranceStatistic");
class EntranceStatisticController extends Controller {
    /**
     * @api {get} /api/program/:programId/statistic/last
     *     Get program's statistic
     * @apiVersion 1.0.0
     * @apiName getProgramStatistic
     * @apiGroup Program Statistic
     *
     * @apiSuccess {Number}  id               Id.
     * @apiSuccess {Number}  programId        Program's id.
     * @apiSuccess {Number}  year             Year of statistic.
     * @apiSuccess {Number}  competition      Count of people per budget place.
     * @apiSuccess {Number}  budgetPlaces     Number of budget places.
     * @apiSuccess {Number}  commercialPlaces Number of commercial places.
     * @apiSuccess {Number}  cost             Cost of program.
     * @apiSuccess {Boolean} discount         Is discount available.
     * @apiSuccess {Number}  egePassScore     Required ege to pass.
     * @apiSuccess {String}  createdAt        Created at.
     * @apiSuccess {String}  updatedAt        Updated at.
     */
    actionGet(actionContext, programId) {
        return __awaiter(this, void 0, void 0, function* () {
            return entranceStatistic_1.service.getLast(Number(programId));
        });
    }
}
exports.EntranceStatisticController = EntranceStatisticController;
