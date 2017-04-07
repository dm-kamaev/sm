import {
    ProgramInstance,
    ProgramSuggest,
} from
'../types/program';

import {PageIntstance as PageInstance} from '../../entity/types/page';


class ProgramView {
    public suggestSearch(programs: ProgramInstance[]): ProgramSuggest[] {
        return programs.map((program: ProgramInstance): ProgramSuggest => {
            const isNotExistAlias: boolean
                = !program.pages || !program.pages[0];
            if (isNotExistAlias) {
                return null;
            }
            const page: PageInstance = program.pages[0];
            return {
                id: program.id,
                name: program.name || '',
                alias: page.alias || '',
                score: program.score || [],
                totalScore: program.totalScore || 0,
            };
        });
    }
}

export const programView = new ProgramView();