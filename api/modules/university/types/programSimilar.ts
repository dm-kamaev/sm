import * as Sequelize from 'sequelize/v3';

export interface ProgramSimilarAttribute {
    id?: number;
    mainProgramId?: number;
    relatedProgramId?: number;
    createdAt?: string;
    updatedAt?: string;
};

export interface ProgramSimilarInstance
    extends Sequelize.Instance<ProgramSimilarAttribute>,
        ProgramSimilarAttribute {};
