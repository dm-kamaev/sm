import {LegacyController} from '../../../../api/components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {programService} from '../services/programService';
import {universityService} from '../services/universityService';
import {EntranceStatisticService} from '../services/EntranceStatisticService';
import {userService} from '../../user/services/user';
import {egeExamService} from '../services/egeExamService';
import {ProgramCommentService} from '../../comment/services/ProgramComment';
import {SimilarProgramsService} from '../services/SimilarProgramsService';
import {programMajorService} from '../services/programMajorService';
import {programMetaService} from '../services/programMetaService';
import {searchService} from '../services/searchService';
import {cityService} from '../services/cityService';
import {majorService} from '../services/majorService';

import {informationView} from '../views/informationView';
import {searchView} from '../views/searchView';

const soy = require('../../../components/soy');
const config = require('../../../config/config.json');
const entityType =
    require('../../../../api/modules/entity/enums/entityType.js');

class UniversityRenderController extends Controller {
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
        const user = userService.getUserFromRequest(actionContext.request);
        const searchParams = actionContext.request.query;

        const [
                resultsList,
                cities,
                egeExams,
                majors
            ] = await Promise.all([
                searchService.findByParams(searchParams),
                cityService.getAllSorted(),
                egeExamService.getExams(),
                majorService.getPopular()
        ]);

        const templateParams = searchView.render({
            data: {
                resultsList,
                cities,
                egeExams,
                majors,
                favorites: []
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
}

export {UniversityRenderController};
