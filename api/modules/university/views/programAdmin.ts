import {
    ProgramInstance,
    ProgramAdmin
} from '../types/program';

import * as lodash from 'lodash';

class ProgramAdminView {
    public render(program: ProgramInstance): ProgramAdmin {
        const lastEntranceStatistic = lodash.maxBy(
            program.entranceStatistics,
            entranceStatistic => entranceStatistic.year
        );
        return {
            id: program.id,
            name: program.name,
            commentCount: program.commentGroup.universityComments.length,
            passScore: lastEntranceStatistic &&
                lastEntranceStatistic.egePassScore,
            updatedAt: program.updatedAt
        };
    }

    public renderList(programs: Array<ProgramInstance>): Array<ProgramAdmin> {
        return programs.map(this.render);
    }
}

export const programAdminView = new ProgramAdminView();
