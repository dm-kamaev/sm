import * as Sequelize from 'sequelize/v3';

import {ProgramInstance} from './program';

export interface ProgramSimilarAttribute {
    id?: number;
    mainProgramId?: number;
    relatedProgramId?: number;
    createdAt?: string;
    updatedAt?: string;
    relatedProgram?: ProgramInstance;
};

export interface ProgramSimilarInstance
    extends Sequelize.Instance<ProgramSimilarAttribute>,
        ProgramSimilarAttribute {};
