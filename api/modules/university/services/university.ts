import {
    Model as UniversityModel,
    UniversityInstance,
    UniversityAttribute
} from '../models/University';

const cityModel = require('../../geo/models/city');

import {UniversityNotFound} from './exceptions/UniversityNotFound';

class UniversityService {
    public async getAll(): Promise<Array<UniversityInstance>> {
        return UniversityModel.findAll({
            attributes: {
                exclude: ['city_id']
            }
        });
    }

    public async get(id: number): Promise<UniversityInstance> {
        const university: UniversityInstance = await UniversityModel.findOne({
            attributes: {
                exclude: ['cityId', 'city_id']
            },
            where: {
                id: id
            },
            include: [{
                model: cityModel,
                as: 'city'
            }]
        });
        if (!university) {
            throw new UniversityNotFound(id);
        }
        return university;
    }

    public async create(data: UniversityAttribute):
            Promise<UniversityInstance> {
        return UniversityModel.create(data);
    }

    public async update(id: number, data: UniversityAttribute):
            Promise<[number, Array<UniversityInstance>]> {
        return UniversityModel.update(data, {
            where: {
                id: id
            }
        });
    }

    public async delete(id: number): Promise<number> {
        return UniversityModel.destroy({
            where: {
                id: id
            }
        });
    }
}

const universityService = new UniversityService();

export {universityService as service};
