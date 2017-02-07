'use strict';

import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class ExamDataAlreadyExistBySubject extends Exception {
    private name_: string;
    private subjectId_: number;
    private typeExam_: string;

    constructor(subjectId: number, typeExam: string) {
        const message: string = `
            Already exist data for "${typeExam}" for subject id "${subjectId}"
        `;
        super(message);

        this.name_ = 'ExamDataAlreadyExistBySubject';

        this.subjectId_ = subjectId;
        this.typeExam_ = typeExam;
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
}
export {ExamDataAlreadyExistBySubject};

