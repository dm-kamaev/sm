'use strict';

// author: dm-kamaev
// update cities

import * as lodash from 'lodash';
const logger
    = require('../../../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../../../app/components/db.js');
import {
    service as cityService
} from '../../../api/modules/geo/services/city';
import {
    CityInstance
} from '../../../api/modules/geo/types/city';
import {Hash} from './types/updateUniverstyAndProgram';


export class Cities {
    private listProgram_: any[];
    private hashColumn_: Hash<string>;

    constructor(option?) {
        option = option || {};
        this.hashColumn_ = option.hashColumn;
        this.listProgram_ = option.listProgram;
    }

    public async updateViaXlsx() {
        let cityNames: string[] = this.extractCities(this.listProgram_);
        const hashCity = await this.getHashCity();
        cityNames = lodash.uniq(cityNames);
        // console.log(hashCity);
        // console.log('cityNames=', cityNames, cityNames.length);
        try {
            const promiseCities: Promise<CityInstance | null>[]
                = cityNames.map((cityName) => {
                    return this.create(cityName, hashCity);
                });
            await Promise.all(promiseCities);
            logger.info('success cities updateViaXlsx');
        } catch (error) {
            logger.critical('Error: updateCity=> ' + error);
        }
    }

    public async getHashCity(): Promise<Hash<number>> {
        const cities: CityInstance[] = await cityService.getAll();
        const hashCity: Hash<number> = {};
        cities.forEach((city: CityInstance) => {
            hashCity[city.name] = city.id;
        });
        return hashCity;
    }

    private extractCities(listProgram: any[]): string[] {
        const cityColumn: string = this.hashColumn_.city;
        return listProgram.map(program => program[cityColumn]);
    }


    private async create(
        cityName: string,
        hashCity: Hash<number>
    ): Promise<CityInstance | null> {
        cityName = cityService.cleanCityName(cityName);
        let res: CityInstance | null = null;
        if (!hashCity[cityName]) {
            try {
                res = await cityService.create(cityName);
            } catch (error) {
                logger.critical('Error: cityService.create=> ' + error);
            }
        }
        return res;
    }

};
