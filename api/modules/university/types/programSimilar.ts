import * as Sequelize from 'sequelize/v3';

export interface ProgramSimilarAttribute {
    id?: number;
    programId?: number;
    pageId?: number;
    createdAt?: string;
    updatedAt?: string;
};

export interface ProgramSimilarInstance
    extends Sequelize.Instance<ProgramSimilarAttribute>,
        ProgramSimilarAttribute {};
