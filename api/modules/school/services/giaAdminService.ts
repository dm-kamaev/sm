'use strict';

// author: dm-kamaev
// service gia admin for school

import {
    Model as GiaResultModel,
    GiaResultInstance
} from '../../study/models/giaResult';

import {
    Model as SubjectModel,
    SubjectInstance
} from '../../study/models/subject';

import {ExamDataAlreadyExistBySubject} from
    './exceptions/ExamDataAlreadyExistBySubject';

import {
    GiaResult,
    GiaResultUpdate,
} from '../interfaces/GiaAdmin';


class GiaAdminService {
    public readonly name: string = 'giaAdminService';

    public async getList(schoolId: number): Promise<GiaResult[]> {
        let giaResults: GiaResultInstance[];
        giaResults = await GiaResultModel.findAll({
            attributes: [
                'id', 'count', 'result', 'schoolId', 'subjectId', 'year'
            ],
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
        res = giaResults.map((giaResult: GiaResultInstance): GiaResult => {
            return {
                id: giaResult.id,
                subject: hashSubjectName[giaResult.subjectId] || '',
                year: giaResult.year,
                averageResult: Number((giaResult.result || 0).toFixed(1)),
                passedCount: giaResult.count || 0,
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
        giaResult: {
          subjectId: number,
          year: number,
          averageResult: number,
          passedCount: number
        }
    ): Promise<GiaResultInstance> {
        const subjectId: number = giaResult.subjectId;
        const year: number = giaResult.year;
        const isExistDataBySubject: boolean =
            await this.checkExistDataBySubject({
                schoolId,
                subjectId,
                year
            });
        if (isExistDataBySubject) {
            throw new ExamDataAlreadyExistBySubject(
                subjectId,
                'gia'
            );
        }
        return await GiaResultModel.create({
            schoolId,
            subjectId,
            year,
            result: giaResult.averageResult,
            count: giaResult.passedCount
        });
    }


    public async update(
        schoolId: number,
        giaId: number,
        giaResult: {
          subjectId: number,
          year: number,
          averageResult: number,
          passedCount: number
        }
    ): Promise<GiaResultUpdate | null> {
        let res: GiaResultUpdate | null = null;
        let gia: [number, GiaResultInstance[]];
        const subjectId: number = giaResult.subjectId;
        const year: number = giaResult.year;
        const isExistDataBySubject: boolean =
            await this.checkExistDataBySubject({
                schoolId,
                subjectId,
                year,
                giaId,
            });
        if (isExistDataBySubject) {
            throw new ExamDataAlreadyExistBySubject(
                subjectId,
                'gia'
            );
        }

        gia = await GiaResultModel.update({
            schoolId,
            subjectId,
            year,
            result: giaResult.averageResult,
            count: giaResult.passedCount
        }, {
            where: {
                id: giaId
            },
            returning: true
        });

        if (gia && gia[0]) {
            const giaData: GiaResultInstance = gia[1][0];
            res = {
                id: giaData.id,
                schoolId: giaData['school_id'],
                subjectId: giaData['subject_id'],
                year: giaData.year,
                passedCount: giaData.count,
                averageResult: giaData.result,
            };
        }
        return res;
    }


    public async delete(
        schoolId: number,
        giaId: number
    ): Promise<number> {
        return await GiaResultModel.destroy({
            where: {
                id: giaId,
                schoolId,
            }
        });
    }

    // check exist data for gia by subject and year
    private async checkExistDataBySubject(params: {
        schoolId: number,
        subjectId: number,
        year: number,
        giaId?: number
    }): Promise<boolean> {
        let res: boolean = false;
        let giaBySubject: GiaResultInstance | null;
        const schoolId = params.schoolId,
        subjectId = params.subjectId,
        year = params.year,
        giaId = params.giaId;
        const isUpdate = Boolean(giaId);
        giaBySubject = await GiaResultModel.findOne({
            attributes: ['id'],
            where: {
                schoolId,
                subjectId,
                year,
            }
        });
        if (isUpdate) {
            // if not updated itself
            if (giaBySubject && giaId !== giaBySubject.id) {
                res = true;
            }
        } else {
            res = Boolean(giaBySubject);
        }
        return res;
    }
};
export const giaAdminService = new GiaAdminService();
