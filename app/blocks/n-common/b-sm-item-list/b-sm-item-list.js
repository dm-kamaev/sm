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
goog.require('sm.bSmItemList.View');
goog.require('sm.bSmLink.SmLink');



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
     *     sm.bSmLink.SmLink)}
     * @private
     */
    this.items_ = [];


    /**
     * Function for transforming parameters from backend to render template
     * @type {Function}
     * @private
     */
    this.renderParamsTransformator_ = null;
};
goog.inherits(sm.bSmItemList.SmItemList, cl.iControl.Control);


goog.scope(function() {
    var ItemList = sm.bSmItemList.SmItemList;


    /**
     * Possible types of items, which list contain
     * @enum {string}
     */
    ItemList.ItemType = {
        ITEM: 'smItem',
        ITEM_ENTITY: 'smItemEntity',
        LINK: 'SmLink'
    };


    /**
     * @typedef {(
     *     sm.bSmItem.SmItem.RenderParams|
     *     sm.bSmItem.SmItemEntity.RenderParams|
     *     sm.bSmLink.SmLink.RenderParams)}
     */
    ItemList.Item;


    /**
     * @override
     * @protected
     */
    ItemList.prototype.decorateInternal = function(element) {
        ItemList.base(this, 'decorateInternal', element);

        this.initItems_();
        this.initRenderParamsTransformator_(this.params.itemType);
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
        goog.array.forEach(data, this.addItem, this);

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
        console.log(renderParams);
        this.getView().addItem(renderParams.data, opt_index);
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

        var items = this.getView().getDom().items,
            type = this.params.itemType,
            instance;

        this.items_ = [];

        for (var i = 0; i < items.length; i++) {
            instance = this.decorateChild(
                type,
                items[i]
            );

            this.items_.push(instance);
        }
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
        transformators[ItemList.ItemType.LINK] =
            sm.bSmLink.SmLink.getRenderParams;

        this.renderParamsTransformator_ = transformators[itemType];
    };
});  // goog.scope
