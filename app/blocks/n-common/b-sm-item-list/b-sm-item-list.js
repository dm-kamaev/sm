/**
 * @fileoverview List with items of different types.
 *
 * Please note, that all public functions like addItems-* require item params
 * 'as is' they comes from backend, i. e. in uncompressed state and transform it
 * due to process of addind item
 */

goog.provide('sm.bSmItemList.SmItemList');

goog.require('cl.iControl.Control');
goog.require('goog.array');
goog.require('goog.dom.classlist');
goog.require('sm.bSmItem.SmItem');
goog.require('sm.bSmItem.SmItemEntity');
goog.require('sm.bSmItemList.Template');
goog.require('sm.bSmItemList.View');
goog.require('sm.bSmLink.SmLink');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.lCourse.bDepartment.Department');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmItemList.SmItemList = function(view, opt_domHelper) {
    sm.bSmItemList.SmItemList.base(this, 'constructor', view, opt_domHelper);


    /**
     * Item instances
     * @type {(sm.bSmItem.SmItem|
     *     sm.bSmItem.SmItemEntity|
     *     sm.bSmItem.SmItemCompact|
     *     sm.bSmLink.SmLink|
     *     sm.lCourse.bDepartment.Department)}
     * @private
     */
    this.items_ = [];


    /**
     * Function for transforming parameters from backend to render template
     * @type {Function}
     * @private
     */
    this.renderParamsTransformator_ = null;


    /**
     * Item config which item list rendered
     * @type {Object}
     * @private
     */
    this.itemConfig_ = {};
};
goog.inherits(sm.bSmItemList.SmItemList, cl.iControl.Control);


