import {Service, RequestParams} from '../../common/services/Service';
const host: string =
    require('../../../config/config').universities.host;

const url = `http://${host}/api/program/`;

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
