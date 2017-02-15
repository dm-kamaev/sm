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

    /**
     * Link Instance
     * @type {sm.bSmLink.SmLink}
     * @protected
     */
    this.nameLink = null;


    /**
     * Badges instances
     * @type {Array<sm.bSmBadge.SmBadge>}
     * @protected
     */
    this.badges = [];
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
     * @param {Element} element
     * @protected
     * @override
     */
    Item.prototype.decorateInternal = function(element) {
        Item.base(this, 'decorateInternal', element);

        this.initBadges_();
        this.initNameLink_();
    };


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string|number|Object)>} rawParams
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
     * Initializes badges instances
     * @private
     */
    Item.prototype.initBadges_ = function() {
        this.badges = this.decorateChildren(
            'smBadge',
            this.getView().getDom().badges
        );
    };


    /**
     * Initializes name link instance
     * @private
     */
    Item.prototype.initNameLink_ = function() {
        var dom = this.getView().getDom();

        this.nameLink = this.decorateChild('smLink', dom.nameLink);
    };
});  // goog.scope
