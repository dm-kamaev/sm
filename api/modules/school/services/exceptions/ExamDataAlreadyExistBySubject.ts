'use strict';

import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class ExamDataAlreadyExistBySubject extends Exception {
    private name_: string;
    private subjectId_: number;
    private typeExam_: string;
    private year_: number;

    constructor(
        subjectId: number,
        year: number,
        typeExam: string
    ) {
        const message: string = `
            Already exist data for "${typeExam}" with subject id "${subjectId}"
            and year "${year}"
        `;
        super(message);

        this.name_ = 'ExamDataAlreadyExistBySubject';

        this.subjectId_ = subjectId;
        this.typeExam_ = typeExam;
        this.year_ = year;
    }

    get name(): string {
        return this.name_;
    }

    set name(name: string) {
        this.name_ = name;
    }

    get subjectId(): number {
        return this.subjectId_;
    }

    get typeExam(): string {
        return this.typeExam_;
    }

    get year(): number {
        return this.year_;
    }
}
export {ExamDataAlreadyExistBySubject};

