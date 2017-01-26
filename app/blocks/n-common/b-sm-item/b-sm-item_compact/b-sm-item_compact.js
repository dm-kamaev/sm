goog.provide('sm.bSmItem.SmItemCompact');

goog.require('sm.bSmItem.SmItem');
goog.require('sm.bSmItem.ViewCompact');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.bSmItem.SmItem}
 */
sm.bSmItem.SmItemCompact = function(view, opt_domHelper) {
    sm.bSmItem.SmItemCompact.base(this, 'constructor', view, opt_domHelper);
};
goog.inherits(sm.bSmItem.SmItemCompact, sm.bSmItem.SmItem);


goog.scope(function() {
    var Item = sm.bSmItem.SmItemCompact,
        View = sm.bSmItem.ViewCompact;


    /**
     * @typedef {sm.bSmItem.SmItem.RenderParams}
     */
    sm.bSmItem.SmItemCompact.RenderParams;


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string|number|Object)>} rawParams
     * @return {sm.bSmItem.SmItemCompact.RenderParams}
     */
    Item.getRenderParams = function(rawParams) {
        return sm.bSmItem.SmItem.getRenderParams(rawParams);
    };


    /**
     * Event enum
     * @enum {string}
     */
    Item.Event = {
        CLICK: sm.bSmItem.SmItem.Event.CLICK
    };
});  // goog.scope
