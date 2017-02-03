'use strict';

// author: dm-kamaev
// service profile admin for school

const sequelize = require('../../../../app/components/db.js');

import SchoolModel from '../models/school';
import {SchoolInstance} from '../models/school';
import {Model as SpecializedClassTypeModel}
    from '../models/specializedClassType';
import {SpecializedClassTypeInstance} from '../models/specializedClassType';

import {SchoolProfileNameIsShorter} from
    './exceptions/SchoolProfileNameIsShorter';

import {
    ProfileGetList,
    ProfileData,
} from '../interfaces/ProfileAdmin';


class ProfileAdminService {
    public readonly name: string = 'profileAdminService';

    public async getList(schoolId: number): Promise<ProfileGetList[]> {
        let responce: Promise<ProfileGetList[]> | Array<undefined>;
        const school: SchoolInstance = await this.getSchoolInstance_(schoolId);
        let res: ProfileGetList[];
        const specializedClasses: number[][] | null = school.specializedClasses;
        if (specializedClasses) {
            res =
                await this.getListProfileClasses_(specializedClasses);
            responce = Promise.all(res);
        } else {
            responce = [];
        }
        return responce;
    }


    public async getById(
        schoolId: number,
        profileNumber: number
    ): Promise<ProfileGetList | {}> {
        const list: ProfileGetList[] = await this.getList(schoolId);
        return list[profileNumber - 1] || {};
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

    public async searchProfiles(
        profileName: string
    ): Promise<SpecializedClassTypeInstance[]> {
        if (profileName.length < 2) {
            throw new SchoolProfileNameIsShorter(profileName);
        }
        profileName = this.capitalize_(profileName);
        return await SpecializedClassTypeModel.findAll({
            attributes: [ 'id', 'name' ],
               where: {
                   name: {
                       $like: '%' + profileName + '%'
                   }
               },
               limit: 10,
        });
    }

    public async create(
        schoolId: number,
    profileData: ProfileData
    ): Promise<number[][]> {
        const school: SchoolInstance = await this.getSchoolInstance_(schoolId);
        let specializedClasses: number[][] = [];
        if (school.specializedClasses) {
            specializedClasses = school.specializedClasses;
            specializedClasses.push([
                profileData.classNumber,
                profileData.profileId
            ]);
        } else {
            specializedClasses = [[
                profileData.classNumber,
                profileData.profileId
            ]];
        }

        const res = await this.updateSchoolSpecializedClass_(
            schoolId,
            specializedClasses
        );
        return res ? res[1][0].specializedClasses : null;
    }


    public async update(
        schoolId: number,
        profileNumber: number,
        profileData: ProfileData
    ): Promise<number[][]> {
        const school: SchoolInstance = await this.getSchoolInstance_(schoolId);
        let specializedClasses: number[][] = [];
        if (school.specializedClasses) {
            specializedClasses = school.specializedClasses;
            const id: number = profileNumber - 1;
            if (specializedClasses[id]) {
                specializedClasses[id] = [
                    profileData.classNumber,
                    profileData.profileId
                ];
            }
        }
        const res = await this.updateSchoolSpecializedClass_(
            schoolId,
            specializedClasses
        );
        return res ? res[1][0].specializedClasses : null;
    }


    public async delete(
        schoolId: number,
        profileNumber: number
    ): Promise<number> {
        let responce: number = 0;
        const school: SchoolInstance = await this.getSchoolInstance_(schoolId);
        let specializedClasses: number[][] = [];
        if (school.specializedClasses) {
            specializedClasses = school.specializedClasses;
            const id: number = profileNumber - 1;
            const skipProfileClass = (specializedClass, i): boolean => {
                let res: boolean = true;
                if (i === id) {
                    responce = 1;
                    res = false;
                }
                return res;
            };
            specializedClasses = specializedClasses.filter(skipProfileClass);
        }
        await this.updateSchoolSpecializedClass_(
            schoolId,
            specializedClasses
        );
        return responce;
    }





    private async updateSchoolSpecializedClass_(
        schoolId: number,
        specializedClasses: number[][]
    ): Promise<[number, SchoolInstance[]]> {
        return await SchoolModel.update({
            specializedClasses
        }, {
            where: {
                id: schoolId
            },
            returning: true
        });
    }


    private async getSchoolInstance_(
        schoolId: number
    ): Promise<SchoolInstance> {
        return await SchoolModel.findOne({
            where: {
                id: schoolId
            }
        });
    }


    private async getListProfileClasses_(
        specializedClasses
    ): Promise<ProfileGetList[]> {
        return specializedClasses.map(async(specializedClass, i) => {
            const specializedClassId: number = specializedClass[1];
            const specializedClassName: string =
                await this.getSpecializedClassName_(specializedClassId);
            return {
                id: specializedClassId,
                classNumber: specializedClass[0],
                profile: specializedClassName
            };
        });
    }

    private async getSpecializedClassName_(
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

    private capitalize_(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
};

export const profileAdminService = new ProfileAdminService();
