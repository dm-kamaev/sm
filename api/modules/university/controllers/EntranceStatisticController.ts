import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {
    service as entranceStatisticService
} from '../services/entranceStatistic';

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
    public async actionGet(actionContext: any, programId: string) {
        return entranceStatisticService.getLast(Number(programId));
    }
}

export {EntranceStatisticController};
