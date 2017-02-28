import * as Sequelize from 'sequelize/v3';

export interface UniversityCommentAttributes {
    id?: number;
    pros?: string;
    cons?: string;
    advice?: string;
    isNoticeSend?: boolean;
    commentGroupId: number;
    userDataId?: number;
    ratingId?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface UniversityCommentInstance
    extends Sequelize.Instance<UniversityCommentAttributes>,
            UniversityCommentAttributes {}
