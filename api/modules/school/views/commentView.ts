'use strict';

// view for comment
// author: dm-kamaev

const commentView:any = {};

interface IcommentInput {
    id: number,
    text: string,
    author: string,
    socialId: string,
    socialType: string,
    userType: string,
    totalScore: number,
    updatedAt: string,
}

interface IcommentOut {
    id: number,
    text: string,
    author: string,
    socialId: string,
    socialType: string,
    category: string,
    score: number,
    updatedAt: string,
}

commentView.comment = function(comment:IcommentInput):IcommentOut {
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


commentView.comments = function(comments:IcommentInput[]):IcommentOut[] {
    return comments.map(comment => commentView.comment(comment));
};

export default commentView;
