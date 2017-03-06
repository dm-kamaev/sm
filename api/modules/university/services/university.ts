import {
    Model as UniversityModel,
    UniversityInstance,
    UniversityAttribute
} from '../models/University';

import {Model as CityModel} from '../../geo/models/city';


import {UniversityPageInstance} from '../models/UniversityPage';
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
                exclude: ['city_id']
            },
            where: {
                id: id
            },
            include: [{
                model: CityModel,
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

export const service = new UniversityService();
