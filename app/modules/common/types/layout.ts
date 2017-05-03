import {BackendUser} from '../../user/types/user';

export type AppConfig = {
    schools: {
        analyticsId: string,
        yandexMetrikaId: number,
        host: string
    },
    courses: {
        analyticsId: string,
        yandexMetrikaId: number,
        host: string,
        experimentId?: string
    },
    universities: {},
    facebookClientId: number
};

export interface RequestData {
    user: BackendUser;
    csrf: string;
    query: Object;
};
