import {RegionInstance, Model as RegionModel} from '../models/Region';

class RegionService {
    public readonly name: string = 'region';

    public async getByData(params): Promise<RegionInstance | null> {
        const attributes: Array<string> = params.attributes,
              where = params.where;
        return await RegionModel.findOne({
            attributes,
            where,
        });
    }

    public async create(data: { name: string }): Promise<RegionInstance> {
        return await RegionModel.create(data);
    }
}

export const service = new RegionService();
