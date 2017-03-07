import * as Sequelize from 'sequelize/v3';

import {UserDataAttributes, UserDataInstance} from '../../user/types/userData';
import {RatingInstance} from './rating';
import {CommentGroupInstance} from './commentGroup';

export interface UniversityCommentAttributes {
    id?: number;
    pros?: string;
    cons?: string;
    advice?: string;
    isNoticeSend?: boolean;
    commentGroupId?: number;
    userDataId?: number;
    ratingId?: number;
    createdAt?: string;
    updatedAt?: string;
    rating?: RatingInstance;
    userData?: UserDataInstance;
}

export interface UniversityCommentInstance
    extends Sequelize.Instance<UniversityCommentAttributes>,
            UniversityCommentAttributes {
    setRating: Sequelize.BelongsToSetAssociationMixin<RatingInstance, number>;
    setUserData:
        Sequelize.BelongsToSetAssociationMixin<UserDataInstance, number>;
    setCommentGroup:
        Sequelize.BelongsToSetAssociationMixin<CommentGroupInstance, number>;
}

export interface UniversityCommentFullCreateAttributes
        extends UniversityCommentAttributes, UserDataAttributes {
    score: Array<number>;
}

export type AdminUniversityComment = {
    pros: string;
    cons: string;
    advice: string;
    totalScore?: number;
    userType: string;
    grade?: number;
    yearGraduate?: number;
    username?: string;
    socialId: string;
    socialType: string;
};
