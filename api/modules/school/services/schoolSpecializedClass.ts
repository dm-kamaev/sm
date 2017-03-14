import {
    SchoolSpecializedClassAttribute,
    SchoolSpecializedClassInstance,
    Model as SchoolSpecializedClassModel
} from '../models/schoolSpecializedClass';
import {
    Model as SpecializedClassTypeModel
} from '../models/specializedClassType';

class Service {
    public readonly name: string = 'schoolSpecializedClass';

    public async bulkCreate(
                data: Array<SchoolSpecializedClassAttribute>
            ): Promise<Array<SchoolSpecializedClassInstance>> {
        return SchoolSpecializedClassModel.bulkCreate(data);
    }

    public async getBySchoolId(
            schoolId: number): Promise<Array<SchoolSpecializedClassInstance>> {
        return SchoolSpecializedClassModel.findAll({
            where: {
                schoolId: schoolId
            },
            include: [{
                model: SpecializedClassTypeModel,
                as: 'specializedClassType'
            }]
        });
    }

    public async get(id: number):
            Promise<SchoolSpecializedClassInstance> {
        return SchoolSpecializedClassModel.findOne({
            where: {
                id: id
            },
            include: [{
                model: SpecializedClassTypeModel,
                as: 'specializedClassType'
            }]
        });
    }

    public async create(data: SchoolSpecializedClassAttribute):
            Promise<SchoolSpecializedClassInstance> {
        return SchoolSpecializedClassModel.create(data);
    }

    public async update(id: number, data: SchoolSpecializedClassAttribute):
            Promise<[number, Array<SchoolSpecializedClassInstance>]> {
        return SchoolSpecializedClassModel.update(data, {
            where: {
                id: id
            }
        });
    }

    public async delete(id: number): Promise<number> {
        return SchoolSpecializedClassModel.destroy({
            where: {id: id}
        });
    }
}

export const service = new Service();
