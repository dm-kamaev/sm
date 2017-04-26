import {FormatUtils} from '../../common/lib/FormatUtils';

import {QueryParams} from '../types/programSearch';
import {
    lSearchUniversity
} from '../../../blocks/n-university/l-search_university/params';

class ProgramSearchView {
    public initSearchParams(
            queryParams: QueryParams,
            filtersData: any
    ): lSearchUniversity.Params.SearchParams {

        const formatUtils = new FormatUtils();

        return {
            cities: formatUtils.transformToArray(queryParams.cities),
            egeSubjects: formatUtils.transformToArray(queryParams.egeSubjects),
            payType: formatUtils.transformToArray(queryParams.payType),
            egeResults: formatUtils.transformToArray(queryParams.egeResults),
            majors: formatUtils.transformToArray(queryParams.majors),
            maxPrice: formatUtils.transformToArray(queryParams.maxPrice),
            features: formatUtils.transformToArray(queryParams.features),
            page: queryParams.page || 0,
            sortType: queryParams.sortType || 0
        };
    };
}

export const programSearchView = new ProgramSearchView();
