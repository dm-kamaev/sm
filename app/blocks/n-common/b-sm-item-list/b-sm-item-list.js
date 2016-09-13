goog.provide('sm.bSmItemList.SmItemList');

goog.require('cl.iControl.Control');
goog.require('goog.array');
goog.require('goog.dom.classlist');
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


    /**
     * Item instances
     * @type {sm.bSmItem.SmItem|sm.bSmItem.SmItemEntity}
     * @private
     */
    this.items_ = [];
};
goog.inherits(sm.bSmItemList.SmItemList, cl.iControl.Control);


goog.scope(function() {
    var ItemList = sm.bSmItemList.SmItemList;


    /**
     * @typedef {(sm.bSmItem.SmItem.RenderParams|sm.bSmItem.SmItemEntity.RenderParams)}
     */
    ItemList.Item;


    /**
     * @override
     */
    ItemList.prototype.decorateInternal = function(element) {
        ItemList.base(this, 'decorateInternal', element);

        this.initItems_();
    };


    /**
     * Add item to top of list
     * @param {sm.bSmItemList.ItemList.Item} data
     */
    ItemList.prototype.addItemTop = function(data) {
        this.getView().addItem(data, 0);
        this.initItems_();
    };


    /**
     * Add item to bottom of list
     * @param {sm.bSmItemList.ItemList.Item} data
     */
    ItemList.prototype.addItemBottom = function(data) {
        var index = this.items_.length;

        this.getView().addItem(data, index);
        this.initItems_();
    };


    /**
     * Add item to bottom of list
     * @param {Array<sm.bSmItemList.ItemList.Item>} data
     * @public
     */
    ItemList.prototype.addItemsBottom = function(data) {
        goog.array.forEach(data, this.addItemBottom.bind(this));
    };


    /**
     * Remove item from list
     * @param {number} itemId
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
     */
    ItemList.prototype.clear = function() {
        this.removeChildren();
        this.items_ = [];
        this.getView().removeAllItems();
    };


    /**
     * Show next hidden items and hide shown items (equal count Items Per Page)
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
     */
    ItemList.prototype.showFirstPage = function() {
        this.getView().setPage(1);
        this.setPageNumber_(1);
    };


    /**
     * Get true if first page, else get false
     * @return {bool}
     */
    ItemList.prototype.isFirstPage = function() {
        return this.getPageNumber() == 1;
    };


    /**
     * Get true if last page, else get false
     * @return {bool}
     */
    ItemList.prototype.isLastPage = function() {
        return this.getCountPages() == this.getPageNumber();
    };


    /**
     * Get count pages
     * @return {number}
     */
    ItemList.prototype.getCountPages = function() {
        return Math.ceil(
            this.items_.length / this.params.countItemsPerPage
        ) || null;
    };


    /**
     * Get count items
     * @return {number}
     */
    ItemList.prototype.getCountItems = function() {
        return this.items_.length;
    };


    /**
     * Get count items per page
     * @return {number}
     */
    ItemList.prototype.getCountItemsPerPage = function() {
        return this.params.countItemsPerPage || null;
    };


    /**
     * Get page number
     * @return {number}
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
});  // goog.scope
