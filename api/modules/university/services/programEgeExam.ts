import {
    Model as ExamModel,
    ProgramEgeExamAttribute,
    ProgramEgeExamInstance
} from '../models/ProgramEgeExam';

import {ProgramEgeExamAdmin} from '../types/programEgeExamAdmin';

import {ExamNotFound} from './exceptions/ExamNotFound';

const subjectService = require('../../study/services/subject');

class ProgramEgeExamService {
    public async getByProgramId(programId: number):
            Promise<Array<ProgramEgeExamAdmin>> {
        const exams: Array<ProgramEgeExamAdmin> = await ExamModel.findAll({
            attributes: {
                exclude: [
                    'created_at', 'updated_at', 'program_id', 'subject_id'
                ]
            },
            where: {
                programId: programId
            },
            raw: true
        });
        const subjects = await subjectService.getByIds(
            exams.map(exam => exam.subjectId)
        ) || [];

        return exams.map(exam => {
            const subject = subjects.find(subject =>
                subject.id == exam.subjectId
            );
            exam.subjectName = subject.displayName;
            return exam;
        });
    }

    public async get(id: number): Promise<ProgramEgeExamAdmin> {
        const exam: ProgramEgeExamAdmin = await ExamModel.findOne({
            attributes: {
                exclude: [
                    'created_at', 'updated_at', 'program_id', 'subject_id'
                ]
            },
            where: {
                id: id
            },
            raw: true
        });
        if (!exam) {
            throw new ExamNotFound(id);
        }
        const subject = await subjectService.get(
            {id: exam.subjectId},
            {count: 'one'}
        );
        exam.subjectName = subject.displayName;
        return exam;
    }

    public async create(data: ProgramEgeExamAttribute):
            Promise<ProgramEgeExamInstance> {
        return ExamModel.create(data);
    }

    public async update(id: number, data: ProgramEgeExamAttribute):
            Promise<[number, Array<ProgramEgeExamInstance>]> {
        return ExamModel.update(data, {
            where: {
                id: id
            }
        });
    }

    public async delete(id: number): Promise<number> {
        return ExamModel.destroy({
            where: {
                id: id
            }
        });
    }
}

const programEgeExamService = new ProgramEgeExamService();

export {programEgeExamService as service};
