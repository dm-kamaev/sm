import * as Sequelize from 'sequelize/v3';

export interface UserDataAttributes {
    id?: number;
    userType: string;
    grade: number;
    yearGraduate: number;
    userId: number;
    key: string;
    username: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserDataInstance
    extends Sequelize.Instance<UserDataAttributes>, UserDataAttributes {}
