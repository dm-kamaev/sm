import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class ExamNotFound extends Exception {
    public readonly name: string;

    constructor(examId: number) {
        super(`Exam with id = ${examId} not found`);

        this.name = 'ExamNotFoundException';
    }
}
