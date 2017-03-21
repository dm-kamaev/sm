import {
    Model as ProgramMajorModel,
    ProgramMajorInstance,
    ProgramMajorAttribute
} from '../models/ProgramMajor';

import {ProgramMajorAdmin} from '../types/programMajor';

const CourseTypeModel = require('../../course/models/CourseType').Model;

const EXCLUDE_ATTRIBUTES = ['created_at', 'updated_at'];

class ProgramMajor {
    public async search(name: string): Promise<Array<ProgramMajorInstance>> {
        return ProgramMajorModel.findAll({
            attributes: {exclude: EXCLUDE_ATTRIBUTES},
            where: {
                name: {
                    $ilike: `%${name}%`
                }
            }
        });
    }

    public async getAll(): Promise<Array<ProgramMajorInstance>> {
        return ProgramMajorModel.findAll({
            attributes: {exclude: EXCLUDE_ATTRIBUTES},
            include: [{
                attributes: ['id'],
                model: CourseTypeModel,
                as: 'courseTypes'
            }]
        });
    }

    public async get(id: number): Promise<ProgramMajorInstance> {
        return ProgramMajorModel.findOne({
            attributes: {exclude: EXCLUDE_ATTRIBUTES},
            where: {id},
            include: [{
                attributes: ['id'],
                model: CourseTypeModel,
                as: 'courseTypes'
            }]
        });
    }

    public async create(
            data: ProgramMajorAdmin): Promise<ProgramMajorInstance> {
        const programMajor = await ProgramMajorModel.create({
            name: data.name
        });
        programMajor.setCourseTypes(data.courseTypes);
        return programMajor;
    }

    public async update(id: number, data: ProgramMajorAdmin):
            Promise<ProgramMajorInstance> {
        const programMajor = await ProgramMajorModel.findById(id);
        await programMajor.update({name: data.name});
        programMajor.setCourseTypes(data.courseTypes);
        return programMajor;
    }

    public async delete(id: number) {
        return ProgramMajorModel.destroy({
            where: {id}
        });
    }
}

export const service = new ProgramMajor();
