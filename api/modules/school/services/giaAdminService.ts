'use strict';

// author: dm-kamaev
// service gia admin for school

const sequelize = require('../../../../app/components/db.js');

import SchoolModel from '../models/school';
import {SchoolInstance} from '../models/school';
import SpecializedClassTypeModel from '../models/specializedClassType';
import {SpecializedClassTypeInstance} from '../models/specializedClassType';

import GiaResultModel from '../../study/models/giaResult';
import {GiaResultInstance} from '../../study/models/giaResult';

import SubjectModel from '../../study/models/subject';
import {SubjectInstance} from '../../study/models/subject';


import {SchoolProfileNameIsShorter} from
    './exceptions/SchoolProfileNameIsShorter';

import {
    ProfileGetList,
    ProfileData,
} from '../interfaces/ProfileAdmin';


class GiaAdminService {
    public readonly name: string = 'giaAdminService';

    public async getList(schoolId: number): Promise<GiaResultInstance[]> {
        const giaResults = await GiaResultModel.findAll({
            attributes: ['id', 'count', 'result', 'schoolId', 'subjectId'],
            where: {
                schoolId,
            }
        });
        const subjectIds: Array<number> =
            giaResults.map((giaResult): number => giaResult.subjectId);

        console.log('subjectIds=', subjectIds);
        const subjects = await SubjectModel.findAll({
            attributes: ['id', 'displayName'],
            where: {
                id: {
                    $in: subjectIds
                }
            }
        });
        const hashSubjectName = {};
        subjects.forEach(subject =>
            hashSubjectName[subject.id] = subject.displayName
        );
        const res = giaResults.map(giaResult => {
            return {
                id: giaResult.id,
                subject: hashSubjectName[giaResult.subjectId] || '',
                year: 2015,
                result: Number((giaResult.result || 0).toFixed(1)),
            };
        });
        console.log('hashSubjectName=', hashSubjectName);
        return res;
    }


    public async getById(
        schoolId: number,
        giaResultId: number
    ): Promise<any> {
        const list: any = await this.getList(schoolId);
        return list.find(giaResult => giaResult.id === giaResultId) || {};
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
const giaAdminService = new GiaAdminService();
export {giaAdminService};
