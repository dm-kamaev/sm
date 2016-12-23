'use strict';

// view for comment
// author: dm-kamaev

const commentView = {};

commentView.comment = function(comment) {
    return {
        text: comment.text,
        author: comment.author,
        socialId: comment.socialId,
        socialType: comment.socialType,
        category: comment.userType,
        score: comment.totalScore,
        updatedAt: comment.updatedAt,
    };
};

commentView.comments = function(comments) {
    return comments.map(comment => commentView.comment(comment));
};



module.exports = commentView;
