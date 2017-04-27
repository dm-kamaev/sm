import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {service as programSimilarService} from '../services/programSimilar';
import {service as programService} from '../services/program';

import {programView} from '../views/program';

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
    public async actionGet(actionContext: any, programId: number) {
        const similarPrograms =
            await programSimilarService.getByProgramId(Number(programId));
        const urls = await programService.getUrls(similarPrograms);

        return programView.renderSimilar(similarPrograms, urls);
    }
}

export {ProgramSimilarController};
