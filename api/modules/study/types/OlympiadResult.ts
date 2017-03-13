import * as Sequelize from 'sequelize/v3';
import {SubjectInstance} from '../models/subject';

export type olympiadResultUniqueData = {
    subjectId: number;
    class: number;
    type: string;
    status: string;
    year: number;
};

export interface OlympiadResultAttribute {
    [index: string]: any;
    id?: number;
    schoolId?: number;
    subjectId?: number;
    type?: string;
    stage?: number;
    class?: number;
    status?: string;
    year?: number;
    awardeeAmount?: number;
    subject?: SubjectInstance;
}

export interface OlympiadResultInstance
    extends Sequelize.Instance<OlympiadResultAttribute>,
        OlympiadResultAttribute {}
