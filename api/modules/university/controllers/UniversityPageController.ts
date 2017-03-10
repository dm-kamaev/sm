import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {service as universityPageService} from '../services/universityPage';
import {universityPageView} from '../views/universityPageView';

import {UniversityAliasNotFound} from './errors/UniversityAliasNotFound';

class UniversityPageController extends Controller {
    constructor() {
        super();

        this.errors = {
            UniversityAliasNotFoundException: UniversityAliasNotFound
        };
    }

    /**
     * @api {get} /api/university/:alias Get university
     * @apiVersion 1.0.0
     * @apiName getUniversityByAlias
     * @apiGroup University
     *
     * @apiSuccess {Number} universityId University's id with given alias.
     */
    public async actionFindByAlias(actionContext: any, alias: string) {
        const universityPage = await universityPageService.getByAlias(alias);
        return universityPageView.renderUniversityId(universityPage);
    }
}

export {UniversityPageController};
