goog.provide('sm.bSmInformationBoard.SmInformationBoard');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.bSmInformationBoard.View');



/**
 * Information Board
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmInformationBoard.SmInformationBoard = function(view, opt_domHelper) {
    sm.bSmInformationBoard.SmInformationBoard.base(this, 'constructor', view,
        opt_domHelper);
};
goog.inherits(sm.bSmInformationBoard.SmInformationBoard, cl.iControl.Control);


goog.scope(function() {
    var InformationBoard = sm.bSmInformationBoard.SmInformationBoard,
        View = sm.bSmInformationBoard.View;
});  // goog.scope
