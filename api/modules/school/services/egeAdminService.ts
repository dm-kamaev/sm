'use strict';

// author: dm-kamaev
// service ege admin for school

import {
    Model as EgeResultModel,
    EgeResultInstance
} from '../../study/models/egeResult';

import {
    Model as SubjectModel,
    SubjectInstance
} from '../../study/models/subject';

import {ExamDataAlreadyExistBySubject} from
    './exceptions/ExamDataAlreadyExistBySubject';

import {
    ExamResult, // TODO: replace ExamResult
    ExamResultUpdate, // TODO: ExamResultUpdate
} from '../interfaces/ExamAdmin';


class EgeAdminService {
    public readonly name: string = 'egeAdminService';

    public async getList(schoolId: number): Promise<ExamResult[]> {
        let egeResults: EgeResultInstance[];
        egeResults = await EgeResultModel.findAll({
            attributes: [
                'id', 'passedCount', 'result', 'schoolId', 'subjectId', 'year'
            ],
            where: {
                schoolId,
            }
        });
        const subjectIds: Array<number> =
            egeResults.map((giaResult): number => giaResult.subjectId);

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

        let res: ExamResult[];
        res = egeResults.map((egeResult: EgeResultInstance): ExamResult => {
            return {
                id: egeResult.id,
                subject: hashSubjectName[egeResult.subjectId] || '',
                year: egeResult.year,
                averageResult: Number((egeResult.result || 0).toFixed(1)),
                passedCount: egeResult.passedCount || 0,
            };
        });
        return res;
    }


    public async getById(
        schoolId: number,
        egeId: number
    ): Promise<ExamResult | {}> {
        const list: ExamResult[] = await this.getList(schoolId);
        let res: ExamResult | boolean;
        res = list.find((ege: ExamResult): boolean =>
            ege.id === egeId
        );
        return res || {};
    }


    public async create(
        schoolId: number,
        egeResult: {
          subjectId: number,
          year: number,
          averageResult: number,
          passedCount: number
        }
    ): Promise<EgeResultInstance> {
        const subjectId: number = egeResult.subjectId,
              year: number = egeResult.year;
        const isExistDataBySubject: boolean =
            await this.checkExistDataBySubject({
                schoolId,
                subjectId,
                year
            });
        if (isExistDataBySubject) {
            throw new ExamDataAlreadyExistBySubject(
                subjectId,
                year,
                'ege'
            );
        }
        return await EgeResultModel.create({
            schoolId,
            subjectId,
            year,
            result: egeResult.averageResult,
            passedCount: egeResult.passedCount
        });
    }


    public async update(
        schoolId: number,
        egeId: number,
        egeResult: {
          subjectId: number,
          year: number,
          averageResult: number,
          passedCount: number
        }
    ): Promise<any> {
        let res: ExamResultUpdate | null = null;
        let ege: [number, EgeResultInstance[]];
        const subjectId: number = egeResult.subjectId;
        const year: number = egeResult.year;
        const isExistDataBySubject: boolean =
            await this.checkExistDataBySubject({
                schoolId,
                subjectId,
                year,
                egeId,
            });
        if (isExistDataBySubject) {
            throw new ExamDataAlreadyExistBySubject(
                subjectId,
                year,
                'ege'
            );
        }

        ege = await EgeResultModel.update({
            schoolId,
            subjectId,
            year,
            result: egeResult.averageResult,
            passedCount: egeResult.passedCount
        }, {
            where: {
                id: egeId
            },
            returning: true
        });

        if (ege && ege[0]) {
            const egeData: EgeResultInstance = ege[1][0];
            res = {
                id: egeData.id,
                schoolId: egeData['school_id'],
                subjectId: egeData['subject_id'],
                year: egeData.year,
                passedCount: egeData.passedCount,
                averageResult: egeData.result,
            };
        }
        return res;
    }


    public async delete(
        schoolId: number,
        egeId: number
    ): Promise<number> {
        return await EgeResultModel.destroy({
            where: {
                id: egeId,
                schoolId,
            }
        });
    }

    // check exist data for ege by subject and year
    private async checkExistDataBySubject(params: {
        schoolId: number,
        subjectId: number,
        year: number,
        egeId?: number
    }): Promise<boolean> {
        let res: boolean = false;
        let egeBySubject: EgeResultInstance | null;
        const schoolId = params.schoolId,
        subjectId = params.subjectId,
        year = params.year,
        egeId = params.egeId;
        const isUpdate = Boolean(egeId);
        egeBySubject = await EgeResultModel.findOne({
            attributes: ['id'],
            where: {
                schoolId,
                subjectId,
                year,
            }
        });
        if (isUpdate) {
            // if not updated itself
            if (egeBySubject && egeId !== egeBySubject.id) {
                res = true;
            }
        } else {
            res = Boolean(egeBySubject);
        }
        return res;
    }
};
export const egeAdminService = new EgeAdminService();
