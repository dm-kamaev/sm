import {LegacyController} from '../../../../api/components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {programService} from '../services/programService';
import {universityService} from '../services/universityService';
import {EntranceStatisticService} from '../services/EntranceStatisticService';
import {userService} from '../../user/services/user';
import {egeExamService} from '../services/egeExamService';
import {ProgramCommentService} from '../../comment/services/ProgramComment';

import {informationView} from '../views/informationView';
import {searchView} from '../views/searchView';

const soy = require('../../../components/soy');
const config = require('../../../config/config.json');
const entityType =
    require('../../../../api/modules/entity/enums/entityType.js');

class UniversityRenderController extends Controller {
    public async actionGetInformation(
            actionContext: any,
            universityAlias: string,
            programAlias: string
    ) {
        const user = userService.getUserFromRequest(actionContext.request);
        const data = await Promise.all([
            await universityService.getIdByAlias(universityAlias),
            await programService.getIdByAlias(programAlias)
        ]);

        const universityId = data[0],
            programId = data[1];

        const entranceStatisticService =
            new EntranceStatisticService(programId),
            programCommentService = new ProgramCommentService(programId);

        const programData  = await Promise.all([
            programService.getById(programId),
            universityService.getById(universityId),
            entranceStatisticService.getLast(),
            programCommentService.getComments(),
            egeExamService.getProgramExams(programId)
        ]);
        const program = programData[0],
            university = programData[1],
            entranceStatistic = programData[2],
            comments = programData[3],
            egeExams = programData[4],
            userComment = programCommentService.getUserComment(user, comments);
        const users =
            await userService.getById(comments.map(comment => comment.userId));

        const templateParams = informationView.render({
            data: {
                program,
                university,
                entranceStatistic,
                comments,
                egeExams,
                userComment,
                users,
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
}

export {UniversityRenderController};
