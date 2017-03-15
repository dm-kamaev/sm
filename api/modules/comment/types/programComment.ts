import * as Sequelize from 'sequelize/v3';

import {UserDataAttributes, UserDataInstance} from '../../user/types/userData';
import {RatingInstance} from './rating';
import {CommentGroupInstance} from './commentGroup';

export interface ProgramCommentAttributes {
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

export interface ProgramCommentInstance
    extends Sequelize.Instance<ProgramCommentAttributes>,
            ProgramCommentAttributes {
    setRating: Sequelize.BelongsToSetAssociationMixin<RatingInstance, number>;
    setUserData:
        Sequelize.BelongsToSetAssociationMixin<UserDataInstance, number>;
    setCommentGroup:
        Sequelize.BelongsToSetAssociationMixin<CommentGroupInstance, number>;
}

export interface ProgramCommentFullCreateAttributes {
    pros: string;
    cons: string;
    advice: string;
    userType: string;
    userId?: number;
    grade?: number;
    yearGraduate?: number;
    username?: string;
    score: Array<number>;
}

export type AdminProgramComment = {
    id: number;
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

export type BackendProgramComment = {
    id: number;
    pros: string;
    cons: string;
    advice: string;
    score?: Array<number>;
    totalScore?: number;
    userType: string;
    grade?: number;
    yearGraduate?: number;
    userId: number;
};
