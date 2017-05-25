"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash = require("lodash");
class ProgramAdminView {
    render(program, url) {
        const lastEntranceStatistic = lodash.maxBy(program.entranceStatistics, entranceStatistic => entranceStatistic.year);
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
    renderList(programs, programUrls) {
        return programs.map(program => {
            const url = programUrls
                .find(programUrl => programUrl.id === program.id)
                .url;
            return this.render(program, url);
        });
    }
}
exports.programAdminView = new ProgramAdminView();
