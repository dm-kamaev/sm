import {BackendUser} from '../../user/types/user';
import {AppConfig} from '../../common/types/layout';
import {BackendProgramResults} from './program';
import {Subject} from './egeExam';
import {BackendCity} from './city';
import {PopularMajor} from './major';

export type QueryParams = {
    cities?: Array<number>;
    egeSubjects?: Array<number>;
    payType?: Array<number>;
    egeResults?: number;
    maxPrice?: number;
    majors?: string;
    features?: string;
    page?: number;
    sortType?: number;
};

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
