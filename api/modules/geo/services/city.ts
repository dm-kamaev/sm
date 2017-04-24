const sequelize = require('../../../../app/components/db');
const redis = require('../../../../app/components/redis');

import {Model as CityModel} from '../models/city';
import {CityInstance} from '../types/city';
import {RegionInstance, Model as RegionModel} from '../models/Region';
import {Model as UniversityModel} from '../../university/models/University';
import {Model as ProgramModel} from '../../university/models/Program';
import {
    CityNotFoundException,
    CityNameEmptyException,
    CityNameNotValidException,
    CityAlreadyExistException,
} from './exceptions/index';
import {geoTools} from '../../../../console/modules/geoTools/geoTools';
import {service as regionService} from './region';

const EXCLUDE_ATTRIBUTES = ['created_at', 'updated_at', 'region_id'];
const CITIES_POPULAR_PROGRAM = 'program.citiesPopularSorted';
const CACHE_TIME = 60 * 60 * 24;

class CityService {
    public readonly name: string = 'city';

    public async get(id: number): Promise<CityInstance> {
        return CityModel.findById(id);
    }

    public async getByData(data): Promise<CityInstance> {
        return await CityModel.findOne(data);
    }

    public async getMoscow(): Promise<CityInstance> {
        const instance = await CityModel.findOrCreate({
            where: {
                name: 'Москва'
            }
        });
        return instance[0];
    }

    public getCenterCoords(): Array<number> {
        return [55.755768, 37.617671];
    }

    public async getAll(): Promise<CityInstance[]> {
        return await CityModel.findAll({
            attributes: {
                exclude: EXCLUDE_ATTRIBUTES
            },
            include: [{
                attributes: ['id', 'name'],
                model: RegionModel,
                as: 'region'
            }],
        });
    }

    public async getAllSortedByProgramCount(): Promise<CityInstance[]> {
        let cities = await redis.get(CITIES_POPULAR_PROGRAM);
        if (!cities) {
            cities = await this.getAllSortedByProgramCountDb();

            redis.set(CITIES_POPULAR_PROGRAM, cities, CACHE_TIME);
        }
        return cities;
    }

    public async getById(cityId: number): Promise<CityInstance> {
        const city: CityInstance | null = await CityModel.findOne({
            attributes: {
                exclude: EXCLUDE_ATTRIBUTES
            },
            where: {
                id: cityId
            },
            include: [{
                attributes: ['id', 'name'],
                model: RegionModel,
                as: 'region'
            }],
        });
        if (!city) {
            throw new CityNotFoundException(cityId);
        }
        return city;
    }

    public async create(cityName: string): Promise<CityInstance> {
        if (!cityName) {
            throw new CityNameEmptyException(cityName);
        }
        const cleanCityName: string = this.cleanCityName(cityName);
        if (!cleanCityName) {
            throw new CityNameNotValidException(cityName);
        }
        const cityInDb = await this.getByData({
            where: {
                name: cleanCityName
            }
        });
        if (cityInDb) {
            throw new CityAlreadyExistException(cleanCityName);
        }
        const regionName = await geoTools.getRegion(cleanCityName);
        let region: RegionInstance | null = await regionService.getByData({
            attributes: ['id'],
            where: {
                name: regionName
            }
        });
        if (!region) {
            region = await regionService.create({ name: regionName });
        }
        return await CityModel.create({
            name: cleanCityName,
            regionId: region.id
        });
    }

    public async update(
        cityId: number,
        cityName: string
    ): Promise<CityInstance | null> {
        if (!cityName) {
            throw new CityNameEmptyException(cityName);
        }
        const cleanCityName: string = this.cleanCityName(cityName);
        if (!cleanCityName) {
            throw new CityNameNotValidException(cityName);
        }
        const cityInDb = await this.getByData({
            where: {
                id: {
                    $ne: cityId
                },
                name: cleanCityName
            }
        });
        if (cityInDb) {
            throw new CityAlreadyExistException(cleanCityName);
        }
        const regionName = await geoTools.getRegion(cleanCityName);
        let region: RegionInstance | null = await regionService.getByData({
            attributes: ['id'],
            where: {
                name: regionName
            }
        });
        if (!region) {
            region = await regionService.create({ name: regionName });
        }
        const res: [number, CityInstance[]] = await CityModel.update({
            name: cleanCityName,
            regionId: region.id
        }, {
            where: {
                id: cityId
            },
            returning: true
        });
        let responce: CityInstance | null = null;
        if (res && res[0]) {
            responce = res[1][0];
        }
        return responce;
    }

    // return only russian text or empty string
    public cleanCityName(cityName: string): string {
      return cityName
                .toString()
                .replace(/[\w\d_!@#\$%^&*\(\)"':;|,\.\+<>?\[\]~{}\/\\]+/g, '')
                .replace(/-+/g, '-')
                .replace(/^-+/g, '')
                .replace(/-+$/g, '')
                .trim()
                .replace(/\s+/g, ' ');
    }

    public async findByName(name: string): Promise<CityInstance[]> {
        return CityModel.findAll({
            attributes: {exclude: EXCLUDE_ATTRIBUTES},
            where: {
                name: {
                    $ilike: `%${name}%`
                }
            }
        });
    }

    private async getAllSortedByProgramCountDb(): Promise<CityInstance[]> {
        return CityModel.findAll({
            attributes: {exclude: EXCLUDE_ATTRIBUTES},
            include: [{
                attributes: [],
                model: UniversityModel,
                as: 'universities',
                include: [{
                    attributes: [],
                    model: ProgramModel,
                    as: 'programs'
                }]
            }],
            group: ['City.id'],
            order: [[
                sequelize.fn(
                    'count',
                    sequelize.col('universities.programs.id')
                ),
                'DESC'
            ]]
        });
    }

}

const cityService = new CityService();

export {cityService as service};