goog.scope(function() {
    var ItemList = sm.bSmItemList.SmItemList,
        View = sm.bSmItemList.View;

    var Analytics = sm.iAnalytics.Analytics;


    /**
     * Name of this element in factory
     * @const {string}
     */
    ItemList.NAME = sm.bSmItemList.Template.NAME();


    /**
     * @typedef {(
     *     sm.bSmItem.SmItem.RenderParams|
     *     sm.bSmItem.SmItemEntity.RenderParams|
     *     sm.bSmLink.SmLink.RenderParams|
     *     sm.lCourse.bDepartment.Department.RenderParams
     * )}
     */
    ItemList.Item;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    ItemList.Event = {
        ITEM_CLICK: goog.events.getUniqueId('item-click')
    };


    /**
     * Possible types of items, which list contain
     * @enum {string}
     */
    ItemList.ItemType = {
        ITEM: sm.bSmItem.SmItem.NAME,
        ITEM_ENTITY: sm.bSmItem.SmItemEntity.NAME,
        ITEM_COMPACT: sm.bSmItem.SmItemCompact.NAME,
        LINK: sm.bSmLink.SmLink.NAME,
        DEPARTMENT: sm.lCourse.bDepartment.Department.NAME
    };


    /**
     * @override
     * @public
     */
    ItemList.prototype.enterDocument = function() {
        ItemList.base(this, 'enterDocument');

        this.initItemsListeners_();
    };


    /**
     * Add item to top of list
     * @param {sm.bSmItemList.ItemList.Item} data
     * @public
     */
    ItemList.prototype.addItemTop = function(data) {
        this.addItem(data, 0);
        this.initItems_();
    };


    /**
     * Add item to bottom of list
     * @param {sm.bSmItemList.ItemList.Item} data
     * @public
     */
    ItemList.prototype.addItemBottom = function(data) {
        var index = this.items_.length;

        this.addItem(data, index);
        this.initItems_();
    };


    /**
     * Add items to bottom of list
     * @param {Array<sm.bSmItemList.ItemList.Item>} data
     * @public
     */
    ItemList.prototype.addItemsBottom = function(data) {
        goog.array.forEach(data, function(rawItemData) {
                this.addItem(rawItemData);
        }, this);

        this.initItems_();
    };


    /**
     * Transform params to compressed ones, and use addItem view function
     * @param {Object} rawData
     * @param {number=} opt_index
     * @public
     */
    ItemList.prototype.addItem = function(rawData, opt_index) {
        var renderParams = this.renderParamsTransformator_(rawData);
        this.getView().addItem(renderParams.data, this.itemConfig_, opt_index);
    };


    /**
     * Remove item from list
     * @param {number} itemId
     * @public
     */
    ItemList.prototype.removeItem = function(itemId) {
        var item = this.getItem_(itemId);

        this.removeChild(item);

        var domElement = item.getElement();
        this.getView().removeItem(domElement);

        this.initItems_();
    };


    /**
     * Remove all items from list
     * @public
     */
    ItemList.prototype.clear = function() {
        this.removeChildren();
        this.items_ = [];
        this.getView().removeAllItems();
    };


    /**
     * Show next hidden items and hide shown items (equal count Items Per Page)
     * @public
     */
    ItemList.prototype.showNextPage = function() {
        var pageNumber = this.getPageNumber();

        if (!this.isLastPage()) {
            pageNumber++;

            this.getView().setPage(pageNumber);
            this.setPageNumber_(pageNumber);
        }
    };


    /**
     * Show previous hidden items and hide shown items
     * (equal count Items Per Page)
     * @public
     */
    ItemList.prototype.showPreviousPage = function() {
        var pageNumber = this.getPageNumber();

        if (!this.isFirstPage()) {
            pageNumber--;

            this.getView().setPage(pageNumber);
            this.setPageNumber_(pageNumber);
        }
    };


    /**
     * Show first page of list items (equal count Items Per Page)
     * @public
     */
    ItemList.prototype.showFirstPage = function() {
        this.getView().setPage(1);
        this.setPageNumber_(1);
    };


    /**
     * Get true if first page, else get false
     * @return {boolean}
     * @public
     */
    ItemList.prototype.isFirstPage = function() {
        return this.getPageNumber() == 1;
    };


    /**
     * Get true if last page, else get false
     * @return {boolean}
     * @public
     */
    ItemList.prototype.isLastPage = function() {
        return this.getCountPages() == this.getPageNumber();
    };


    /**
     * Get count pages
     * @return {number}
     * @public
     */
    ItemList.prototype.getCountPages = function() {
        return Math.ceil(
            this.items_.length / this.params.countItemsPerPage
        ) || null;
    };


    /**
     * Get count items
     * @return {number}
     * @public
     */
    ItemList.prototype.getCountItems = function() {
        return this.items_.length;
    };


    /**
     * Get count items per page
     * @return {number}
     * @public
     */
    ItemList.prototype.getCountItemsPerPage = function() {
        return this.params.countItemsPerPage || null;
    };


    /**
     * Get page number
     * @return {number}
     * @public
     */
    ItemList.prototype.getPageNumber = function() {
        return this.params.pageNumber || null;
    };


    /**
     * Send Analytics when shown items
     * nonInteraction - possible values 0 or 1
     * Interval sets the position of the elements for which the analyst goes
     * @param {{
     *    list: string,
     *    action: string,
     *    nonInteraction: number
     * }} params
     * @param {{
     *     start: ?number,
     *     end: ?number
     * }=} opt_interval
     * @public
     */
    ItemList.prototype.sendAnalyticsItemsImpression = function(
        params, opt_interval) {

        var data = this.getAnalyticsItemsData_(params.list, opt_interval);
        Analytics.getInstance().addImpressions(data);

        Analytics.getInstance().sendEvent(
            params.list,
            params.action,
            params.nonInteraction
        );
    };


    /**
     * Send Analytics when user clicks on item
     * @param {number} itemId
     * @param {string} list
     * @public
     */
    ItemList.prototype.sendAnalyticsItemClick = function(itemId, list) {
        var item = this.getItem_(itemId);

        var data = item.getAnalyticsData({
            list: list,
            position: this.items_.indexOf(item) + 1
        });
        Analytics.getInstance().clickProduct(data, list);

        Analytics.getInstance().sendEvent(
            list,
            'click',
            0
        );
    };


    /**
     * @override
     * @protected
     */
    ItemList.prototype.decorateInternal = function(element) {
        ItemList.base(this, 'decorateInternal', element);

        this.initItems_();
        this.initRenderParamsTransformator_(this.params.itemType);

        this.initItemRenderConfig_();
    };


    /**
     * Initializes listeners for items
     * @private
     */
    ItemList.prototype.initItemsListeners_ = function() {
        for (var i = 0; i < this.items_.length; i++) {
            this.getHandler().listen(
                this.items_[i],
                this.generateEventObject_().CLICK,
                this.onItemClick_
            );
        }
    };


    /**
     * Handler item click
     * @param {goog.events.Event} event
     * @private
     */
    ItemList.prototype.onItemClick_ = function(event) {
        var itemId;

        if ((this.params.itemType == ItemList.ItemType.ITEM) ||
            (this.params.itemType == ItemList.ItemType.ITEM_ENTITY)) {
            itemId = event.target.getItemId();
        }

        this.dispatchEvent({
            type: ItemList.Event.ITEM_CLICK,
            data: {
                itemId: itemId
            }
        });
    };


    /**
     * Get Analytics Items Data
     * @param {string=} opt_list
     * @param {{
     *     start: ?number,
     *     end: ?number
     * }=} opt_interval
     * @return {Array<{
     *     id: number,
     *     name: string,
     *     category: string,
     *     position: number
     * }>}
     * @private
     */
    ItemList.prototype.getAnalyticsItemsData_ = function(opt_list,
        opt_interval) {

        var interval = opt_interval || {},
            itemsData = [];

        var start = interval.start || 0,
            end = (interval.end && (interval.end < this.items_.length)) ?
                interval.end :
                this.items_.length;

        for (var i = start; i < end; i++) {
            itemsData.push(this.items_[i].getAnalyticsData({
                list: opt_list,
                position: i + 1
            }));
        }

        return itemsData;
    };


    /**
     * Set page number
     * @param {number} pageNumber
     * @private
     */
    ItemList.prototype.setPageNumber_ = function(pageNumber) {
        this.params.pageNumber = pageNumber;
    };


    /**
     * Get item
     * @param {number} itemId
     * @return {sm.bSmItem.SmItem|sm.bSmItem.SmItemEntity}
     * @private
     */
    ItemList.prototype.getItem_ = function(itemId) {
        var result = this.items_.filter(function(item) {
            return item.getItemId() == itemId;
        });

        return result[0];
    };


    /**
     * Initializes items
     * @private
     */
    ItemList.prototype.initItems_ = function() {
        this.getView().initItems();

        this.items_ = [];

        this.items_ = this.decorateChildren(
            this.params.itemType,
            this.getView().getDom().items
        );
    };


    /**
     * Generate event object for different items
     * @return {Object}
     * @private
     */
    ItemList.prototype.generateEventObject_ = function() {
        var ItemEvent = {};

        ItemEvent[ItemList.ItemType.ITEM] =
            sm.bSmItem.SmItem.Event;
        ItemEvent[ItemList.ItemType.ITEM_ENTITY] =
            sm.bSmItem.SmItemEntity.Event;
        ItemEvent[ItemList.ItemType.ITEM_COMPACT] =
            sm.bSmItem.SmItemCompact.Event;
        ItemEvent[ItemList.ItemType.LINK] =
            sm.bSmLink.SmLink.Event;
        ItemEvent[ItemList.ItemType.DEPARTMENT] =
            sm.lCourse.bDepartment.Department.Event;

        return ItemEvent[this.params.itemType];
    };


    /**
     * Init renderParamsTransformator_ by given item type
     * @param {string} itemType
     * @private
     */
    ItemList.prototype.initRenderParamsTransformator_ = function(itemType) {
        var transformators = {};
            transformators[ItemList.ItemType.ITEM] =
                sm.bSmItem.SmItem.getRenderParams;
            transformators[ItemList.ItemType.ITEM_ENTITY] =
                sm.bSmItem.SmItemEntity.getRenderParams;
            transformators[ItemList.ItemType.ITEM_COMPACT] =
                sm.bSmItem.SmItemCompact.getRenderParams;
            transformators[ItemList.ItemType.LINK] =
                sm.bSmLink.SmLink.getRenderParams;
            transformators[ItemList.ItemType.DEPARTMENT] =
                sm.lCourse.bDepartment.Department.getRenderParams;

        this.renderParamsTransformator_ = transformators[itemType];
    };

    /**
     * Init item render config from itemConfig in params
     * It is needed to use after init renderParamsTransformator_
     * @private
     */
    ItemList.prototype.initItemRenderConfig_ = function() {
        var rawItemConfig = this.params.itemConfig || {};
        var transformedParams = this.renderParamsTransformator_(rawItemConfig);
        this.itemConfig_ = transformedParams.config;
    };

    sm.iCloblFactory.FactoryStendhal.getInstance().register(ItemList.NAME, {
        control: ItemList,
        view: View
    });
});  // goog.scope
