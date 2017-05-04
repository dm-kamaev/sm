'use strict';

// author: dm-kamaev
// ege admin for school

import {EgeResultInstance} from '../../study/models/egeResult.js';

import {examResult, examResultEdit} from '../types/ExamAdmin';

class View {

    public listGia(
        eges: EgeResultInstance[],
        hashSubjectName: { [key: string]: string }
    ): examResult[] {
        if (!eges.length) {
            return [];
        }
        return eges.map((ege: EgeResultInstance) => {
            const subject: string =
                hashSubjectName[ege.subjectId] || '';
            return this.oneEge_(ege, subject);
        });
    }

    public oneEge(
        egeResult: EgeResultInstance | {},
        hashSubjectName: { [key: string]: string }
    ): (examResult | {}) {
        if (!Object.keys(egeResult).length) {
            return {};
        }
        const ege = egeResult as EgeResultInstance;
        const subject: string =
            hashSubjectName[ege.subjectId] || '';
        return this.oneEge_(ege, subject);
    }

    public create(ege: EgeResultInstance): examResultEdit {
        return {
            id: ege.id,
            schoolId: ege.schoolId,
            subjectId: ege.subjectId,
            year: ege.year,
            passedCount: ege.passedCount,
            averageResult: ege.result,
        };
    }

    public update(
        ege: EgeResultInstance | null
    ): (examResultEdit | {}) {
        if (!ege) { return {}; }
        return {
            id: ege.id,
            schoolId: ege['school_id'],
            subjectId: ege['subject_id'],
            year: ege.year,
            passedCount: ege.passedCount,
            averageResult: ege.result,
        };
    }


    private oneEge_(
        ege: EgeResultInstance,
        subject: string
    ): examResult {
        return {
          id: ege.id,
          subject,
          subjectId: ege.subjectId,
          year: ege.year,
          averageResult: Number((ege.result || 0).toFixed(1)),
          passedCount: ege.passedCount || 0,
        };
    }
};
export const view = new View();
