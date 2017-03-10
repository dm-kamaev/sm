/**
 * @fileOverview View for university comment
 */

import {
    UniversityCommentInstance,
    AdminUniversityComment
} from '../types/universityComment';

import {userView} from '../../user/views/user';

import {UserAttributes} from '../../user/types/user';

class UniversityCommentView {
    public adminRender(
            universityComment: UniversityCommentInstance,
            user: UserAttributes
    ): AdminUniversityComment {
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
        universityComments: Array<UniversityCommentInstance>,
        users: Array<UserAttributes>
    ): Array<AdminUniversityComment> {
        return universityComments.map(comment => {
            const user = users.find(
                userData => userData.id === comment.userData.userId
            );

            return this.adminRender(comment, user);
        });
    }

    private renderTotalScore_(
            universityComment: UniversityCommentInstance): number | null {
        return universityComment.rating ?
            universityComment.rating.totalScore :
            null;
    }
}

export const universityCommentView = new UniversityCommentView();
