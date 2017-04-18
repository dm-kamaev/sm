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

import {ProgramMetaNotFound, ProgramNotFound} from './exceptions';

const EXCLUDE_ATTRIBUTES = ['created_at', 'updated_at', 'program_id'];

type Meta = ProgramPageMetaInformationInstance | null;

class ProgramMeta {
    public async get(
        id: number
    ): Promise<ProgramPageMetaInformationInstance> {
        return await ProgramPageMetaInformationModel.findOne({
            attributes: {
                exclude: EXCLUDE_ATTRIBUTES,
            },
            where: {
                id,
            },
            raw: true,
        });
    }

    public async create(
        data: ProgramMetaAdmin,
        programId: number
    ): Promise<Meta> {
        const alias: string = data.url;
        data.url = null;
        data.programId = programId;
        const res: Meta = await ProgramPageMetaInformationModel.create(data);

        await pageService.update({
            entityId: programId,
            entityType: entityTypes.PROGRAM,
        }, {
            alias
        });
        return res;
    }

    public async update(
        programId: number,
        id: number,
        data: ProgramMetaAdmin
    ): Promise<Meta> {
        const alias: string = data.url;
        data.url = null;
        const programMeta: [number, ProgramPageMetaInformationInstance[]]
            = await ProgramPageMetaInformationModel.update(data, {
            where: {
                id,
            },
            returning: true
        });

        const res: Meta = (programMeta && programMeta[1]) ?
            programMeta[1][0] :
            null;

        await pageService.update({
            entityId: programId,
            entityType: entityTypes.PROGRAM,
        }, {
            alias
        });
        return res;
    }

    public async getByProgramId(
            programId: number): Promise<ProgramPageMetaInformationInstance> {
        const programMeta = await ProgramPageMetaInformationModel.findOne({
            where: {programId}
        });
        if (!programMeta) {
            throw new ProgramMetaNotFound(programId);
        }
        return programMeta;
    }
}

export const programMetaService = new ProgramMeta();
