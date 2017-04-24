import {LegacyController} from '../../../../api/components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {programMajorService} from '../services/programMajorService';

export class ProgramMajorController extends Controller {
    /**
     * @api {get} /programmajor/search Search program major by name
     * @apiVersion 1.0.0
     * @apiName searchProgramMajor
     * @apiGroup Program Major
     *
     * @apiParam {String} name Part of a program major's name you search for.
     *
     * @apiSuccess {Object[]} -            Response body.
     * @apiSuccess {Number}   -.id         Id.
     * @apiSuccess {String}   -.name       Name.
     * @apiSuccess {Number}   -.popularity Popularity.
     * @apiSuccess {String}   -.createdAt  Created at.
     * @apiSuccess {String}   -.updatedAt  Updated at.
     */
    public async actionSearch(actionContext: any) {
        return programMajorService.findByName(actionContext.data.name);
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
     * @apiSuccess {Object[]} programMajor            Program major.
     * @apiSuccess {Number}   programMajor.id         Id of program major.
     * @apiSuccess {String}   programMajor.name       Name of program major.
     * @apiSuccess {Number}   programMajor.popularity Popularity of program
     *     major.
     * @apiSuccess {String}   programMajor.createdAt  Date of creation.
     * @apiSuccess {String}   programMajor.updatedAt  Date of last update.
     * @apiSuccess {Number}   count                   Amount of all program
     *     majors.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
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
        const count = Number(actionContext.data.count) || null;

        return await programMajorService.getPopular(count);
    }
}
