'use strict';

// author: dm-kamaev
// service profile admin for school

import * as lodash from 'lodash';
import {Model} from '../models/school';
import {SchoolInstance} from '../models/school';
import {
    Model as SpecializedClassTypeModel,
    SpecializedClassTypeInstance
} from '../models/specializedClassType';

import {service as specializedClassService}
    from '../services/specializedClasses';

import {SchoolProfileNameIsShorter} from
    './exceptions/SchoolProfileNameIsShorter';

type profileData = {
    classNumber: number;
    profileId: number;
};


type getList = {
    specializedClasses: number[][] | Array<undefined>;
    hashClassType: { [key: string]: string }
};

class ProfileAdminService {
    public readonly name: string = 'profileAdminService';

    public async getList(schoolId: number): Promise<getList> {
        const school: SchoolInstance = await this.getSchoolInstance_(schoolId);
        const res: getList = { specializedClasses: [], hashClassType: {} };
        const specializedClasses: number[][] | null = school.specializedClasses;
        if (specializedClasses) {
            const hashClassType: { [key: string]: string }
                = await this.getHashClassType_();
            res.specializedClasses = specializedClasses;
            res.hashClassType = hashClassType;
        }
        return res;
    }


    public async getById(
        schoolId: number,
        profileNumber: number
    ): Promise<{
        specializedClass: number[],
        hashClassType: { [key: string]: string }
    }> {
        const data: getList = await this.getList(schoolId);
        const specializedClasses: number[][] | Array<undefined>
            = data.specializedClasses;
        ;
        return {
            specializedClass: specializedClasses[profileNumber - 1] || [],
            hashClassType: data.hashClassType
        };
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
    profileData: profileData
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
        profileData: profileData
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
        return await Model.update({
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
        return await Model.findOne({
            where: {
                id: schoolId
            }
        });
    }


    // get hash { classType.id: classType.name }
    private async getHashClassType_(): Promise<{[key: string]: string}> {
        const classTypes: SpecializedClassTypeInstance[]
            = await specializedClassService.getAllTypes();
        const hashClassType: { [key: string]: string } = {};
        classTypes.forEach((classType: SpecializedClassTypeInstance) => {
            hashClassType[classType.id] = classType.name;
        });
        return hashClassType;
    }


    private capitalize_(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
};

export const profileAdminService = new ProfileAdminService();
