import {Service, RequestParams} from '../../common/services/Service';

const url =
    'http://universities.www73.lan/api/program/';

class EntranceStatisticService extends Service {
    public readonly name: string = 'entranceStatisticService';

    constructor() {
        super();
    }

    public async getById(
        id: number
    ): Promise<any> {
        const params: RequestParams = {
            url: url + id + '/statistic/last',
            method: 'get'
        };

        return await(this.send(params));
    }

    protected handleError(error: any): void {
    }
}

export const entranceStatisticService = new EntranceStatisticService();
