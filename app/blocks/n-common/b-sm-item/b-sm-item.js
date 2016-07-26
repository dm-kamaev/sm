goog.provide('sm.bSmItem.SmItem');

goog.require('cl.iControl.Control');
goog.require('sm.bSmItem.View');



/**
 * Item
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmItem.SmItem = function(view, opt_domHelper) {
    sm.bSmItem.SmItem.base(this, 'constructor', view, opt_domHelper);
};
goog.inherits(sm.bSmItem.SmItem, cl.iControl.Control);


goog.scope(function() {
    var Item = sm.bSmItem.SmItem,
        View = sm.bSmItem.View;
});  // goog.scope
