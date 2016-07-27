goog.provide('sm.lDoc.nDemo.bBlockFeedbackModal.BlockFeedbackModal');

goog.require('sm.lSchool.bFeedbackModal.FeedbackModal');


/**
 * Block review documentation
 * @constructor
 */
sm.lDoc.nDemo.bBlockFeedbackModal.BlockFeedbackModal = function(root) {
    //if (root) {
    //    var bouton = goog.dom.getElementByClass(
    //        'b-bouton_feedback-opener',
    //        root
    //    );
    //
    //    if (bouton) {
    //        this.modal_ = new sm.lSchool.bFeedbackModal.FeedbackModal();
    //        this.modal_.render();
    //
    //        goog.events.listen(
    //            bouton,
    //            goog.events.EventType.CLICK,
    //            this.onClick_,
    //            false,
    //            this
    //        );
    //    }
    //}
};

goog.scope(function() {
    var BlockFeedbackModal =
        sm.lDoc.nDemo.bBlockFeedbackModal.BlockFeedbackModal;

    BlockFeedbackModal.prototype.onClick_ = function (event) {
       // this.modal_.show();
    };
});
