"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SearchView {
    suggestList(suggestData) {
        const programs = suggestData.programs.map(program => {
            program.name =
                `${program.name} (${program.universityAbbreviation})`;
            return program;
        });
        const result = { programs };
        return result;
    }
}
exports.searchView = new SearchView();
