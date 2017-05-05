import * as squel from 'squel';

import {ProgramSearchQuery} from './ProgramSearch';

import {SearchType} from '../constants/SearchType';
import {EgeSearch} from '../types/programSearch';

type SearchDataOptions = {
    isContained?: boolean;
};

export class ProgramCountSearchQuery extends ProgramSearchQuery {
    public setLimit(limit?: number | undefined): this {
        this.innerQuery_.limit(1);
        return this;
    }

    protected setBaseQuery_(): void {
        this.baseQuery_
            .field('program.program_count', 'programCount');
    }

    protected setInnerQuery_(): void {
        this.innerQuery_
            .from('program')
            .field('count(program.id) OVER()', 'program_count')
            .left_join(
                'entrance_statistic',
                null,
                'program.id = entrance_statistic.program_id AND ' +
                    `entrance_statistic.year = (${this.getLastStatistic_()})`
            );
    }

    protected setTypeOrder_(sortType: number): void {}

    protected setQueriesOrder_(): void {}
}
