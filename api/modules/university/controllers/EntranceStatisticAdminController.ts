import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {
    service as entranceStatisticService
} from '../services/entranceStatistic';

import {EntranceStatisticAttribute} from '../models/EntranceStatistic';

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
    public async actionList(actionContext: any, programId: string) {
        return entranceStatisticService.getByProgramId(Number(programId));
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
    public async actionGet(actionContext: any, programId: string, id: string) {
        return entranceStatisticService.get(Number(id));
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
    public async actionCreate(actionContext: any, programId: string) {
        const body = actionContext.request.body;
        const data: EntranceStatisticAttribute = {
            programId: Number(programId),
            year: body.year,
            competition: body.competition,
            budgetPlaces: body.budgetPlaces,
            commercialPlaces: body.commercialPlaces,
            cost: body.cost,
            discount: body.discount,
            egePassScore: body.egePassScore
        };
        return entranceStatisticService.create(data);
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
    public async actionUpdate(
            actionContext: any, programId: string, id: string) {
        const body = actionContext.request.body;
        const data: EntranceStatisticAttribute = {
            programId: Number(programId),
            year: body.year,
            competition: body.competition,
            budgetPlaces: body.budgetPlaces,
            commercialPlaces: body.commercialPlaces,
            cost: body.cost,
            discount: body.discount,
            egePassScore: body.egePassScore
        };
        return entranceStatisticService.update(Number(id), data);
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
    public async actionDelete(
            actionContext: any, programId: string, id: string) {
        return entranceStatisticService.delete(Number(id));
    }
}

export {EntranceStatisticAdminController};
