import {
    Model as EntranceStatisticModel,
    EntranceStatisticAttribute,
    EntranceStatisticInstance
} from '../models/EntranceStatistic';

const subjectService = require('../../study/services/subject');

const EXCLUDE_ATTRIBUTES = ['created_at', 'updated_at', 'program_id'];

class EntranceStatisticService {
    public async getByProgramId(programId: number):
            Promise<Array<EntranceStatisticAttribute>> {
        return EntranceStatisticModel.findAll({
            attributes: {
                exclude: EXCLUDE_ATTRIBUTES
            },
            where: {
                programId: programId
            }
        });
    }

    public async get(id: number): Promise<EntranceStatisticAttribute> {
        return EntranceStatisticModel.findOne({
            attributes: {
                exclude: EXCLUDE_ATTRIBUTES
            },
            where: {
                id: id
            }
        });
    }

    public async create(data: EntranceStatisticAttribute):
            Promise<EntranceStatisticInstance> {
        return EntranceStatisticModel.create(data);
    }

    public async update(id: number, data: EntranceStatisticAttribute):
            Promise<[number, Array<EntranceStatisticInstance>]> {
        return EntranceStatisticModel.update(data, {
            where: {
                id: id
            }
        });
    }

    public async delete(id: number): Promise<number> {
        return EntranceStatisticModel.destroy({
            where: {
                id: id
            }
        });
    }
}

const entranceStatisticService = new EntranceStatisticService();

export {entranceStatisticService as service};
