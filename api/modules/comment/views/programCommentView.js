"use strict";
/**
 * @fileOverview View for university comment
 */
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../user/views/user");
class ProgramCommentView {
    render(programComment) {
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
    renderList(programComments) {
        return programComments.map(comment => this.render(comment));
    }
    adminRender(programComment, user) {
        const userData = programComment.userData;
        const renderedUser = user_1.userView.renderCommentUser(user);
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
    adminListRender(programComments, users) {
        return programComments.map(comment => {
            const user = users.find(userData => userData.id === comment.userData.userId);
            return this.adminRender(comment, user);
        });
    }
    renderTotalScore_(programComment) {
        return programComment.rating ?
            programComment.rating.totalScore :
            null;
    }
    renderScore_(programComment) {
        return programComment.rating ?
            programComment.rating.score :
            null;
    }
}
exports.programCommentView = new ProgramCommentView();
