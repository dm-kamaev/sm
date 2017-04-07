import * as Sequelize from 'sequelize/v3';

export interface UniversitySearchDataAttribute {
    universityId?: number;
    values?: Array<number>;
    type?: string;
}

export interface UniversitySearchDataInstance extends
        Sequelize.Instance<UniversitySearchDataAttribute>,
        UniversitySearchDataAttribute {
    id: number;
    createdAt: string;
    updatedAt: string;
}
