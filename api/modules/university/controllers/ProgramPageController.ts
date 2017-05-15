import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {service as programPageService} from '../services/programPage';

import {ProgramAliasNotFound} from './errors/ProgramAliasNotFound';

const urlsService = require('../../entity/services/urls');

class ProgramPageController extends Controller {
    constructor() {
        super();

        this.errors = {
            ProgramAliasNotFoundException: ProgramAliasNotFound
        };
    }


    /**
     * @api {get} /api/program/:alias Get program id by alias
     * @apiVersion 1.0.0
     * @apiName getProgramByAlias
     * @apiGroup Program Page
     *
     * @apiParam (query) {String} universityAlias Alias of university.
     *
     * @apiSuccess {Object} Program
     * @apiSuccess {Number} Program.programId Id of found program.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         programId: 10
     *     }
     *
     * @apiError (404) ProgramNotFound Program not found by alias
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 404 Not Found
     *      [{
     *           "code": "ProgramNotFound",
     *           "message": "Program with alias %some-alias% not found"
     *      }]
     */
    public async actionGet(actionContext: any, alias: string) {
        const universityAlias: string = actionContext.data.universityAlias;
        const sanitizedProgramAlias: string = urlsService.stringToURL(alias),
            sanitizedUniversityAlias: string =
                urlsService.stringToURL(universityAlias),
            program = await programPageService.getByAlias(
                sanitizedProgramAlias,
                sanitizedUniversityAlias
            ),
            programId = program.id;

        return {programId};
    }
}

export {ProgramPageController};
