import * as Sequelize from 'sequelize/v3';

import {UniversityCommentInstance} from './UniversityComment';

export interface CommentGroupAttributes {
    id?: number;
    updatedAt?: string;
    createdAt?: string;
}

export interface CommentGroupInstance
    extends Sequelize.Instance<CommentGroupAttributes>, CommentGroupAttributes {

    universityComments?: Array<UniversityCommentInstance>;
}
