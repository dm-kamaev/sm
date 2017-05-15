import {LegacyController} from '../../../../api/components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {searchService} from '../services/searchService';
import {searchView} from '../views/searchView';
import {ProgramNameIsShorter} from './errors/ProgramNameIsShorter';

export class UniversityController extends Controller {
    constructor() {
        super();

        this.errors = {
            ProgramNameIsShorterException: ProgramNameIsShorter
        };
    }

    /**
     * @api {get} /university/suggest
     * @apiVersion 1.0.0
     * @apiName Suggest search
     * @apiGroup Search
     *
     * @apiParam (query) {string} name Part of program's name to search for
     *
     * @apiSuccess {Object[]} programs            Array of found programs.
     * @apiSuccess {Number}   programs.id         Program's id.
     * @apiSuccess {String}   programs.name       Program's name.
     * @apiSuccess {String}   programs.alias      Program's alias.
     * @apiSuccess {Number[]} programs.score      Array of scores.
     * @apiSuccess {Number}   programs.totalScore Programs's total score.
     */
    public async actionSuggestSearch(actionContext: any) {
        const params = actionContext.data;
        const foundData = await searchService.findByName(params.searchString);
        return searchView.suggestList(foundData);
    }
}
