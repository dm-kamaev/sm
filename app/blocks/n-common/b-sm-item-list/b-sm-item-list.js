goog.provide('sm.bSmItemList.SmItemList');

goog.require('cl.iControl.Control');
goog.require('sm.bSmItemList.View');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmItemList.SmItemList = function(view, opt_domHelper) {
    sm.bSmItemList.SmItemList.base(this, 'constructor', view, opt_domHelper);
};
goog.inherits(sm.bSmItemList.SmItemList, cl.iControl.Control);


goog.scope(function() {
    var ItemList = sm.bSmItemList.SmItemList,
        View = sm.bSmItemList.View;
});  // goog.scope
