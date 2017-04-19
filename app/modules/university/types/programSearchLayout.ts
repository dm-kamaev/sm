import {BackendUser} from '../../user/types/user';
import {AppConfig} from '../../common/types/layout';

export type QueryParams = {
    cities?: string;
    ege?: string;
    payType?: string;
    maxPassScore?: string;
    maxPrice?: string;
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
    favorites: Array<{string: any}>;
};
