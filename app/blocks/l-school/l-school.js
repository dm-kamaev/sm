goog.provide('sm.lSchool.School');

goog.require('sm.lSchool.bFeedbackModal.FeedbackModal');


/**
 * School page
 * @constructor
 */
sm.lSchool.School = function(root) {
    this.elements_ = {
        root: root,
        bouton: goog.dom.getElementByClass(
            sm.lSchool.School.CssClass.FEEDBACK_BUTTON,
            root
        )
    };

    this.params_ = jQuery(root).data('params');

    var createCommentUrl = sm.lSchool.School.Url.CREATE_COMMENT.replace(
        ':id',
        this.params_.id
    );

    this.modal_ = new sm.lSchool.bFeedbackModal.FeedbackModal({
        data: {
            url: createCommentUrl
        }
    });
    this.modal_.render();

    this.startListen_();
};


sm.lSchool.School.CssClass = {
    'ROOT': 'l-school',
    'FEEDBACK_BUTTON': 'b-bouton_feedback-opener'
};


sm.lSchool.School.Url = {
    'CREATE_COMMENT': '/api/school/:id/comment'
};


sm.lSchool.School.prototype.startListen_ = function(event) {
    goog.events.listen(
        this.elements_.bouton,
        goog.events.EventType.CLICK,
        this.onClick_.bind(this)
    );
};


sm.lSchool.School.prototype.onClick_ = function(event) {
    this.modal_.show();
};


jQuery(function() {
    var root = goog.dom.getElementByClass(
        sm.lSchool.School.CssClass.ROOT
    );
    new sm.lSchool.School(root);
});
