/**
 * @fileOverview Service for make CRUD operations on program model
 */
import {CommentGroupInstance} from '../../comment/types/commentGroup';

const sequelize = require('../../../../app/components/db');
import {
    service as textSearchDataService
} from '../../entity/services/textSearchData.js';
const entityTypes = require('../../entity/enums/entityType.js');

import {Model as PageModel} from '../../entity/models/page';
import {Model as RatingModel} from '../../comment/models/Rating';

import {Model as ProgramModel} from '../models/Program';
import {Model as ProgramMajor} from '../models/ProgramMajor';
import {Model as CommentGroupModel} from '../../comment/models/commentGroup';
import {
    Model as ProgramCommentModel
} from '../../comment/models/ProgramComment';
import {Model as EntranceStatisticModel} from '../models/EntranceStatistic';
import {Model as ProgramEgeExamModel} from '../models/ProgramEgeExam';
import {Model as UniversityModel} from '../models/University';
import {
    ProgramInstance,
    ProgramAdmin,
    ProgramAttribute,
    ProgramUrl
} from '../types/program';
import {EntitiesSearch} from '../../entity/types/textSearchData';

import {
    service as commentGroupService
} from '../../comment/services/commentGroup';
import {
    service as programCommentService
} from '../../comment/services/programComment';
import {service as addressService} from '../../geo/services/address';
import {service as universityService} from './university';
import {service as pageService} from '../../entity/services/page';
const entityType = require('../../entity/enums/entityType');
import {UrlTemplate} from '../constants/UrlTemplate';

import {ProgramNotFound, ProgramNameIsShorterException} from './exceptions';

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
                model: CommentGroupModel,
                as: 'commentGroup',
                include: [{
                    model: ProgramCommentModel,
                    as: 'programComments'
                }]
            }, {
                model: EntranceStatisticModel,
                as: 'entranceStatistics'
            }]
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
            },
            individualHooks: true
        });
    }

    public async getOne(programId: number): Promise<ProgramInstance> {
        const instance = await this.silentGetOne_(programId);

        if (!instance) {
            throw new ProgramNotFound(programId);
        }

        return instance;
    }

    public async getCommentGroup(
        programId: number): Promise<CommentGroupInstance> {
        const program = await this.getOne(programId);
        return await program.getCommentGroup();
    }

    public async getByUniversityId(
            universityId: number): Promise<Array<ProgramInstance>> {
        return ProgramModel.findAll({
            where: {universityId},
            attributes: {
                exclude: EXCLUDE_FIELDS
            },
            include: [{
                model: CommentGroupModel,
                as: 'commentGroup',
                include: [{
                    model: ProgramCommentModel,
                    as: 'programComments'
                }]
            }, {
                model: EntranceStatisticModel,
                as: 'entranceStatistics'
            }]
        });
    }

    public async getByCommentGroup(
            commentGroupId: number): Promise<ProgramInstance> {
        return await ProgramModel.findOne({
            where: {
                commentGroupId: commentGroupId
            }
        });
    }

    public async getUrl(program: ProgramAttribute): Promise<string> {
        const programPage = await pageService.getOne(
                program.id, entityType.PROGRAM
            ),
            universityPage = await pageService.getOne(
                program.universityId, entityType.UNIVERSITY
            );

        return this.convertToUrl(universityPage.alias, programPage.alias);
    }

    public async getUrls(
            programs: Array<ProgramInstance>): Promise<Array<ProgramUrl>> {
        const pages = await Promise.all([
            pageService.getAllAliases(entityType.PROGRAM),
            pageService.getAllAliases(entityType.UNIVERSITY)
        ]);
        const programPages = pages[0];
        const universityPages = pages[1];

        return programs.map(program => {
            const programAlias = programPages
                .find(programPage => programPage.entityId === program.id)
                .alias;
            const universityAlias = universityPages
                .find(universityPage =>
                    universityPage.entityId === program.universityId)
                .alias;
            return {
                id: program.id,
                url: this.convertToUrl(
                    universityAlias,
                    programAlias
                )
            };
        });
    }

    public async getAllWithEgeAndStatistic(
        statisticData
    ): Promise<Array<ProgramInstance>> {
        const programs: Array<ProgramInstance> = await ProgramModel.findAll({
            attributes: {
                exclude: EXCLUDE_FIELDS
            },
            include: [{
                model: EntranceStatisticModel,
                as: 'entranceStatistics',
                where: statisticData
            }, {
                model: ProgramEgeExamModel,
                as: 'programEgeExams'
            }]
        });
        return programs;
    }

    public async getFullList(): Promise<Array<ProgramInstance>> {
        return ProgramModel.findAll({
            include: [{
                model: UniversityModel,
                as: 'university'
            }, {
                model: EntranceStatisticModel,
                as: 'entranceStatistics'
            }, {
                model: ProgramEgeExamModel,
                as: 'programEgeExams'
            }],
            order: [[
                {
                    model: EntranceStatisticModel,
                    as: 'entranceStatistics'
                },
                'year',
                'DESC'
            ]]
        });
    }


    public async suggestSearch(
        searchString: string
    ): Promise<ProgramInstance[] | null> {
        const mustLength: number = 2;
        if (!searchString || searchString.length < mustLength) {
            throw new ProgramNameIsShorterException(searchString, mustLength);
        }

        const founded: EntitiesSearch
            = await textSearchDataService.entitiesSearch(
                searchString,
                [entityTypes.PROGRAM]
            );
        if (!founded.program) {
            return null;
        }
        const programIds: number[] = founded.program;
        return await this.getProgramsWithAlias_(programIds);
    }

    private async getProgramsWithAlias_(
        programIds: number[]
    ): Promise<ProgramInstance[]> {
        return await ProgramModel.findAll({
            attributes: ['id', 'name', 'score', 'totalScore'],
            where: {
                id: {
                    $in: programIds
                }
            },
            include: [{
                attributes: ['alias'],
                model: PageModel,
                as: 'pages'
            }],
        });
    }


    private convertToUrl(universityAlias, programAlias) {
        return UrlTemplate.PROGRAM
            .replace('${universityAlias}', universityAlias)
            .replace('${programAlias}', programAlias);
    }

    private async fullCreate(data: ProgramAdmin):
            Promise<ProgramInstance> {
        const commentGroup = await commentGroupService.create();
        data.commentGroupId = commentGroup.id;

        const program = await ProgramModel.create(data);
        const university = await universityService.get(program.universityId);

        if (data.addressName) {
            const address = await addressService.getOrCreateByName(
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
            },
            individualHooks: true
        });
        const program = await ProgramModel.findById(id);
        const university = await universityService.get(program.universityId);

        if (data.addressName) {
            const address = await addressService.getOrCreateByName(
                data.addressName,
                university.cityId
            );
            await program.setAddresses([address]);
        }

        return updatedResult;
    }

    private async silentGetOne_(programId: number): Promise<ProgramInstance> {
        return ProgramModel.findById(programId);
    }
}

const programService = new ProgramService();

export {programService as service};
