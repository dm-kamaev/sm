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

type getGia = {
    gias?: GiaResultInstance[],
    gia?: GiaResultInstance | {},
    hashSubjectName: { [key: string]: string }
};


class GiaAdminService {
    public readonly name: string = 'giaAdminService';

    public async getList(schoolId: number): Promise<getGia> {
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

        return {
            gias: giaResults,
            hashSubjectName: await this.getHashSubjectName_(subjects)
        };
    }


    public async getById(
        schoolId: number,
        giaId: number
    ): Promise<getGia> {
        const data: getGia = await this.getList(schoolId);
        const gias: GiaResultInstance[] = data.gias;
        let res: GiaResultInstance | boolean;
        res = gias.find((gia: GiaResultInstance): boolean =>
            gia.id === giaId
        );
        return {
            gia: res || {},
            hashSubjectName: data.hashSubjectName
        };
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
                year,
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
    ): Promise<GiaResultInstance | null> {
        let res: GiaResultInstance | null = null;
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
                year,
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
            res = gia[1][0];
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
export const giaAdminService = new GiaAdminService();
