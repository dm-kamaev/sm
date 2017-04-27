/**
 * @fileoverview View for program
 */
import {
    ProgramAttribute,
    ProgramUrl,
    ProgramSimilar
} from '../types/program';

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
}

export const programView = new ProgramView();
