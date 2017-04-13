import {LegacyController} from '../../../../api/components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {programService} from '../services/programService';
import {universityService} from '../services/universityService';

import {programMetaService} from '../services/programMetaService';
import {EntranceStatisticService} from '../services/EntranceStatisticService';
import {userService} from '../../user/services/user';
import {EgeExamService} from '../services/EgeExamService';
import {ProgramCommentService} from '../../comment/services/ProgramComment';
import {SimilarProgramsService} from '../services/SimilarProgramsService';

import {informationView} from '../views/informationView';

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
        const data = await Promise.all([
            await universityService.getIdByAlias(universityAlias),
            await programService.getIdByAlias(programAlias)
        ]);

        const universityId = data[0],
            programId = data[1];

        const entranceStatisticService =
            new EntranceStatisticService(programId);
        const similarProgramsService = new SimilarProgramsService(programId);
        const programCommentService = new ProgramCommentService(programId);
        const egeExamService = new EgeExamService(programId);

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
                egeExamService.getExams(),
                programMetaService.getById(programId),
                similarProgramsService.getSimilar()
        ]);

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
}

export {UniversityController};
