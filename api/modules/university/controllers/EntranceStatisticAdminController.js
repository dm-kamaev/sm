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
class EntranceStatisticAdminController extends Controller {
    /**
     * @api {get} /api/admin/program/:programId/statistic
     *     Get all program's statistics
     * @apiVersion 1.0.0
     * @apiName getAllProgramStatistic
     * @apiGroup Admin Program Statistic
     *
     * @apiSuccess {Object[]} -                  Response body.
     * @apiSuccess {Number}   -.id               Id.
     * @apiSuccess {Number}   -.programId        Program's id.
     * @apiSuccess {Number}   -.year             Year of statistic.
     * @apiSuccess {Number}   -.competition
     *     Count of people per budget place.
     * @apiSuccess {Number}   -.budgetPlaces     Number of budget places.
     * @apiSuccess {Number}   -.commercialPlaces Number of commercial places.
     * @apiSuccess {Number}   -.cost             Cost of program.
     * @apiSuccess {Boolean}  -.discount         Is discount available.
     * @apiSuccess {Number}   -.egePassScore     Required ege to pass.
     * @apiSuccess {String}   -.createdAt        Created at.
     * @apiSuccess {String}   -.updatedAt        Updated at.
     */
    actionList(actionContext, programId) {
        return __awaiter(this, void 0, void 0, function* () {
            return entranceStatistic_1.service.getByProgramId(Number(programId));
        });
    }
    /**
     * @api {get} /api/admin/program/:programId/statistic/:id
     *     Get program's statistic
     * @apiVersion 1.0.0
     * @apiName getProgramStatistic
     * @apiGroup Admin Program Statistic
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
    actionGet(actionContext, programId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return entranceStatistic_1.service.get(Number(id));
        });
    }
    /**
     * @api {post} /api/admin/program/:programId/statistic
     *     Create program's statistic
     * @apiVersion 1.0.0
     * @apiName createProgramStatistic
     * @apiGroup Admin Program Statistic
     *
     * @apiParam {Number}  year             Year of statistic.
     * @apiParam {Number}  competition      Count of people per budget place.
     * @apiParam {Number}  budgetPlaces     Number of budget places.
     * @apiParam {Number}  commercialPlaces Number of commercial places.
     * @apiParam {Number}  cost             Cost of program.
     * @apiParam {Boolean} discount         Is discount available.
     * @apiParam {Number}  egePassScore     Required ege to pass.
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
     * @apiSuccess {String}  created_at       Created at.
     * @apiSuccess {String}  updated_at       Updated at.
     */
    actionCreate(actionContext, programId) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = actionContext.request.body;
            const data = {
                programId: Number(programId),
                year: body.year,
                competition: body.competition,
                budgetPlaces: body.budgetPlaces,
                commercialPlaces: body.commercialPlaces,
                cost: body.cost,
                discount: body.discount,
                egePassScore: body.egePassScore
            };
            return entranceStatistic_1.service.create(data);
        });
    }
    /**
     * @api {put} /api/admin/program/:programId/statistic/:id
     *     Update program's statistic
     * @apiVersion 1.0.0
     * @apiName updateProgramStatistic
     * @apiGroup Admin Program Statistic
     *
     * @apiParam {Number}  year             Year of statistic.
     * @apiParam {Number}  competition      Count of people per budget place.
     * @apiParam {Number}  budgetPlaces     Number of budget places.
     * @apiParam {Number}  commercialPlaces Number of commercial places.
     * @apiParam {Number}  cost             Cost of program.
     * @apiParam {Boolean} discount         Is discount available.
     * @apiParam {Number}  egePassScore     Required ege to pass.
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
                programId: Number(programId),
                year: body.year,
                competition: body.competition,
                budgetPlaces: body.budgetPlaces,
                commercialPlaces: body.commercialPlaces,
                cost: body.cost,
                discount: body.discount,
                egePassScore: body.egePassScore
            };
            return entranceStatistic_1.service.update(Number(id), data);
        });
    }
    /**
     * @api {delete} /api/admin/program/:programId/statistic/:id
     *     Delete program's statistic
     * @apiVersion 1.0.0
     * @apiName deleteProgramStatistic
     * @apiGroup Admin Program Statistic
     *
     * @apiSuccess {Number}  - Number of deleted rows (Should be always 1).
     *
     * @apiSuccessExample {json} Example response:
     *     HTTP/1.1 200 OK
     *     1
     */
    actionDelete(actionContext, programId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return entranceStatistic_1.service.delete(Number(id));
        });
    }
}
exports.EntranceStatisticAdminController = EntranceStatisticAdminController;
