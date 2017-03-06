import * as Sequelize from 'sequelize/v3';

export interface CommentGroupAttributes {
    id?: number;
    updatedAt?: string;
    createdAt?: string;
}

export interface CommentGroupInstance
    extends Sequelize.Instance<CommentGroupAttributes>, CommentGroupAttributes {
}
