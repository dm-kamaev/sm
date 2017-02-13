goog.provide('sm.bSummaryBoard.SummaryBoard');

goog.require('cl.iControl.Control');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSummaryBoard.SummaryBoard = function(view, opt_domHelper) {
    sm.bSummaryBoard.SummaryBoard.base(
        this, 'constructor', view, opt_domHelper
    );
};
goog.inherits(sm.bSummaryBoard.SummaryBoard, cl.iControl.Control);


goog.scope(function() {
    var SummaryBoard = sm.bSummaryBoard.SummaryBoard;
});  // goog.scope
