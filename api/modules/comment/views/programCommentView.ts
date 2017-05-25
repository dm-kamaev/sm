/**
 * @fileOverview View for university comment
 */

import {
    ProgramCommentInstance,
    AdminProgramComment,
    BackendProgramComment
} from '../types/programComment';

import {userView} from '../../user/views/user';

import {UserAttributes} from '../../user/types/user';

class ProgramCommentView {
    public render(
            programComment: ProgramCommentInstance
    ): BackendProgramComment {
        const userData = programComment.userData;
        return {
            id: programComment.id,
            pros: programComment.pros,
            cons: programComment.cons,
            advice: programComment.advice,
            score: this.renderScore_(programComment),
            totalScore: this.renderTotalScore_(programComment),
            userType: userData.userType,
            grade: userData.grade,
            yearGraduate: userData.yearGraduate,
            userId: userData.userId,
            username: userData.username
        };
    }

    public renderList(
            programComments: Array<ProgramCommentInstance>
    ): Array<BackendProgramComment> {
        return programComments.map(comment => this.render(comment));
    }

    public adminRender(
            programComment: ProgramCommentInstance,
            user: UserAttributes
    ): AdminProgramComment {
        const userData = programComment.userData;
        const renderedUser = userView.renderCommentUser(user);

        return {
            id: programComment.id,
            pros: programComment.pros,
            cons: programComment.cons,
            advice: programComment.advice,
            totalScore: this.renderTotalScore_(programComment),
            userType: userData.userType,
            grade: userData.grade,
            yearGraduate: userData.yearGraduate,
            username: renderedUser.name,
            socialId: renderedUser.socialId,
            socialType: renderedUser.socialType,
            updatedAt: programComment.updatedAt
        };
    }

    public adminListRender(
        programComments: Array<ProgramCommentInstance>,
        users: Array<UserAttributes>
    ): Array<AdminProgramComment> {
        return programComments.map(comment => {
            const user = users.find(
                userData => userData.id === comment.userData.userId
            );

            return this.adminRender(comment, user);
        });
    }

    private renderTotalScore_(
            programComment: ProgramCommentInstance): number | null {
        return programComment.rating ?
            programComment.rating.totalScore :
            null;
    }

    private renderScore_(
            programComment: ProgramCommentInstance
    ): Array<number> | null {
        return programComment.rating ?
            programComment.rating.score :
            null;
    }
}

export const programCommentView = new ProgramCommentView();
