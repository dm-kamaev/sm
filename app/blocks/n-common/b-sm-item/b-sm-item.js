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
    var Item = sm.bSmItem.SmItem;
    var View = sm.bSmItem.View;

    /**
     * @typedef {sm.bSmItem.View.RenderParams}
     */
    sm.bSmItem.SmItem.RenderParams;


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string, number, Object)>} rawParams
     * @return {sm.bSmItem.smItem.RenderParams}
     */
    Item.getRenderParams = function(rawParams) {
        return View.getRenderParams(rawParams);
    };


    /**
     * Get item id
     * @return {number}
     */
    Item.prototype.getItemId = function() {
        return this.params.id;
    };
});  // goog.scope
