'use strict';

// view for comment
// author: dm-kamaev

const commentView: any = {};

type InputComment = {
    id: number,
    text: string,
    author: string,
    socialId: string,
    socialType: string,
    userType: string,
    totalScore: number,
    updatedAt: string,
};

interface OutComment {
    id: number;
    text: string;
    author: string;
    socialId: string;
    socialType: string;
    category: string;
    score: number;
    updatedAt: string;
}

commentView.comment = function(comment: InputComment): OutComment {
    return {
        id: comment.id,
        text: comment.text,
        author: comment.author,
        socialId: comment.socialId,
        socialType: comment.socialType,
        category: comment.userType,
        score: comment.totalScore,
        updatedAt: comment.updatedAt,
    };
};


commentView.comments = function(comments: InputComment[]): OutComment[] {
    return comments.map(comment => commentView.comment(comment));
};

export {commentView};
