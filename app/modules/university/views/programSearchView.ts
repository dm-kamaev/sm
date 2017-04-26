import {FormatUtils} from '../../common/lib/FormatUtils';

import {QueryParams} from '../types/programSearch';
import {
    lSearchUniversity
} from '../../../blocks/n-university/l-search_university/params';

const ALIAS_RUSSIAN_EXAM: string = 'russian';

class ProgramSearchView {
    public initSearchParams(
            queryParams: QueryParams,
            filtersData: any
    ): lSearchUniversity.Params.SearchParams {

        const formatUtils = new FormatUtils();

        const egeSubjects = queryParams.egeSubjects ?
            queryParams.egeSubjects :
            this.getEgeDefaultSearchParams(filtersData.egeExams);

        return {
            cities: formatUtils.transformToArray(queryParams.cities),
            egeSubjects: formatUtils.transformToArray(egeSubjects),
            payType: formatUtils.transformToArray(queryParams.payType),
            egeResults: formatUtils.transformToArray(queryParams.egeResults),
            majors: formatUtils.transformToArray(queryParams.majors),
            maxPrice: formatUtils.transformToArray(queryParams.maxPrice),
            features: formatUtils.transformToArray(queryParams.features),
            page: queryParams.page || 0,
            sortType: queryParams.sortType || 0
        };
    };

    private getEgeDefaultSearchParams(egeExams): number[] {
        const russianExam = egeExams.find(exam =>
            exam.alias == ALIAS_RUSSIAN_EXAM
        );

        return [russianExam.id];
    }
}

export const programSearchView = new ProgramSearchView();
