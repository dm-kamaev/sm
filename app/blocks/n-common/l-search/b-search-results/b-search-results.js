goog.provide('sm.lSearch.bSearchResults.SearchResults');

goog.require('cl.gButton.Button');
goog.require('cl.iControl.Control');
goog.require('sm.bSmItemList.SmItemList');
goog.require('sm.gDropdown.DropdownListLinks');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');
goog.require('sm.lSearch.bSearchResults.Template');
goog.require('sm.lSearch.bSearchResults.View');


goog.scope(function() {
    var View = sm.lSearch.bSearchResults.View;



    /**
     * SearchResults block
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.lSearch.bSearchResults.SearchResults = function(view, opt_domHelper) {
        sm.lSearch.bSearchResults.SearchResults.base(
            this, 'constructor', view, opt_domHelper
        );

        /**
         * Item list instance
         * @type {sm.bSmItemList.SmItemList}
         * @private
         */
        this.itemList_ = null;

        /**
         * Sort control (dropdown-list-links) instance
         * @type {sm.gDropdown.DropdownListLinks}
         * @private
         */
        this.sort_ = null;

        /**
         * Show more button instance
         * @type {cl.gButton.Button}
         * @private
         */
        this.showMore_ = null;
    };
    goog.inherits(sm.lSearch.bSearchResults.SearchResults, cl.iControl.Control);
    var SearchResults = sm.lSearch.bSearchResults.SearchResults;

    /**
     * Name of this element in factory
     */
    SearchResults.NAME = sm.lSearch.bSearchResults.Template.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(SearchResults.NAME, {
        control: SearchResults,
        view: View
    });

    /**
     * Css class enum
     * @enum {string}
     */
    SearchResults.CssClass = {
        ROOT: View.CssClass.ROOT
    };


    /**
     * List of SearchResults events
     * @enum {string}
     * @const
     */
    SearchResults.Event = {
        SORT_TYPE_CHANGE: sm.gDropdown.DropdownListLinks.Event.ITEM_SELECT,
        SHOW_MORE_CLICK: cl.gButton.Button.Event.CLICK,
        LIST_ITEM_CLICK: sm.bSmItemList.SmItemList.Event.ITEM_CLICK
    };


    /**
     * Possible status enum
     * @enum {string}
     */
    SearchResults.Status = {
        NOT_EMPTY_RESULTS: View.Status.NOT_EMPTY_RESULTS,
        EMPTY_RESULTS: View.Status.EMPTY_RESULTS,
        SEARCH_IN_PROGRESS: View.Status.SEARCH_IN_PROGRESS,
        SORT_IN_PROGRESS: View.Status.SORT_IN_PROGRESS
    };


    /**
     * @override
     * @public
     */
    SearchResults.prototype.enterDocument = function() {
        SearchResults.base(this, 'enterDocument');
    };


    /**
     * Set given status to block
     * @param {sm.lSearch.bSearchResults.SearchResults.Status} status
     * @public
     */
    SearchResults.prototype.setStatus = function(status) {
        this.getView().changeStatus(status);
    };

    /**
     * Update search results: list and header
     * @param {{
     *     items: Array<sm.bSmItem.SmItem.RenderParams>,
     *     countResults: number,
     *     searchText: string
     * }} params
     * @public
     */
    SearchResults.prototype.update = function(params) {
        var status;
        if (params.countResults) {
            this.params.countResults = params.countResults;
            status = SearchResults.Status.NOT_EMPTY_RESULTS;
            this.getView().updateHeader(params.countResults, params.searchText);
            this.replaceItems(params.items);
        } else {
            status = SearchResults.Status.EMPTY_RESULTS;
        }
        this.setStatus(status);
    };


    /**
     * Add given items to bottom of list and hide loader
     * @param {Array<(sm.bSmItem.SmItem.RenderParams|
     * sm.bSmItem.SmItemEntity.RenderParams|
     * sm.bSmLink.SmLink.RenderParams|
     * sm.lCourse.bDepartment.Department.RenderParams)>} items
     * @public
     */
    SearchResults.prototype.addPage = function(items) {
        this.addItems(items);
        this.setLoaderVisibility(false);
    };


    /**
     * Replaces items in results list
     * @param {Array<>} items
     * @public
     */
    SearchResults.prototype.replaceItems = function(items) {
        this.clearList();
        this.addItems(items);
    };


    /**
     * Add items to bottom of list
     * @param {Array<>} items
     * @public
     */
    SearchResults.prototype.addItems = function(items) {
        this.itemList_.addItemsBottom(items);
    };


    /**
     * Clear search results list
     * @public
     */
    SearchResults.prototype.clearList = function() {
        this.itemList_.clear();
    };


    /**
     * Select in sort dropdown initial value
     * @public
     */
    SearchResults.prototype.resetSort = function() {
        this.sort_.reset();
    };


    /**
     * Check if all items of current search parameters loaded
     * @return {boolean}
     * @public
     */
    SearchResults.prototype.isAllSearchItemsLoaded = function() {
        return this.itemList_.getCountItems() == this.params.countResults;
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
    SearchResults.prototype.sendAnalyticsItemsImpression = function(
        params, opt_interval) {

        this.itemList_.sendAnalyticsItemsImpression(params, opt_interval);
    };


    /**
     * Send Analytics when user clicks on list item
     * @param {number} itemId
     * @param {string} list
     * @public
     */
    SearchResults.prototype.sendAnalyticsItemClick = function(itemId, list) {
        this.itemList_.sendAnalyticsItemClick(itemId, list);
    };


    /**
     * Show or hide show more button
     * @param {boolean} visibility
     * @public
     */
    SearchResults.prototype.setShowMoreButtonVisibility = function(visibility) {
        this.getView().setShowMoreButtonVisibility(visibility);
    };


    /**
     * Show or hide loader
     * @param {boolean} visibility
     * @public
     */
    SearchResults.prototype.setLoaderVisibility = function(visibility) {
        this.getView().setLoaderVisibility(visibility);
    };


    /**
     * Return whether animation in progress
     * @return {boolean}
     * @public
     */
    SearchResults.prototype.isAnimationEnded = function() {
        return this.getView().getAnimationPromise() ? true : false;
    };


    /**
     * @override
     * @param {Element} element
     * @protected
     */
    SearchResults.prototype.decorateInternal = function(element) {
        SearchResults.base(this, 'decorateInternal', element);

        this.initChildComponents_();
    };


    /**
     * Init child components
     * @return {sm.lSearch.bSearchResults.SearchResults}
     * @private
     */
    SearchResults.prototype.initChildComponents_ = function() {
        var dom = this.getView().getDom();

        this.itemList_ = this.decorateChild('smItemList', dom.itemList);

        this.sort_ = this.decorateChild('dropdown-list-links', dom.sort);

        this.showMore_ = this.decorateChild('button', dom.showMore);

        return this;
    };
});  // goog.scope
