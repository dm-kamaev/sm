"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProgramView {
    renderSimilar(programs, urls) {
        return programs.map(program => {
            const url = urls.find(url => url.id === program.id).url;
            return {
                id: program.id,
                name: program.name,
                url: url
            };
        });
    }
    suggestSearch(programs, urls) {
        return programs.map((program) => {
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
exports.programView = new ProgramView();
