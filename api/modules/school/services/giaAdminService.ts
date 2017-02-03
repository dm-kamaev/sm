'use strict';

// author: dm-kamaev
// service gia admin for school

const sequelize = require('../../../../app/components/db.js');

import SchoolModel from '../models/school';
import {SchoolInstance} from '../models/school';
import {Model as SpecializedClassTypeModel}
    from '../models/specializedClassType';
import {SpecializedClassTypeInstance} from '../models/specializedClassType';

import {Model as GiaResultModel} from '../../study/models/giaResult';
import {GiaResultInstance} from '../../study/models/giaResult';

import {Model as SubjectModel} from '../../study/models/subject';
import {SubjectInstance} from '../../study/models/subject';


import {SchoolProfileNameIsShorter} from
    './exceptions/SchoolProfileNameIsShorter';

import {
    ProfileGetList,
    ProfileData,
} from '../interfaces/ProfileAdmin';

interface GiaResult {
    id: number;
    subject: string;
    year: number;
    averageResult: number;
    passedNumber: number;
}

class GiaAdminService {
    public readonly name: string = 'giaAdminService';

    public async getList(schoolId: number): Promise<GiaResult[]> {
        let giaResults: GiaResultInstance[];
        giaResults = await GiaResultModel.findAll({
            attributes: ['id', 'count', 'result', 'schoolId', 'subjectId'],
            where: {
                schoolId,
            }
        });
        const subjectIds: Array<number> =
            giaResults.map((giaResult): number => giaResult.subjectId);

        const subjects: SubjectInstance[] = await SubjectModel.findAll({
            attributes: ['id', 'displayName'],
            where: {
                id: {
                    $in: subjectIds
                }
            }
        });
        const hashSubjectName: { [key: string]: string } = {};
        subjects.forEach(subject =>
            hashSubjectName[subject.id] = subject.displayName
        );

        let res: GiaResult[];
        res = giaResults.map((giaResult: GiaResultInstance):GiaResult => {
            return {
                id: giaResult.id,
                subject: hashSubjectName[giaResult.subjectId] || '',
                year: giaResult.year || 2015,
                averageResult: Number((giaResult.result || 0).toFixed(1)),
                passedNumber: giaResult.count || 0,
            };
        });
        return res;
    }


    public async getById(
        schoolId: number,
        giaResultId: number
    ): Promise<GiaResult | {}> {
        const list: GiaResult[] = await this.getList(schoolId);
        let res: GiaResult | boolean;
        res = list.find((giaResult: GiaResult): boolean =>
            giaResult.id === giaResultId
        );
        return res || {};
    }


    public async create(
        schoolId: number,
        profileData: ProfileData
    ): Promise<any> {
        // const school: SchoolInstance = await this.getSchoolInstance_(schoolId);
        // let specializedClasses: number[][] = [];
        // if (school.specializedClasses) {
        //     specializedClasses = school.specializedClasses;
        //     specializedClasses.push([
        //         profileData.classNumber,
        //         profileData.profileId
        //     ]);
        // } else {
        //     specializedClasses = [[
        //         profileData.classNumber,
        //         profileData.profileId
        //     ]];
        // }

        // const res = await this.updateSchoolSpecializedClass_(
        //     schoolId,
        //     specializedClasses
        // );
        // return res ? res[1][0].specializedClasses : null;
    }


    public async update(
        schoolId: number,
        profileNumber: number,
        profileData: ProfileData
    ): Promise<any> {
        // const school: SchoolInstance = await this.getSchoolInstance_(schoolId);
        // let specializedClasses: number[][] = [];
        // if (school.specializedClasses) {
        //     specializedClasses = school.specializedClasses;
        //     const id: number = profileNumber - 1;
        //     if (specializedClasses[id]) {
        //         specializedClasses[id] = [
        //             profileData.classNumber,
        //             profileData.profileId
        //         ];
        //     }
        // }
        // const res = await this.updateSchoolSpecializedClass_(
        //     schoolId,
        //     specializedClasses
        // );
        // return res ? res[1][0].specializedClasses : null;
    }


    public async delete(
        schoolId: number,
        profileNumber: number
    ): Promise<any> {
        // let responce: number = 0;
        // const school: SchoolInstance = await this.getSchoolInstance_(schoolId);
        // let specializedClasses: number[][] = [];
        // if (school.specializedClasses) {
        //     specializedClasses = school.specializedClasses;
        //     const id: number = profileNumber - 1;
        //     const skipProfileClass = (specializedClass, i): boolean => {
        //         let res: boolean = true;
        //         if (i === id) {
        //             responce = 1;
        //             res = false;
        //         }
        //         return res;
        //     };
        //     specializedClasses = specializedClasses.filter(skipProfileClass);
        // }
        // await this.updateSchoolSpecializedClass_(
        //     schoolId,
        //     specializedClasses
        // );
        // return responce;
    }


};
export const giaAdminService = new GiaAdminService();
