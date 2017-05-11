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
    requestData: RequestData;
};

export type BackendData = {
    favorites: {string: any}[];
    ege: Subject[];
};
