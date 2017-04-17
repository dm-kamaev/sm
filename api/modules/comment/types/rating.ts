import * as Sequelize from 'sequelize/v3';

export interface RatingAttributes {
    id?: number;
    score?: Array<number>;
    totalScore?: number;
    updatedAt?: string;
    createdAt?: string;
}

export interface RatingInstance
    extends Sequelize.Instance<RatingAttributes>, RatingAttributes {}

