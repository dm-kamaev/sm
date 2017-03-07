const sequelize = require('../../../../app/components/db');

import {Model as ProgramModel} from '../models/Program';
import {Model as ProgramMajor} from '../models/ProgramMajor';
import {
    ProgramInstance,
    ProgramAdmin
} from '../types/program';

import {
    service as commentGroupService
} from '../../comment/services/commentGroup';
import {service as addressService} from '../../geo/services/address';
import {service as universityService} from './university';

import {ProgramNotFound} from './exceptions/ProgramNotFound';

const EXCLUDE_FIELDS = [
    'created_at',
    'updated_at',
    'university_id',
    'comment_group_id',
    'program_major_id',
    'programMajorId',
];

class ProgramService {
    public async getAll(): Promise<Array<ProgramInstance>> {
        const programs: Array<ProgramInstance> = await ProgramModel.findAll({
            attributes: {
                exclude: EXCLUDE_FIELDS
            },
            include: [{
                attributes: ['id', 'name'],
                model: ProgramMajor,
                as: 'programMajor'
            }],
        });
        return programs;
    }

    public async get(id: number): Promise<ProgramAdmin> {
       const program = await ProgramModel.findOne({
            attributes: {
                exclude: EXCLUDE_FIELDS
            },
            where: {
                id: id
            },
            include: [{
                attributes: ['id', 'name'],
                model: ProgramMajor,
                as: 'programMajor'
            }],
        });
        if (!program) {
            throw new ProgramNotFound(id);
        }
        const result: ProgramAdmin = program.toJSON();

        const addresses = await program.getAddresses();
        result.addressName = addresses[0] ? addresses[0].name : null;
        return result;
    }

    public async create(data: ProgramAdmin):
            Promise<ProgramInstance> {
        return sequelize.transaction(async t => {
            return this.fullCreate(data);
        }).catch(error => {
            throw error;
        });
    }

    public async update(id: number, data: ProgramAdmin):
            Promise<[number, Array<ProgramInstance>]> {
        return sequelize.transaction(async t => {
            return this.fullUpdate(id, data);
        }).catch(error => {
            throw error;
        });
    }

    public async delete(id: number): Promise<number> {
        return ProgramModel.destroy({
            where: {
                id: id
            }
        });
    }

    private async fullCreate(data: ProgramAdmin):
            Promise<ProgramInstance> {
        const commentGroup = await commentGroupService.create();
        data.commentGroupId = commentGroup.id;

        const program = await ProgramModel.create(data);
        const university = await universityService.get(program.universityId);

        if (data.addressName) {
            const address = await addressService.findOrCreateByName(
                data.addressName,
                university.cityId
            );
            await program.setAddresses([address]);
        }

        return program;
    }

    private async fullUpdate(id: number, data: ProgramAdmin):
            Promise<[number, Array<ProgramInstance>]> {
        const updatedResult = await ProgramModel.update(data, {
            where: {
                id: id
            }
        });
        const program = await ProgramModel.findById(id);
        const university = await universityService.get(program.universityId);

        if (data.addressName) {
            const address = await addressService.findOrCreateByName(
                data.addressName,
                university.cityId
            );
            await program.setAddresses([address]);
        }

        return updatedResult;
    }
}

const programService = new ProgramService();

export {programService as service};
