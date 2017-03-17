import {Service, RequestParams} from '../../common/services/Service';
import {UniversityNotFound} from './exceptions/UniversityNotFound';

const host: string =
    require('../../../config/config').universities.host;

const url = `http://${host}/api/university/`;

class UniversityService extends Service {

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
            throw new UniversityNotFound();
        default:
            throw error;
        }
    }
}

export const universityService = new UniversityService();
