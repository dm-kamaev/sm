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
     * @typedef {sm.bSmItem.View.DataParams}
     */
    sm.bSmItem.SmItem.DataParams;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    Item.Event = {
        CLICK: View.Event.CLICK
    };


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string, number, Object)>} rawParams
     * @return {sm.bSmItem.smItem.RenderParams}
     */
    Item.getRenderParams = function(rawParams) {
        return View.getRenderParams(rawParams);
    };


    /**
     * Get data to send analytics
     * @return {Object}
     * @public
     */
    Item.prototype.getAnalyticsData = function() {
        return {
            'id': this.params.id,
            'name': this.params.name,
            'category': this.params.category
        };
    };


    /**
     * Get item id
     * @return {number}
     * @public
     */
    Item.prototype.getItemId = function() {
        return this.params.id;
    };


    /**
     * @override
     * @protected
     */
    Item.prototype.enterDocument = function() {
        Item.base(this, 'enterDocument');

        this.initViewListeners();
    };


    /**
     * Initializes listeners for view
     * @protected
     */
    Item.prototype.initViewListeners = function() {
        this.autoDispatch(View.Event.CLICK);
    };
});  // goog.scope
