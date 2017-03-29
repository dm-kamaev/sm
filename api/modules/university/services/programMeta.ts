// author: dm-kamaev
// service meta information for program

import {
    ProgramPageMetaInformationInstance,
    ProgramMetaAdmin,
} from
'../types/programPageMetaInformation';

import {
    ProgramAttribute,
    ProgramInstance
} from '../types/program';


import {service as pageService} from '../../entity/services/page';
const entityTypes = require('../../entity/enums/entityType.js');

import {
    Model as ProgramPageMetaInformationModel,
} from '../models/ProgramPageMetaInformation';
import {Model as ProgramModel} from '../models/Program';

import {ProgramNotFound} from './exceptions/ProgramNotFound';


const EXCLUDE_ATTRIBUTES = ['created_at', 'updated_at', 'program_id'];

type Meta = ProgramPageMetaInformationInstance | null;

class ProgramMeta {
    public async get(
        programId: number
    ): Promise<ProgramPageMetaInformationInstance> {
        const program: ProgramInstance | null = await ProgramModel.findOne({
            where: {
                id: programId
            }
        });
        if (!program) {
            throw new ProgramNotFound(programId);
        }
        return await ProgramPageMetaInformationModel.findOne({
            attributes: {
                exclude: EXCLUDE_ATTRIBUTES,
            },
            where: {
                programId,
            },
            raw: true,
        });
    }

    public async updateOrCreate(
        programId: number,
        data: ProgramMetaAdmin
    ): Promise<Meta> {
        const meta: Meta = await this.get(programId);
        let res: Meta;
        const alias: string = data.url;
        data.url = null;
        if (meta) {
            console.log('update', data);
            res = await this.update_(programId, data);
        } else {
            console.log('insert');
            res = await this.create_(data);
        }
        await pageService.update({
            entityId: programId,
            entityType: entityTypes.PROGRAM,
        }, {
            alias
        });
        return res;
    }

    private async create_(
        data: ProgramMetaAdmin
    ): Promise<ProgramPageMetaInformationInstance> {
        return await ProgramPageMetaInformationModel.create(data);
    }

    private async update_(
        programId: number,
        data: ProgramMetaAdmin
    ): Promise<Meta> {
        const programMeta: [number, ProgramPageMetaInformationInstance[]]
            = await ProgramPageMetaInformationModel.update(data, {
            where: {
                programId,
            },
            returning: true
        });
        return (programMeta && programMeta[1]) ? programMeta[1][0] : null;
    }


}

export const programMetaService = new ProgramMeta();
