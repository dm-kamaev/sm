import {BackendUser} from '../../user/types/user';
import {AppConfig} from '../../common/types/layout';
import {BackendProgramResults} from './program';

export type QueryParams = {
    cities?: Array<number>;
    ege?: Array<number>;
    payType?: Array<number>;
    maxPassScore?: number;
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
    filtersData: any;
    resultsList: BackendProgramResults;
    favorites: Array<{string: any}>;
};
