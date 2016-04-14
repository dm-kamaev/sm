goog.provide('sm.bDataBlock.DataBlock');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.bDataBlock.View');

/**
 * DataBlock
 * @param {Object=} opt_view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bDataBlock.DataBlock = function(opt_view, opt_params, opt_domHelper) {
    goog.base(this, opt_view, opt_params, opt_domHelper);
};
goog.inherits(sm.bDataBlock.DataBlock, cl.iControl.Control);
