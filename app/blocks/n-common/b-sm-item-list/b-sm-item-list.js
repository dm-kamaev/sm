goog.provide('sm.bSmItemList.SmItemList');

goog.require('cl.iControl.Control');
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
    var ItemList = sm.bSmItemList.SmItemList,
        View = sm.bSmItemList.View;


    /**
     * @override
     */
    ItemList.prototype.decorateInternal = function(element) {
        ItemList.base(this, 'decorateInternal', element);

        this.initItems_();
    };


    /**
     * Add item to top
     * @param {Object} data
     */
    ItemList.prototype.addItemTop = function(data) {
        this.getView().addItem(data, 0);
        this.initItems_();
    };


    /**
     * Add item to bottom
     * @param {Object} data
     */
    ItemList.prototype.addItemBottom = function(data) {
        var index = this.items_.length;

        this.getView().addItem(data, index);
        this.initItems_();
    };


    /**
     * Remove item
     * @param {sm.bSmItem.SmItem|sm.bSmItem.SmItemEntity} item
     */
    ItemList.prototype.removeItem = function(item) {
        this.removeChild(item);

        var domElement = item.getElement();
        this.getView().removeItem(domElement);

        this.initItems_();
    };


    /**
     * Show next hidden items and hide shown items (equal count Items Per Page)
     */
    ItemList.prototype.showNextPage = function() {
        var countPage = this.getView().getCountPage();

        if (this.params.pageNumber < countPage) {
            this.params.pageNumber++;
            this.getView().setPage(this.params.pageNumber);
        }
    };


    /**
     * Show previous hidden items and hide shown items
     * (equal count Items Per Page)
     */
    ItemList.prototype.showPreviousPage = function() {
        var countPage = this.getView().getCountPage();

        if (0 <= this.params.pageNumber) {
            this.params.pageNumber--;
            this.getView().setPage(this.params.pageNumber);
        }
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
