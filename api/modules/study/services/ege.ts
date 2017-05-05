import * as lodash from 'lodash';

const redis = require('../../../../app/components/redis');

const egeSubjectsOrder: string[] =
    require('../views/constants/egeSubjectsOrder');
const universityEgeSubjectsOrder: string[] =
    require('../views/constants/universityEgeSubjectsOrder');

import {
    Model as SubjectModel,
    SubjectAttribute,
    SubjectInstance
} from '../models/subject';

const UNIVERSITY_TYPE = 'university';
const EGE_SUBJECTS = 'study.egeSubjects';
const UNIVERSITY_EGE_SUBJECTS = 'study.universityEgeSubjects';
const CACHE_TIME = 60 * 60 * 24;

class EgeService {
    public async getAllOrdered(type?: string): Promise<SubjectAttribute[]> {
        const redisKey: string  = type === UNIVERSITY_TYPE ?
            UNIVERSITY_EGE_SUBJECTS :
            EGE_SUBJECTS;

        let egeSubjects = await redis.get(redisKey);
        if (!egeSubjects) {
            egeSubjects = await this.getAllOrderedDb(type);

            redis.set(redisKey, egeSubjects, CACHE_TIME);
        }
        return egeSubjects;
    }

    private async getAllOrderedDb(
            subjectsType?: string): Promise<SubjectAttribute[]> {
        const orderedSubjects = subjectsType === UNIVERSITY_TYPE ?
            universityEgeSubjectsOrder :
            egeSubjectsOrder;
        const subjects = await SubjectModel.findAll();
        return orderedSubjects.map(egeSubjectName =>
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
