goog.provide('sm.lSearchResult.SearchResult');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bSearch.Search');
goog.require('sm.lSearchResult.Template');
goog.require('sm.lSearchResult.bFilters.Filters');
goog.require('sm.lSearchResult.bSchoolList.SchoolList');
goog.require('sm.lSearchResult.bSort.Sort');

/**
 * Search result component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSearchResult.SearchResult = function(opt_params) {
    goog.base(this);

    /**
     * Parameters
     * @private
     * @type {Object}
     */
    this.params_ = opt_params || {};

    /**
     * Instance
     * @type {sm.lSearchResult.bSort.Sort}
     * @private
     */
    this.sort_ = null;

    /**
     * SchoolList instance
     * @type {sm.lSearchResult.bSchoolList.SchoolList}
     * @private
     */
    this.schoolList_ = null;

    /**
     * Filters instance
     * @type {sm.lSearchResult.bFilters.Filters}
     * @private
     */
    this.filters_ = null;

    /**
     * Search instance
     * @type {sm.bSearch.Search}
     * @private
     */
    this.search_ = null;
};
goog.inherits(sm.lSearchResult.SearchResult, goog.ui.Component);

goog.scope(function() {
    var SearchResult = sm.lSearchResult.SearchResult,
        SchoolList = sm.lSearchResult.bSchoolList.SchoolList,
        Sort = sm.lSearchResult.bSort.Sort,
        Filters = sm.lSearchResult.bFilters.Filters,
        Search = sm.bSearch.Search;

    /**
     * CSS-class enum
     * @enum {string}
     */
    SearchResult.CssClass = {
        ROOT: 'l-search-result'
    };

    /**
     * @override
     */
    SearchResult.prototype.decorate = function(element) {
        goog.base(this, 'decorate', element);

        this.params_ = jQuery(element).data('params') || {};
    };

    /**
     * @override
     */
    SearchResult.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lSearchResult.Template.base,
            {
                params: this.params_
            }
        );

        this.decorateInternal(element);
    };

    /**
     * @override
     * @param {Element} element
     */
    SearchResult.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        //school list
        var bSchoolList = goog.dom.getElementByClass(
            SchoolList.CssClass.ROOT,
            element
        );

        this.schoolList_ = new SchoolList();
        this.addChild(this.schoolList_);
        this.schoolList_.decorate(bSchoolList);

        //sort
        var sortElement = goog.dom.getElementByClass(
            Sort.CssClass.ROOT,
            element
        );

        this.sort_ = new Sort();
        this.addChild(this.sort_);
        this.sort_.decorate(sortElement);

        //filters
        var filtersElement = goog.dom.getElementByClass(
            Filters.CssClass.ROOT,
            element
        );

        this.filters_ = new Filters();
        this.addChild(this.filters_);
        this.filters_.decorate(filtersElement);

        //search
        var bSearch = goog.dom.getElementByClass(
            Search.CssClass.INPUT,
            element
        );

        this.search_ = new Search();
        this.addChild(this.search_);
        this.search_.decorate(bSearch);
    };

    /**
     * Set up the Component.
     */
    SearchResult.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.sort_,
            Sort.Event.ITEM_CLICK,
            this.onSortHandler_
        );

        this.getHandler().listen(
            this.filters_,
            Filters.event.SUBMIT,
            this.filtersSubmitHandler_
        );
    };

    /**
     * Filters submit callback
     * @param {string} responseData
     * @private
     */
    SearchResult.prototype.searchSuccess_ = function(responseData) {
        var data = JSON.parse(responseData);
        this.schoolList_.setItems(data);
    };

    /**
     * Sort item click handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.onSortHandler_ = function(event) {
        console.log(event.itemId);
        this.schoolList_.sort(event.itemId);
    };

    /**
     * Filters submit handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.filtersSubmitHandler_ = function(event) {
        var data = event.data;

        data.searchParams.name = this.search_.getValue();

        jQuery.ajax({
            url: event.url,
            type: event.method,
            data: data,
            success: this.searchSuccess_.bind(this)
        });
    };
});


var searchResult;

/**
 * creates sm.lSearchResult.SearchResult instance
 */
jQuery(function() {
    var root = goog.dom.getElementByClass(
            sm.lSearchResult.SearchResult.CssClass.ROOT
        );

    if (root) {
        searchResult = new sm.lSearchResult.SearchResult();
        searchResult.decorate(root);
    }
});
