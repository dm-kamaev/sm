goog.provide('sm.lDoc.nDemo.bBlockComments.Comments');

goog.require('sm.lSchool.bComments.Comments');
goog.require('goog.dom');

sm.lDoc.nDemo.bBlockComments.Comments = function() {

    var elements = goog.dom.getElementsByClass(
        sm.lSchool.bComments.Comments.CssClass.ROOT
    );

    var comments;
    for (var i = 0, elem; elem = elements[i]; i++) {
        comments = new sm.lSchool.bComments.Comments();
        comments.decorate(elem);
    }
};

new sm.lDoc.nDemo.bBlockComments.Comments();
