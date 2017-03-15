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
            universityComment: ProgramCommentInstance
    ): BackendProgramComment {
        const userData = universityComment.userData;
        return {
            id: universityComment.id,
            pros: universityComment.pros,
            cons: universityComment.cons,
            advice: universityComment.advice,
            score: this.renderScore_(universityComment),
            totalScore: this.renderTotalScore_(universityComment),
            userType: userData.userType,
            grade: userData.grade,
            yearGraduate: userData.yearGraduate,
            userId: userData.userId
        };
    }

    public renderList(
            universityComments: Array<ProgramCommentInstance>
    ): Array<BackendProgramComment> {
        return universityComments.map(comment => this.render(comment));
    }

    public adminRender(
            universityComment: ProgramCommentInstance,
            user: UserAttributes
    ): AdminProgramComment {
        const userData = universityComment.userData;
        const renderedUser = userView.renderCommentUser(user);
        return {
            id: universityComment.id,
            pros: universityComment.pros,
            cons: universityComment.cons,
            advice: universityComment.advice,
            totalScore: this.renderTotalScore_(universityComment),
            userType: userData.userType,
            grade: userData.grade,
            yearGraduate: userData.yearGraduate,
            username: renderedUser.name,
            socialId: renderedUser.socialId,
            socialType: renderedUser.socialType
        };
    }

    public adminListRender(
        universityComments: Array<ProgramCommentInstance>,
        users: Array<UserAttributes>
    ): Array<AdminProgramComment> {
        return universityComments.map(comment => {
            const user = users.find(
                userData => userData.id === comment.userData.userId
            );

            return this.adminRender(comment, user);
        });
    }

    private renderTotalScore_(
            universityComment: ProgramCommentInstance): number | null {
        return universityComment.rating ?
            universityComment.rating.totalScore :
            null;
    }

    private renderScore_(
            universityComment: ProgramCommentInstance
    ): Array<number> | null {
        return universityComment.rating ?
            universityComment.rating.score :
            null;
    }
}

export const programCommentView = new ProgramCommentView();
