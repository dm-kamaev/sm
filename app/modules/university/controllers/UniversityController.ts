import {LegacyController} from '../../../../api/components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {programService} from '../services/programService';
import {universityService} from '../services/universityService';
import {EntranceStatisticService} from '../services/EntranceStatisticService';
import {userService} from '../../user/services/user';
import {ProgramCommentService} from '../services/ProgramComment';

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
            new EntranceStatisticService(programId),
            programCommentService = new ProgramCommentService(programId);

        const programData  = await Promise.all([
            programService.getById(programId),
            universityService.getById(universityId),
            entranceStatisticService.getLast(),
            programCommentService.getComments()
        ]);
        const program = programData[0],
            university = programData[1],
            entranceStatistic = programData[2],
            comments = programData[3],
            userComment = programCommentService.getUserComment(user, comments);
        const users =
            await userService.getById(comments.map(comment => comment.userId));

        return JSON.stringify({
            program,
            university,
            entranceStatistic,
            comments,
            userComment,
            users
        }, null, 4);
    }
}

export {UniversityController};
