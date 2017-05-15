import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

const subjectService = require('../services/subject');

const entityRoutes = require('../../entity/enums/entityRoutes').routes;

class SubjectController extends Controller {
    /**
     * @api {get} /api/subject/search Search subject by name
     * @apiVersion 1.0.0
     * @apiName searchSubject
     * @apiGroup Subject
     *
     * @apiParam (query) {String} name Part of a subject's name you search for.
     *
     * @apiSuccess {Number} id          Id.
     * @apiSuccess {String} name        Name written in lower case.
     * @apiSuccess {String} displayName Usual name.
     * @apiSuccess {String} alias       English alias.
     * @apiSuccess {String} created_at  Created at.
     * @apiSuccess {String} updated_at  Updated at.
     */
    public async actionSearch(actionContext: any) {
        const entitySubdomain: string = actionContext.request.subdomains[0];
        let type: string | undefined;
        if (entitySubdomain === entityRoutes.UNIVERSITY.hostName) {
            type = entityRoutes.UNIVERSITY.route;
        }
        return subjectService.searchByName(
            actionContext.request.query.name,
            type
        );
    }
}

export {SubjectController};
