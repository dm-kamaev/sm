goog.provide('sm.lSchool.School');

goog.require('sm.lSchool.bFeedbackModal.FeedbackModal');


/**
 * Block review documentation
 * @constructor
 */
sm.lSchool.School = function() {
    var bouton = goog.dom.getElementByClass(
        sm.lSchool.School.CssClass.FEEDBACK_BUTTON
    );

    this.modal_ = new sm.lSchool.bFeedbackModal.FeedbackModal();
    this.modal_.render();

    goog.events.listen(
        bouton,
        goog.events.EventType.CLICK,
        this.onClick_.bind(this)
    );
};


sm.lSchool.School.CssClass = {
    'ROOT': 'l-school',
    'FEEDBACK_BUTTON': 'b-bouton_feedback-opener'
};


sm.lSchool.School.prototype.onClick_ = function(event) {
    this.modal_.show();
};


jQuery(function() {
    new sm.lSchool.School();
});
