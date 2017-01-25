'use strict';

// author: dm-kamaev
// service admin for school

const sequelize = require('../../../../app/components/db.js');

import SchoolModel from '../models/school';
import {SchoolInstance} from '../models/school';
import SpecializedClassTypeModel from '../models/specializedClassType';
import {SpecializedClassTypeInstance} from '../models/specializedClassType';

// import SchoolNotExistType from './exceptions/SchoolNotExistType';

// import {
//     SchoolDataForCreate,
//     SchoolDataForUpdate,
//     SchoolDataForView
// } from '../interfaces/SchoolAdmin';

interface ProfileGetList {
    id:number;
    class:number;
    profile: string;
}
class ProfileAdminService {
    public readonly name: string = 'profileAdminService';

    public async getList(schoolId: number ): Promise<ProfileGetList[]> {
        const school: SchoolInstance = await this.getSchoolInstance(schoolId);
        let res: ProfileGetList[];
        let specializedClasses: number[][] | null = school.specializedClasses;
        if (specializedClasses) {
            res =
                await this.getListProfileClasses(specializedClasses);
        }
        return Promise.all(res);
    }


    public async getById(
        schoolId: number,
        profileId: number
    ): Promise<ProfileGetList | {}> {
        let list: ProfileGetList[] = await this.getList(schoolId)
        return list[profileId - 1] || {};
    }


    public getListClasses(): Array<number> {
        return [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11
        ];
    }

    private async getSchoolInstance(schoolId: number): Promise<SchoolInstance> {
        return await SchoolModel.findOne({
            where: {
                id: schoolId
            }
        });
    }
    private async getListProfileClasses(
        specializedClasses
    ): Promise<ProfileGetList[]> {
        return specializedClasses.map(async (specializedClass, i) => {
            let specializedClassId: number = specializedClass[1];
            let specializedClassName: string = await this.getSpecializedClassName(specializedClassId);
            return {
                id: i + 1,
                class: specializedClass[0],
                profile: specializedClassName
            };
        });
    }

    private async getSpecializedClassName(
        specializedClassId: number
    ): Promise<string> {
        let specializedClassInstance: SpecializedClassTypeInstance | null;
        specializedClassInstance = await SpecializedClassTypeModel.findOne({
            where: {
                id: specializedClassId,
            }
        });
        let name: string = '';
        if (specializedClassInstance) {
            name = specializedClassInstance.name;
        }
        return name;
    }
};
export default new ProfileAdminService();
