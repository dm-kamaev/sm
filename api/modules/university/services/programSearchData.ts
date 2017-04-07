import {Model as ProgramSearchDataModel} from '../models/ProgramSearchData';
import {
    ProgramSearchDataAttribute,
    ProgramSearchDataInstance
} from '../types/programSearchData';

class ProgramSearchDataService {
    public async getAll(): Promise<Array<ProgramSearchDataInstance>> {
        return ProgramSearchDataModel.findAll();
    }

    public async create(
            data: ProgramSearchDataAttribute
    ): Promise<ProgramSearchDataInstance> {
        return ProgramSearchDataModel.create(data);
    }

    public async update(
            id: number,
            data: ProgramSearchDataAttribute
    ): Promise<[number, Array<ProgramSearchDataInstance>]> {
        return ProgramSearchDataModel.update(data, {
            where: {id}
        });
    }
}

export const service = new ProgramSearchDataService();
