goog.provide('sm.bSmItem.SmItem');

goog.require('cl.iControl.Control');
goog.require('sm.bSmItem.Template');
goog.require('sm.bSmItem.View');
goog.require('sm.bSmLink.SmLink');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmItem.SmItem = function(view, opt_domHelper) {
    sm.bSmItem.SmItem.base(this, 'constructor', view, opt_domHelper);

    /**
     * Link Instance
     * @type {sm.bSmLink.SmLink}
     * @protected
     */
    this.nameLink = null;
};
goog.inherits(sm.bSmItem.SmItem, cl.iControl.Control);


goog.scope(function() {
    var Item = sm.bSmItem.SmItem,
        View = sm.bSmItem.View;

    /**
     * Name of this element in factory
     */
    Item.NAME = sm.bSmItem.Template.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(Item.NAME, {
        control: Item,
        view: View
    });

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
     * @param {Element} element
     * @protected
     * @override
     */
    Item.prototype.decorateInternal = function(element) {
        Item.base(this, 'decorateInternal', element);

        this.initNameLink_();
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
     * @param {{
     *     list: ?string,
     *     position: ?number
     * }=} opt_data
     * @public
     */
    Item.prototype.getAnalyticsData = function(opt_data) {
        var data = opt_data || {};

        return {
            'id': this.params.id,
            'name': this.params.name,
            'category': this.params.category,
            'list': data.list,
            'position': data.position
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
     * Get Item Entity Type
     * @return {string}
     * @public
     */
    Item.prototype.getItemEntityType = function() {
        return this.params.type;
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


    /**
     * Initializes name link instance
     * @private
     */
    Item.prototype.initNameLink_ = function() {
        var dom = this.getView().getDom();

        this.nameLink = this.decorateChild(
            sm.bSmLink.SmLink.NAME,
            dom.nameLink
        );
    };
});  // goog.scope
