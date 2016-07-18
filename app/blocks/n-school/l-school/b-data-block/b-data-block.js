goog.provide('sm.bDataBlock.DataBlock');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.bDataBlock.View');



/**
 * DataBlock
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bDataBlock.DataBlock = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);
};
goog.inherits(sm.bDataBlock.DataBlock, cl.iControl.Control);
