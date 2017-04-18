import {LegacyController} from '../../../../api/components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {programService} from '../services/programService';
import {universityService} from '../services/universityService';

import {programMetaService} from '../services/programMetaService';
import {EntranceStatisticService} from '../services/EntranceStatisticService';
import {userService} from '../../user/services/user';
import {egeExamService} from '../services/egeExamService';
import {ProgramCommentService} from '../../comment/services/ProgramComment';
import {searchService} from '../services/searchService';
import {SimilarProgramsService} from '../services/SimilarProgramsService';
import {programMajorService} from '../services/programMajorService';

import {informationView} from '../views/informationView';
import {searchView} from '../views/searchView';

const soy = require('../../../components/soy');
const config = require('../../../config/config.json');
const entityType =
    require('../../../../api/modules/entity/enums/entityType.js');

class UniversityController extends Controller {
    constructor() {
        super();
    }

    public async actionGetInformation(
            actionContext: any,
            universityAlias: string,
            programAlias: string
    ) {
        const user = userService.getUserFromRequest(actionContext.request);
        const [
                universityId,
                programId
            ] = await Promise.all([
                universityService.getIdByAlias(universityAlias),
                programService.getIdByAlias(programAlias)
            ]);

        const entranceStatisticService =
            new EntranceStatisticService(programId);
        const similarProgramsService = new SimilarProgramsService(programId);
        const programCommentService = new ProgramCommentService(programId);

        const [
                program,
                university,
                entranceStatistic,
                comments,
                egeExams,
                pageMeta,
                similarPrograms
            ] = await Promise.all([
                programService.getById(programId),
                universityService.getById(universityId),
                entranceStatisticService.getLast(),
                programCommentService.getComments(),
                egeExamService.getProgramExams(programId),
                programMetaService.getById(programId),
                similarProgramsService.getSimilar()
        ]);
        const usefulCourses =
            await programMajorService.getAdvicedCourses(program.id);

        const userComment =
            programCommentService.getUserComment(user, comments);
        const users =
            await userService.getById(comments.map(comment => comment.userId));

        const templateParams = informationView.render({
            data: {
                program,
                university,
                entranceStatistic,
                comments,
                egeExams,
                pageMeta,
                userComment,
                users,
                similarPrograms,
                usefulCourses,
                favorites: []
            },
            config: config,
            requestData: {
                user: user,
                query: actionContext.request.query,
                csrf: actionContext.request.csrfToken()
            },
        });


        return soy.render(
            'sm.lUniversity.Template.university', {
                params: templateParams
            }
        );
    }

    public async actionGetSearch(actionContext: any) {
        const user = userService.getUserFromRequest(actionContext.request),
            searchParams = searchView.initSearchParams(
                actionContext.request.query
            );

        const templateParams = searchView.render({
            data: {
                favorites: [],
                searchParams: searchParams
            },
            config: config,
            requestData: {
                user: user,
                query: actionContext.request.query,
                csrf: actionContext.request.csrfToken()
            }
        });

        return soy.render(
            'sm.lSearch.TemplateUniversity.search', {
                params: templateParams
            }
        );
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
        return searchService.findByName(params.name);
    }
}

export {UniversityController};
