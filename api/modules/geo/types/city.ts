import * as Sequelize from 'sequelize/v3';

export interface CityAttribute {
    name?: string;
}

export interface CityInstance
    extends Sequelize.Instance<CityAttribute>, CityAttribute {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
}
