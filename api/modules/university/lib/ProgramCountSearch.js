"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProgramSearch_1 = require("./ProgramSearch");
class ProgramCountSearchQuery extends ProgramSearch_1.ProgramSearchQuery {
    setLimit(limit) {
        this.innerQuery_.limit(1);
        return this;
    }
    setBaseQuery_() {
        this.baseQuery_
            .field('program.program_count', 'programCount');
    }
    setInnerQuery_() {
        this.innerQuery_
            .from('program')
            .field('count(program.id) OVER()', 'program_count')
            .left_join('entrance_statistic', null, 'program.id = entrance_statistic.program_id AND ' +
            `entrance_statistic.year = (${this.getLastStatistic_()})`);
    }
    setTypeOrder_(sortType) { }
    setQueriesOrder_() { }
}
exports.ProgramCountSearchQuery = ProgramCountSearchQuery;
