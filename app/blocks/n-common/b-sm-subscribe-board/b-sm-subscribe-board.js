goog.provide('sm.bSmSubscribeBoard.SmSubscribeBoard');

goog.require('cl.iControl.Control');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmSubscribeBoard.SmSubscribeBoard = function(view, opt_domHelper) {
    sm.bSmSubscribeBoard.SmSubscribeBoard.base(
        this, 'constructor', view, opt_domHelper
    );
};
goog.inherits(sm.bSmSubscribeBoard.SmSubscribeBoard, cl.iControl.Control);


goog.scope(function() {
    var SubscribeBoard = sm.bSmSubscribeBoard.SmSubscribeBoard;
});  // goog.scope
