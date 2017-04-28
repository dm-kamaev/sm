import {FormatUtils} from '../../common/lib/FormatUtils';

import {
    QueryParams,
    SearchParams,
    EgeResult
} from '../types/programSearch';
import {
    lSearchUniversity
} from '../../../blocks/n-university/l-search_university/params';

const ALIAS_RUSSIAN_EXAM: string = 'russian';

class ProgramSearchView {
    public initSearchParams(
            queryParams: QueryParams,
            filtersData?: any
    ): SearchParams {

        const formatUtils = new FormatUtils();

        const egeSubjects = (!queryParams.egeSubjects && filtersData) ?
            this.getEgeDefaultSearchParams(filtersData.egeExams) :
            queryParams.egeSubjects;

        return {
            cities: formatUtils.transformToArray(queryParams.cities),
            egeSubjects: formatUtils.transformToArray(egeSubjects),
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

    private getEgeDefaultSearchParams(egeExams): number[] {
        const russianExam = egeExams.find(exam =>
            exam.alias == ALIAS_RUSSIAN_EXAM
        );

        return [russianExam.id];
    }
}

export const programSearchView = new ProgramSearchView();
