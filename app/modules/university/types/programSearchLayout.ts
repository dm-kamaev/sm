import {BackendUser} from '../../user/types/user';
import {AppConfig} from '../../common/types/layout';
import {BackendProgramResults} from './program';
import {Subject} from './egeExam';
import {BackendCity} from '../../geo/types/city';
import {PopularMajor} from './major';
<<<<<<< 6f11d6ea8c06b0113ba2e6d9e5869f15e2174760
import {QueryParams} from './programSearch';
=======

export type QueryParams = {
    cities?: Array<number>;
    egeSubjects?: Array<number>;
    payType?: Array<number>;
    egeResults?: Array<string>;
    maxPrice?: number;
    majors?: string;
    features?: string;
    page?: number;
    sortType?: number;
};
>>>>>>> BP-2303 add types and search params transformation in search service

export type RenderParams = {
    data: BackendData;
    config: AppConfig;
    requestData: {
        user: BackendUser;
        csrf: string;
        query: QueryParams;
    }
};

export type BackendData = {
    resultsList: BackendProgramResults;
    cities: BackendCity[],
    egeExams: Subject[],
    majors: PopularMajor,
    favorites: Array<{string: any}>;
};
