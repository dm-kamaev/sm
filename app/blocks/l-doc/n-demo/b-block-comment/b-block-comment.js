goog.provide('sm.lDoc.nDemo.bBlockComment.Comment');

goog.require('sm.lSchool.bComment.Comment');
goog.require('goog.dom');

/**
 * Category Control documentation
 * @constructor
 */
sm.lDoc.nDemo.bBlockComment.Comment = function(){
    console.log('COMMENT DOC CONSTRUCTOR');

    var elements = goog.dom.getElementsByClass(
        sm.lSchool.bComment.Comment.CssClass.ROOT
    );

    var comments;
    for (var i = 0, elem; elem = elements[i]; i++) {
        comments = new sm.lSchool.bComment.Comment();
        comments.decorate(elem);
    }
};

new sm.lDoc.nDemo.bBlockComment.Comment();
