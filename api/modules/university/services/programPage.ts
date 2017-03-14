import {ProgramInstance} from '../types/program';

import {service as programService} from './program';
import {service as pageService} from '../../entity/services/page';
const urlsService = require('../../entity/services/urls');

const entityType = require('../../entity/enums/entityType');
const PROGRAM_TYPE = entityType.PROGRAM;

class ProgramPageService {
    public async createPage(program: ProgramInstance): Promise<void> {
        const alias = await this.getAlias(program.universityId, program);
        const page = await pageService.create({
            entityId: program.id,
            entityType: PROGRAM_TYPE,
            alias: alias,
            views: 0
        });
        program.setPages([page]);
    }

    public async updatePage(program: ProgramInstance): Promise<void> {
        const alias = await this.getAlias(program.universityId, program);
        pageService.update({
            entityId: program.id,
            entityType: PROGRAM_TYPE
        }, {
            alias: alias
        });
    }

    public async deletePage(program: ProgramInstance): Promise<void> {
        pageService.delete(program.id, PROGRAM_TYPE);
    }

    private async getAlias(
            universityId: number, program: ProgramInstance): Promise<string> {
        const universityPrograms =
            await programService.getByUniversityId(universityId);
        const programIds = universityPrograms
            .filter(universityProgram => universityProgram.id !== program.id)
            .map(universityProgram => universityProgram.id);
        const programPages =
            await pageService.getAliases(programIds, PROGRAM_TYPE);

        let isAliasUnique = false;
        let alias = urlsService.stringToURL(program.name);
        while (!isAliasUnique) {
            const page = programPages.find(programPage =>
                programPage.alias === alias);
            if (page) {
                alias += '_';
            } else {
                isAliasUnique = true;
            }
        }
        return alias;
    }
}

export const service = new ProgramPageService();
