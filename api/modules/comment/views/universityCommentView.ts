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

    private renderTotalScore_(
            universityComment: UniversityCommentInstance): number | null {
        return universityComment.rating ?
            universityComment.rating.totalScore :
            null;
    }
}
