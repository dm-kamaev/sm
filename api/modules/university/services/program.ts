/**
 * @fileoverview Service for make CRUD operations on program model
 */
import * as Sequelize from 'sequelize';

import {CommentGroupInstance} from '../../comment/types/commentGroup';

const sequelize = require('../../../../app/components/db');
import {
    service as textSearchDataService
} from '../../entity/services/textSearchData.js';
const entityTypes = require('../../entity/enums/entityType.js');

import {Model as PageModel} from '../../entity/models/page';
import {Model as RatingModel} from '../../comment/models/Rating';

import {Model as ProgramModel} from '../models/Program';
import {Model as ProgramMajorModel} from '../models/ProgramMajor';
import {
    Model as ProgramPageMetaModel
} from '../models/ProgramPageMetaInformation';
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
    ListProgram,
    SearchListResult,
    QueryParams,
    ProgramCountResult
} from '../types/programSearch';

import {PageAttribute} from '../../entity/types/page';

import {
    service as commentGroupService
} from '../../comment/services/commentGroup';
import {
    service as programCommentService
} from '../../comment/services/programComment';
import {service as addressService} from '../../geo/services/address';
import {service as universityService} from './university';
import {service as pageService} from '../../entity/services/page';
import {programSearchService} from './programSearch';
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
                model: ProgramMajorModel,
                as: 'programMajor'
            }, {
                attributes: ['id'],
                model: ProgramPageMetaModel,
                as: 'programPageMetaInformations'
            }]
        });
        if (!program) {
            throw new ProgramNotFound(id);
        }
        const data: any = program.toJSON();

        const result: ProgramAdmin = {};
        Object.keys(data).forEach(key => {
            if (key != 'programPageMetaInformations') {
                result[key] = data[key];
            }
        });
        result.pageMetaId = data.programPageMetaInformations ?
            data.programPageMetaInformations.id :
            null;

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

    public async getByIds(programIds: number[]): Promise<ProgramInstance[]> {
        return ProgramModel.findAll({
            where: {
                id: programIds
            },
            attributes: {
                exclude: EXCLUDE_FIELDS
            }
        });
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

    public async getProgramAlias(id: number): Promise<string> {
        const program: PageAttribute =
            await pageService.getOne(id, entityType.PROGRAM);
        return program.alias;
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
        const entityIds = programs.reduce(
            (result, program) => {
                result.program.push(program.id);
                result.university.push(program.universityId);
                return result;
            },
            {
                program: [],
                university: []
            });


        const [
            programPages,
            universityPages
        ] = await Promise.all([
            pageService.getAliases(entityIds.program, entityType.PROGRAM),
            pageService.getAliases(entityIds.university, entityType.UNIVERSITY)
        ]);

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

    public async getAllWithEgeAndStatistic(): Promise<Array<ProgramInstance>> {
        const programs: Array<ProgramInstance> = await ProgramModel.findAll({
            attributes: {
                exclude: EXCLUDE_FIELDS
            },
            include: [{
                model: EntranceStatisticModel,
                as: 'entranceStatistics',
            }, {
                model: ProgramEgeExamModel,
                as: 'programEgeExams'
            }, {
                model: UniversityModel,
                as: 'university',
                attributes: ['cityId']
            }],
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
        return await this.getByIds(programIds);
    }

    public async searchList(
            queryParams: QueryParams): Promise<SearchListResult> {
        const queryResult: ListProgram[] =
            await this.getRawSearchList_(queryParams);

        let result;
        if (!queryResult.length) {
            result = {
                programCount: 0,
                universityCount: 0,
                programs: []
            };
        } else {
            result = {
                programCount: Number(queryResult[0].programCount),
                universityCount: Object.keys(
                        queryResult[0].universities
                    ).length,
                programs: queryResult.map(program => ({
                    id: program.id,
                    name: program.name,
                    totalScore: program.totalScore,
                    exchangeProgram: program.exchangeProgram,
                    extraExam: program.extraExam,
                    egeScore: program.egeScore,
                    cost: program.cost,
                    budgetPlaces: program.budgetPlaces,
                    commercialPlaces: program.commercialPlaces,
                    competition: program.competition,
                    imageUrl: program.imageUrl,
                    universityName: program.universityName,
                    universityAbbreviation: program.universityAbbreviation,
                    cityName: program.cityName,
                    programAlias: program.programAlias,
                    universityAlias: program.universityAlias
                }))
            };
        }

        return result;
    }

    public async searchCountList(
            queryParams: QueryParams): Promise<ProgramCountResult> {
        const searchParams =
            programSearchService.converSearchParams(queryParams);
        const searchQuery =
            programSearchService.getCountSearchQuery(searchParams);
        const result = await sequelize.query(searchQuery, {
            type: Sequelize.QueryTypes.SELECT
        });
        return result[0];
    }

    public async getUniversityIds(
            programIds: number[]): Promise<ProgramInstance[]> {
        return ProgramModel.findAll({
            attributes: ['id', 'universityId'],
            where: {
                id: {
                    $in: programIds
                }
            }
        });
    }

    private async getRawSearchList_(
            queryParams: QueryParams): Promise<ListProgram[]> {
        const searchParams =
            programSearchService.converSearchParams(queryParams);
        const searchQuery = programSearchService.getListSearchQuery(
            searchParams
        );
        return sequelize.query(
            searchQuery, {
                type: Sequelize.QueryTypes.SELECT
            }
        );
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
