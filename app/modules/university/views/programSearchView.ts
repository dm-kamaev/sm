import {FormatUtils} from '../../common/lib/FormatUtils';

import {programRenderSearchView} from './ProgramRenderSearchView';
import {programView} from './programView';

import {
    QueryParams,
    SearchParams,
    EgeResult
} from '../types/programSearch';
import {
    lSearchUniversity
} from '../../../blocks/n-university/l-search_university/params';
import {BackendProgramResults} from '../types/program';

class ProgramSearchView {
    public renderList(data: BackendProgramResults) {
        const headerText = programRenderSearchView.generateHeaderText(
            data.programCount, data.universityCount
        );
        const items = programView.list(data.programs);
        const countResults = data.programCount;

        return {
            list: {headerText, items, countResults}
        };
    }

    public initSearchParams(
            queryParams: QueryParams,
            filtersData?: any
    ): SearchParams {

        const formatUtils = new FormatUtils();

        return {
            cities: formatUtils.transformToArray(queryParams.cities),
            egeSubjects: formatUtils.transformToArray(queryParams.egeSubjects),
            payType: formatUtils.transformToArray(queryParams.payType),
            egeResults: this.initEgeResults(queryParams.egeResults),
            majors: formatUtils.transformToArray(queryParams.majors),
            maxPrice: formatUtils.transformToArray(queryParams.maxPrice),
            features: formatUtils.transformToArray(queryParams.features),
            page: queryParams.page || 0,
            sortType: queryParams.sortType || 0
        };
    };

    private initEgeResults(query: string): EgeResult[] {
        return query ?
            JSON.parse(query) :
            [];
    }
}

export const programSearchView = new ProgramSearchView();
