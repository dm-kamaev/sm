import * as Sequelize from 'sequelize/v3';

export interface CommentAttributes {
    id?: number;
    text?: string;
    isNoticeSend?: boolean;
    groupId?: number;
    userDataId?: number;
    ratingId?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CommentInstance
    extends Sequelize.Instance<CommentAttributes>, CommentAttributes {
}
