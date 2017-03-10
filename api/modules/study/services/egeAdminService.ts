'use strict';

// author: dm-kamaev
// service ege admin for school

import {
    Model as EgeResultModel,
    EgeResultInstance
} from '../models/egeResult';

import {
    Model as SubjectModel,
    SubjectInstance
} from '../models/subject';

import {ExamDataAlreadyExistBySubject} from
    './exceptions/ExamDataAlreadyExistBySubject';

type getEge = {
    eges?: EgeResultInstance[],
    ege?: EgeResultInstance | {},
    hashSubjectName: { [key: string]: string }
};


class EgeAdminService {
    public readonly name: string = 'egeAdminService';

    public async getList(schoolId: number): Promise<getEge> {
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

        return {
            eges: egeResults,
            hashSubjectName: await this.getHashSubjectName_(subjects)
        };
    }


    public async getById(
        schoolId: number,
        egeId: number
    ): Promise<getEge> {
        const data: getEge = await this.getList(schoolId);
        const eges: EgeResultInstance[] = data.eges;
        let egeResult: EgeResultInstance | boolean;
        egeResult = eges.find((ege: EgeResultInstance): boolean =>
            ege.id === egeId
        );
        return {
            ege: egeResult || {},
            hashSubjectName: data.hashSubjectName
        };
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
    ): Promise<EgeResultInstance | null> {
        let res: EgeResultInstance | null = null;
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
            res = ege[1][0];
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


    // get hash { subject.id: subject.name, }
    private getHashSubjectName_(
        subjects: SubjectInstance[]
    ): { [key: string]: string } {
        const hashSubjectName: { [key: string]: string } = {};
        subjects.forEach(subject =>
            hashSubjectName[subject.id] = subject.displayName
        );
        return hashSubjectName;
    }
};
export const egeAdminService = new EgeAdminService();
