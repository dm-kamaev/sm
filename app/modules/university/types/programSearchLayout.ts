import {BackendUser} from '../../user/types/user';
import {AppConfig} from '../../common/types/layout';
import {BackendProgramResults} from './program';
import {Subject} from './egeExam';
import {BackendCity} from '../../geo/types/city';
import {PopularMajor} from './major';
import {QueryParams} from './programSearch';

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
