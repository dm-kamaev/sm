import {Service, RequestParams} from '../../common/services/Service';
import {ProgramNotFound} from './exceptions/ProgramNotFound';

const host: string =
    require('../../../config/config').universities.host;

const url = `http://${host}/api/program/`;

class ProgramService extends Service {

    constructor() {
        super();
    }

    public async getById(
        id: number
    ): Promise<any> {
        const params: RequestParams = {
            url: url + id,
            method: 'get'
        };

        return await(this.send(params));
    }

    protected handleError(error: any): void {
        switch (error.status) {
        case 404:
            throw new ProgramNotFound();
        default:
            throw error;
        }
    }
}

export const programService = new ProgramService();
