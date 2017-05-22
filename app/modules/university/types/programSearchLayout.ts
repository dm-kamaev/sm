import {AppConfig, RequestData} from '../../common/types/layout';
import {BackendProgramResults} from './program';
import {Subject} from './egeExam';
import {BackendCity} from '../../geo/types/city';
import {PopularMajor} from './major';
import {QueryParams} from './programSearch';
import {SearchParams} from './programSearch';

export type RenderParams = {
    data: BackendData;
    config: AppConfig;
    requestData: RequestDataProgramSearch;
};

export type BackendData = {
    resultsList: BackendProgramResults;
    cities: BackendCity[],
    egeExams: Subject[],
    majors: PopularMajor,
    favorites: Array<{string: any}>;
    searchParams: SearchParams;
};

export interface RequestDataProgramSearch extends RequestData {
    query: QueryParams;
};

