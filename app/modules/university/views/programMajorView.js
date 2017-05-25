"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProgramMajorView {
    filtersRender(programMajor) {
        return {
            value: programMajor.id,
            label: programMajor.name
        };
    }
    filtersListRender(programMajors) {
        return programMajors.map(this.filtersRender);
    }
}
exports.programMajorView = new ProgramMajorView();
