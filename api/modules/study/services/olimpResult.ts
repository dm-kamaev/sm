const Sequelize = require('sequelize');
const models = require('../../../../app/components/models').all;

import {
    Model as OlympiadResultModel,
    OlympiadResultAttribute,
    OlympiadResultInstance
} from '../models/olimpResult';

import {OlympiadResultNotFound} from './exceptions/olympiadResultNotFound';


class OlympiadResultService {
    public readonly name: string;

    constructor() {
        this.name = 'olimpResult';
    }

    public async getOne(id: number): Promise<OlympiadResultInstance> {
        const result = this.silentGetOne_(id);

        if (!result) {
            throw new OlympiadResultNotFound(id);
        }

        return result;
    }

    public async getAllBySchoolId(
        schoolId: number
    ): Promise<Array<OlympiadResultInstance>> {
        return await OlympiadResultModel.findAll({
            where: {
                schoolId: schoolId
            },
            include: [
                {
                    model: models.Subject,
                    as: 'subject'
                }
            ],
            order: [['year', 'ASC']]
        });
    }

    public async create(
        data: OlympiadResultAttribute
    ): Promise<OlympiadResultInstance> {
        return await OlympiadResultModel.create(data);
    }

    public async delete(id: number) {
        const resultInstance = await this.getOne(id);
        await resultInstance.destroy();
    }

    /**
     * Get only unique subjects
     */
    public async getUniqueSubjects(): Promise<Array<OlympiadResultInstance>> {
        return await(OlympiadResultModel.findAll(
            {
                attributes: [
                    [Sequelize.literal('DISTINCT "subject_id"'), 'subjectId']
                ],
                order: [['subjectId', 'ASC']]
            }
        ));
    }

    /**
     * Search over all olympiad result by given data
     * It supposed to combination of searchData parameters and schoolId
     * are unique
     */
    public async findByParameters(
        schoolId: number,
        searchData: {
            subjectId: number,
            class: number,
            type: string,
            year: number
        }
    ): Promise<OlympiadResultInstance> {
        return await OlympiadResultModel.findOne({
            where: {
                $and: {
                    schoolId: schoolId,
                    type: searchData.type,
                    subjectId: searchData.subjectId,
                    year: searchData.year
                }
            }
        });
    }

    /**
     * Get one olympiad result without throwing not found error
     */
    private async silentGetOne_(id: number): Promise<OlympiadResultInstance> {
        return await OlympiadResultModel.findById(id);
    }
}

export const service = new OlympiadResultService();
