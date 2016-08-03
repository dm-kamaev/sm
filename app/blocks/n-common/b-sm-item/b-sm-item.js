goog.provide('sm.bSmItem.SmItem');

goog.require('cl.iControl.Control');
goog.require('sm.bSmItem.View');



/**
 * Constructor
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


    /**
     * Get item id
     * @return {number}
     */
    Item.prototype.getItemId = function() {
        return this.params.data.id;
    };
});  // goog.scope
