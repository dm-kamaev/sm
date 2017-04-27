import {
    ProgramInstance,
    ProgramAdmin,
    ProgramUrl
} from '../types/program';

import * as lodash from 'lodash';

class ProgramAdminView {
    public render(program: ProgramInstance, url: string): ProgramAdmin {
        const lastEntranceStatistic = lodash.maxBy(
            program.entranceStatistics,
            entranceStatistic => entranceStatistic.year
        );
        return {
            id: program.id,
            name: program.name,
            commentCount: program.commentGroup.programComments.length,
            passScore: lastEntranceStatistic &&
                lastEntranceStatistic.egePassScore,
            programUrl: url,
            updatedAt: program.updatedAt
        };
    }

    public renderList(
                programs: Array<ProgramInstance>, programUrls: Array<ProgramUrl>
    ): Array<ProgramAdmin> {
        return programs.map(program => {
            const url = programUrls
                .find(programUrl => programUrl.id === program.id)
                .url;
            return this.render(program, url);
        });
    }
}

export const programAdminView = new ProgramAdminView();
