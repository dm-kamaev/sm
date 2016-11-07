goog.provide('sm.lSearch.bSearchResults.SearchResults');

goog.require('cl.gButton.Button');
goog.require('cl.iControl.Control');
goog.require('sm.bSmItemList.SmItemList');
goog.require('sm.gDropdown.DropdownSelect');
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
         * Sort control (dropdown-select) instance
         * @type {sm.gDropdown.DropdownSelect}
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
        SORT_TYPE_CHANGE: sm.gDropdown.DropdownSelect.Event.ITEM_SELECT,
        SHOW_MORE_CLICK: cl.gButton.Button.Event.CLICK,
        LIST_ITEM_CLICK: sm.bSmItemList.SmItemList.Event.ITEM_CLICK
    };


    /**
     * @override
     * @public
     */
    SearchResults.prototype.enterDocument = function() {
        SearchResults.base(this, 'enterDocument');
    };


    /**
     * * Send Analytics when shown items
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
     * Clear search results list
     * @public
     */
    SearchResults.prototype.clearList = function() {
        this.itemList_.clear();
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

        this.sort_ = this.decorateChild('dropdown-select', dom.sort);

        this.showMore_ = this.decorateChild('button', dom.showMore);

        return this;
    };
});  // goog.scope
