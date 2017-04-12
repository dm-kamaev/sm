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
     * @apiParam {String} name Part of a program major's name you search for.
     *
     * @apiSuccess {Number} id         Id.
     * @apiSuccess {String} name       Name.
     * @apiSuccess {String} createdAt  Created at.
     * @apiSuccess {String} updatedAt  Updated at.
     */
    public async actionSearch(actionContext: any) {
        return programMajorService.search(actionContext.request.query.name);
    }

    /**
     * @api {get} /api/programmajor/popular Get popular program majors
     * @apiVersion 1.0.0
     * @apiName popularProgramMajor
     * @apiGroup Program Major
     *
     * @apiParam {Number} count Count of popular program major, which you want
     * to retrieve
     *
     * @apiSuccess {Object[]} programMajor            Program major
     * @apiSuccess {Number}   programMajor.id         Id of program major
     * @apiSuccess {String}   programMajor.name       Name of program major
     * @apiSuccess {Number}   programMajor.popularity Popularity of program
     *     major
     * @apiSuccess {Number}   count                   Amount of all program
     *     majors
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP 1/1 200 OK
     *     {
     *         programMajor: [{
     *             id: 10,
     *             name: "Математика и механика",
     *             popularity: 25
     *         }],
     *         count: 150
     *     }
     */
    public async actionGetPopular(actionContext: any) {
        const limit = actionContext.request.query.count ?
            Number(actionContext.request.query.count) :
            null;

        const programMajor = await programMajorService.getPopular(limit);
        const count = await programMajorService.getCount();

        return {programMajor, count};
    }
}

export {ProgramMajorController};
