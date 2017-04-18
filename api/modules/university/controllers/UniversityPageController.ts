import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {service as universityPageService} from '../services/universityPage';
import {universityPageView} from '../views/universityPageView';

import {UniversityAliasNotFound} from './errors/UniversityAliasNotFound';

const urlsService = require('../../entity/services/urls');

class UniversityPageController extends Controller {
    constructor() {
        super();

        this.errors = {
            UniversityAliasNotFoundException: UniversityAliasNotFound
        };
    }

    /**
     * @api {get} /api/university/alias/:alias Get university by alias
     * @apiVersion 1.0.0
     * @apiName getUniversityByAlias
     * @apiGroup University Page
     *
     * @apiSuccess {Object} University
     * @apiSuccess {Number} University.UniversityId Id of found university
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         UniversityId: 10
     *     }
     *
     * @apiError (404) UniversityNotFound University not found by alias
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 404 Not Found
     *      [{
     *           "code": "UniversityNotFound",
     *           "message": "University with alias = %some-alias% not found"
     *      }]
     */
    public async actionFindByAlias(actionContext: any, alias: string) {
        const sanitizedAlias = urlsService.stringToURL(alias),
            universityPage = await universityPageService.getByAlias(
                sanitizedAlias);
        return universityPageView.renderUniversityId(universityPage);
    }
}

export {UniversityPageController};
