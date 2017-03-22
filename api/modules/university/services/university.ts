const squel = require('squel');

const sequelize = require('../../../../app/components/db');

import {
    Model as UniversityModel,
    UniversityInstance,
    UniversityAttribute
} from '../models/University';

import {UniversityAdminList} from '../types/university';

import {Model as CityModel} from '../../geo/models/city';
import {Model as ProgramModel} from '../models/Program';

import {UniversityPageInstance} from '../models/UniversityPage';
import {UniversityNotFound} from './exceptions/UniversityNotFound';

class UniversityService {
    public async getAll(): Promise<Array<UniversityAdminList>> {
        const university = 'university';
        const city = 'city';
        const program = 'program';
        const query: string = squel.select()
            .from(university)
            .field(`${university}.id`)
            .field(`${university}.name`)
            .field(`${university}.abbreviation`)
            .field(`${city}.name`, 'cityName')
            .field(`COUNT(${program}.id)`, 'programCount')
            .field(`${university}.updated_at`, 'updatedAt')
            .left_join(city, null, `${university}.${city}_id = ${city}.id`)
            .left_join(
                program,
                null,
                `${university}.id = ${program}.${university}_id`
            )
            .group(`${university}.id`)
            .group(`${city}.name`)
            .toString();
        return sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
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
                attributes: ['id', 'name', 'regionId'],
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
        // hook is used on university create
        return sequelize.transaction(async t => {
            return UniversityModel.create(data);
        }).catch(error => {
            throw error;
        });
    }

    public async update(id: number, data: UniversityAttribute):
            Promise<UniversityInstance> {
        // hook is used on university update
        return sequelize.transaction(async t => {
            const university = await this.get(id);
            return university.update(data);
        }).catch(error => {
            throw error;
        });
    }

    public async delete(id: number): Promise<number> {
        // hook is used on university delete
        return sequelize.transaction(async t => {
            return UniversityModel.destroy({
                where: {
                    id: id
                }
            });
        }).catch(error => {
            throw error;
        });
    }
}

export const service = new UniversityService();
