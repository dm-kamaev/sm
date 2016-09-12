goog.provide('sm.lInformation.bFeedbackBoard.FeedbackBoard');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.lInformation.bFeedbackBoard.View');



/**
 * Feedback Board
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.lInformation.bFeedbackBoard.FeedbackBoard = function(view, opt_domHelper) {
    sm.lInformation.bFeedbackBoard.FeedbackBoard.base(this, 'constructor', view,
        opt_domHelper);
};
goog.inherits(
    sm.lInformation.bFeedbackBoard.FeedbackBoard,
    cl.iControl.Control
);


goog.scope(function() {
    var FeedbackBoard = sm.lInformation.bFeedbackBoard.FeedbackBoard,
        View = sm.lInformation.bFeedbackBoard.View;
});  // goog.scope
