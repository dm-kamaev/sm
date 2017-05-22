import {LegacyController} from '../../../../api/components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {programMajorService} from '../services/programMajorService';
import {programMajorView} from '../views/programMajorView';

export class ProgramMajorController extends Controller {
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
    public async actionSearch(actionContext: any) {
        const foundProgramMajors =
            await programMajorService.findByName(actionContext.data.name);
        return programMajorView.filtersListRender(foundProgramMajors);
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
    public async actionGetPopular(actionContext: any) {
        const count = Number(actionContext.data.count) || null;

        const popularMajors = await programMajorService.getPopular(count);
        return programMajorView.filtersListRender(popularMajors.programMajor);
    }
}
