import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {service as programMajorService} from '../services/programMajor';

class ProgramMajorController extends Controller {
    /**
     * @api {get} /api/programmajor/search Search program major by name
     * @apiVersion 1.0.0
     * @apiName searchProgramMajor
     * @apiGroup Program Major
     *
     * @apiParam {string} name Part of a program major's name you search for.
     *
     * @apiSuccess {Number} id         Id.
     * @apiSuccess {String} name       Name.
     * @apiSuccess {String} createdAt  Created at.
     * @apiSuccess {String} updatedAt  Updated at.
     */
    public async actionSearch(actionContext: any) {
        return programMajorService.search(actionContext.request.query.name);
    }
}

export {ProgramMajorController};
