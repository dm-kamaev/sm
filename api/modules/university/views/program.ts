/**
 * @fileoverview View for program
 */
import {
    ProgramInstance,
    ProgramSuggest,
    ProgramAttribute,
    ProgramUrl,
    ProgramSimilar
} from
'../types/program';

import {PageIntstance as PageInstance} from '../../entity/types/page';

class ProgramView {
    public renderSimilar(
            programs: ProgramAttribute[], urls: ProgramUrl[]
    ): ProgramSimilar[] {
        return programs.map(program => {
            const url = urls.find(url => url.id === program.id).url;

            return {
                id: program.id,
                name: program.name,
                url: url
            };
        });
    }

    public suggestSearch(
            programs: ProgramInstance[], urls: ProgramUrl[]): ProgramSuggest[] {
        return programs.map((program: ProgramInstance): ProgramSuggest => {
            const url = urls.find((url) => url.id === program.id).url;

            return {
                id: program.id,
                name: program.name || '',
                universityAbbreviation: program.university.abbreviation,
                alias: url,
                score: program.score || [],
                totalScore: program.totalScore || 0,
            };
        });
    }
}

export const programView = new ProgramView();
