goog.provide('sm.bSmListPaged.SmListPaged');

goog.require('cl.iControl.Control');
goog.require('sm.bSmItemList.SmItemList');
goog.require('sm.bSmListPaged.Template');
goog.require('sm.bSmListPaged.View');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * List Paged
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmListPaged.SmListPaged = function(view, opt_domHelper) {
    sm.bSmListPaged.SmListPaged.base(this, 'constructor', view, opt_domHelper);


    /**
     * Instance items list
     * @type {sm.bSmItemList.SmItemList}
     * @private
     */
    this.list_ = null;
};
goog.inherits(sm.bSmListPaged.SmListPaged, cl.iControl.Control);


goog.scope(function() {
    var ListPaged = sm.bSmListPaged.SmListPaged,
        View = sm.bSmListPaged.View;

    /**
     * Name of this element in factory
     */
    ListPaged.NAME = sm.bSmListPaged.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(ListPaged.NAME, {
        control: ListPaged,
        view: View
    });

    /**
     * Events enum
     * @enum {string}
     */
    ListPaged.Event = {
        PAGE_CHANGE: goog.events.getUniqueId('pageChange'),
        ITEM_CLICK: sm.bSmItemList.SmItemList.Event.ITEM_CLICK
    };


    /**
     * @override
     * @param {Element} element
     */
    ListPaged.prototype.decorateInternal = function(element) {
        ListPaged.base(this, 'decorateInternal', element);

        this.initList_();
    };


    /**
     * @override
     */
    ListPaged.prototype.enterDocument = function() {
        ListPaged.base(this, 'enterDocument');

        this.initSwitchPageListeners_();
    };


    /**
     * Add item to list
     * @param {Object} data
     */
    ListPaged.prototype.addItem = function(data) {
        this.list_.addItemTop(data);

        if (this.list_.getCountItems() ==
            this.list_.getCountItemsPerPage() + 1) {

            this.getView().setFooterVisibility(true);
        }
        this.setCount_();
        this.setFirstPage();
    };


    /**
     * Remove item from list
     * @param {number} itemId
     */
    ListPaged.prototype.removeItem = function(itemId) {
        this.list_.removeItem(itemId);

        if (this.list_.getCountItems() == this.list_.getCountItemsPerPage()) {
            this.getView().setFooterVisibility(false);
        }
        this.setCount_();
        this.setFirstPage();
    };


    /**
     * Set next page
     */
    ListPaged.prototype.setNextPage = function() {
        this.list_.showNextPage();

        this.getView().setActiveLink(
            true,
            this.getView().getDom().linkPrevious
        );
        this.setInterval_();

        if (this.list_.isLastPage()) {
            this.getView().setActiveLink(
                false,
                this.getView().getDom().linkNext
            );
        }
    };


    /**
     * Set previous page
     */
    ListPaged.prototype.setPreviousPage = function() {
        this.list_.showPreviousPage();

        this.getView().setActiveLink(true, this.getView().getDom().linkNext);
        this.setInterval_();

        if (this.list_.isFirstPage()) {
            this.getView().setActiveLink(
                false,
                this.getView().getDom().linkPrevious
            );
        }
    };


    /**
     * Set first page
     */
    ListPaged.prototype.setFirstPage = function() {
        this.list_.showFirstPage();

        this.getView().setActiveLink(
            true,
            this.getView().getDom().linkNext
        );

        this.getView().setActiveLink(
            false,
            this.getView().getDom().linkPrevious
        );

        this.setInterval_();
    };


    /**
     * If empty return false
     * @return {boolean}
     */
    ListPaged.prototype.isNotEmpty = function() {
        return !!this.list_.getCountItems();
    };


    /**
     * Send Analytics when user clicks on item
     * @param {number} itemId
     * @param {string} list
     * @public
     */
    ListPaged.prototype.sendAnalyticsItemClick = function(itemId, list) {
        this.list_.sendAnalyticsItemClick(itemId, list);
    };


    /**
     * Initializes links Listeners
     * @private
     */
    ListPaged.prototype.initSwitchPageListeners_ = function() {
        this.viewListen(
            View.Event.NEXT_PAGE_CLICK,
            this.onSetNextPageClick_
        );

        this.viewListen(
            View.Event.PREVIOUS_PAGE_CLICK,
            this.onSetPreviousPageClick_
        );
    };



    /**
     * Set next page Click
     * @private
     */
    ListPaged.prototype.onSetNextPageClick_ = function() {
        this.setNextPage();
        this.dispatchEvent(ListPaged.Event.PAGE_CHANGE);
    };


    /**
     * Set previous page Click
     * @private
     */
    ListPaged.prototype.onSetPreviousPageClick_ = function() {
        this.setPreviousPage();
        this.dispatchEvent(ListPaged.Event.PAGE_CHANGE);
    };


    /**
     * Set count
     * @private
     */
    ListPaged.prototype.setCount_ = function() {
        var count = this.list_.getCountItems();
        this.getView().insertCount(count);
    };


    /**
     * Set interval
     * @private
     */
    ListPaged.prototype.setInterval_ = function() {
        var interval = this.calculateInterval_();
        this.getView().insertInterval(interval);
    };


    /**
     * calculate Interval
     * @return {{
     *     firstIndex: number,
     *     lastIndex: number
     * }}
     * @private
     */
    ListPaged.prototype.calculateInterval_ = function() {
        var lastItemIndex,
            firstItemIndex,
            itemsCount = this.list_.getCountItems(),
            currentPage = this.list_.getPageNumber() - 1,
            itemsPerPage = this.list_.getCountItemsPerPage();

        var skippedItemsCount = currentPage * itemsPerPage,
            restItemsCount = itemsCount - skippedItemsCount;

            firstItemIndex = skippedItemsCount + 1;

        if (restItemsCount < itemsPerPage) {
            lastItemIndex = itemsCount;
        } else {
            lastItemIndex = skippedItemsCount + itemsPerPage;
        }

        return {
            firstIndex: firstItemIndex,
            lastIndex: lastItemIndex
        };
    };


    /**
     * Initializes list of items
     * @private
     */
    ListPaged.prototype.initList_ = function() {
        this.list_ = this.decorateChild(
            sm.bSmItemList.SmItemList.NAME,
            this.getView().getDom().list
        );
    };
});  // goog.scope
