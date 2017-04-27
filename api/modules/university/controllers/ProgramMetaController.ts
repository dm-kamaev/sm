import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {programMetaService} from '../services/programMeta';

import {ProgramMetaNotFound} from './errors/ProgramMetaNotFound';

class ProgramMetaController extends Controller {
    constructor() {
        super();

        this.errors = {
            ProgramMetaNotFoundException: ProgramMetaNotFound
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
    public async actionGet(actionContext: any, programId: string) {
        return programMetaService.getByProgramId(Number(programId));
    }
}

export {ProgramMetaController};
