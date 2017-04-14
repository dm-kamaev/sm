import * as lodash from 'lodash';

const redis = require('../../../../app/components/redis');

const egeSubjectsOrder: string[] =
    require('../views/constants/egeSubjectsOrder');

import {
    Model as SubjectModel,
    SubjectAttribute,
    SubjectInstance
} from '../models/subject';

const EGE_SUBJECTS = 'study.egeSubjects';
const CACHE_TIME = 60 * 60 * 24;

class EgeService {
    public async getAllOrdered(): Promise<SubjectAttribute[]> {
        let egeSubjects = await redis.get(EGE_SUBJECTS);
        if (!egeSubjects) {
            egeSubjects = await this.getAllOrderedDb();

            redis.set(EGE_SUBJECTS, egeSubjects, CACHE_TIME);
        }
        return egeSubjects;
    }

    private async getAllOrderedDb(): Promise<SubjectAttribute[]> {
        const subjects = await SubjectModel.findAll();
        return egeSubjectsOrder.map(egeSubjectName =>
            this.findSubjectByName(subjects, egeSubjectName)
        );
    }

    private findSubjectByName(
            subjects: SubjectInstance[], name: string): SubjectInstance {
        return lodash.find(
            subjects,
            subject => subject.name === name
        );
    }
}

export const egeService = new EgeService();
