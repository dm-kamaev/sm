"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UniversityView {
    renderAll(programs, universityAlias) {
        const groupByMajorName = {};
        programs.forEach((program) => {
            const page = program.pages && program.pages[0];
            const programMajor = program.programMajor;
            const programAlias = page.alias;
            const programMajorName = programMajor.name;
            if (!groupByMajorName[programMajorName]) {
                groupByMajorName[programMajorName] = {
                    programMajorName,
                    programs: [],
                };
            }
            groupByMajorName[programMajorName].programs.push({
                name: program.name,
                programAlias,
                universityAlias
            });
        });
        return Object.keys(groupByMajorName).map((key) => {
            return groupByMajorName[key];
        });
    }
}
exports.universityView = new UniversityView();
