'use strict';

// author: dm-kamaev
// view gia for school

import {GiaResultInstance} from '../../study/models/giaResult';

import {examResult, examResultEdit} from '../intefaces/ExamAdmin';

class View {

    public listGia(
        gias: GiaResultInstance[],
        hashSubjectName: { [key: string]: string }
    ): examResult[] {
        if (!gias) {
            return [];
        }
        return gias.map((gia) => {
            const subject: string =
                hashSubjectName[gia.subjectId] || '';
            return this.oneGia_(gia, subject);
        });
    }

    public oneGia(
        giaResult: GiaResultInstance | {},
        hashSubjectName: { [key: string]: string }
    ): examResult | {} {
        if (!Object.keys(giaResult).length) {
            return {};
        }
        const gia = giaResult as GiaResultInstance;
        const subject: string =
            hashSubjectName[gia.subjectId] || '';
        return this.oneGia_(gia, subject);
    }

    public create(gia: GiaResultInstance): examResultEdit {
        return {
            id: gia.id,
            schoolId: gia.schoolId,
            subjectId: gia.subjectId,
            year: gia.year,
            passedCount: gia.count,
            averageResult: gia.result,
        };
    }

    public update(
        gia: GiaResultInstance | null
    ): (examResultEdit | {}) {
        if (!gia) { return {}; }
        return {
            id: gia.id,
            schoolId: gia['school_id'],
            subjectId: gia['subject_id'],
            year: gia.year,
            passedCount: gia.count,
            averageResult: gia.result,
        };
    }


    private oneGia_(gia, subject) {
        return {
            id: gia.id,
            subject,
            year: gia.year,
            averageResult: Number((gia.result || 0).toFixed(1)),
            passedCount: gia.count || 0,
        };
    }
};
export const view = new View();
