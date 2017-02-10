'use strict';

// author: dm-kamaev
// general for exam school

import {
    Model as SubjectModel,
    SubjectInstance
} from '../../study/models/subject';

import {SchoolSubject} from '../intefaces/ExamAdmin';


class ExamAdminService {
    public readonly name: string = 'examAdminService';

    // for gia and ege
    public async getListSubject(): Promise<SubjectInstance[]> {
        return await SubjectModel.findAll({
            attributes: ['id', 'displayName'],
        });
    }


    // for gia and ege
    public getListExamYear(): Array<number> {
        const years: Array<number> = [];
        let year: number = 2007; // start year
        const currentYear: number = new Date().getFullYear();
        years.push(year);
        while (year < currentYear) {
            year++;
            years.push(year);
        }
        return years;
    }

};
export const examAdminService = new ExamAdminService();

