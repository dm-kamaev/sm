goog.provide('sm.bSmFeedbackBoard.SmFeedbackBoard');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.bSmFeedbackBoard.View');



/**
 * Feedback Board
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmFeedbackBoard.SmFeedbackBoard = function(view, opt_domHelper) {
    sm.bSmFeedbackBoard.SmFeedbackBoard.base(this, 'constructor', view,
        opt_domHelper);
};
goog.inherits(sm.bSmFeedbackBoard.SmFeedbackBoard, cl.iControl.Control);


goog.scope(function() {
    var FeedbackBoard = sm.bSmFeedbackBoard.SmFeedbackBoard,
        View = sm.bSmFeedbackBoard.View;
});  // goog.scope
