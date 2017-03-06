import {Model as CityModel} from '../models/city';
import {CityInstance} from '../types/city';

class CityService {
    public readonly name: string = 'city';

    public async get(id: number): Promise<CityInstance> {
        return CityModel.findById(id);
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
}

const cityService = new CityService();

export {cityService as service};
