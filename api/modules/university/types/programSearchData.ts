import * as Sequelize from 'sequelize/v3';

export interface ProgramSearchDataAttribute {
    programId: number;
    values: Array<number>;
    type: string;
}

export interface ProgramSearchDataInstance extends
        Sequelize.Instance<ProgramSearchDataAttribute>,
        ProgramSearchDataAttribute {
    id: number;
    createdAt: string;
    updatedAt: string;
}
