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

    /**
     * Search data
     * @type {Object}
     * @private
     */
    this.searchData_ = {
        offset: 10,
        limit: 10,
        order: 0
    };
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
            this.sortHandler_
        );

        this.getHandler().listen(
            this.schoolList_,
            SchoolList.Event.ITEM_CLICK,
            this.redirectHandler_
        );

        this.getHandler().listen(
            this.schoolList_,
            SchoolList.Event.SHOW_MORE,
            this.showMoreSchoolListItemsHandler_
        );

        this.getHandler().listen(
            this.filters_,
            Filters.event.SUBMIT,
            this.filtersSubmitHandler_
        );

        this.addScrollListener_();
    };

    /**
     * Filters submit handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.filtersSubmitHandler_ = function(event) {
        var data = event.data;

        this.searchData_.searchParams = data.searchParams || {};
        this.searchData_.searchParams.name = this.search_.getValue();
        this.initSchoolListSetItems_();
        this.sendSearchData_();
    };

    /**
     * Sort item click handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.sortHandler_ = function(event) {
        this.searchData_.order = event.itemId;
        this.initSchoolListSetItems_();
        this.sendSearchData_();
    };

    /**
     * Setting of null offset and initialize school list add items
     * @private
     */
    SearchResult.prototype.initSchoolListSetItems_ = function() {
        this.searchData_.offset = 0;
        this.initSchoolListAddItems_();
    };

    /**
     * Redirect item click handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.redirectHandler_ = function(event) {
        document.location.href = '/school/' + event.itemId;
    };

    /**
     * Add listener for scroll
     * @private
     */
    SearchResult.prototype.addScrollListener_ = function() {
        this.getHandler().listen(
            window,
            goog.events.EventType.SCROLL,
            this.scrollHandler_
        );

        this.scrollCheck_();
    };

    /**
     * Remove listener for scroll
     * @private
     */
    SearchResult.prototype.removeScrollListener_ = function() {
        this.getHandler().unlisten(
            window,
            goog.events.EventType.SCROLL,
            this.scrollHandler_
        );
    };

    /**
     * Scroll handler
     * @private
     */
    SearchResult.prototype.scrollHandler_ = function() {
        this.scrollCheck_();
    };

    /**
     * Checks scroll
     * @private
     */
    SearchResult.prototype.scrollCheck_ = function() {
        var scrollHeight =
            window.pageYOffset || document.documentElement.scrollTop;
        var docHeight = document.documentElement.offsetHeight;
        var clientHeight = document.documentElement.clientHeight;

        if (scrollHeight + clientHeight >= docHeight) {
            this.showMoreSchoolListItems_();
        }
    };

    /**
     * Handler for show more school list items
     * @private
     */
    SearchResult.prototype.showMoreSchoolListItemsHandler_ = function() {
        this.showMoreSchoolListItems_();
    };

    /**
     * Shows more school list items
     * @private
     */
    SearchResult.prototype.showMoreSchoolListItems_ = function() {
        this.searchData_.offset = this.searchData_.offset + 10;
        this.initSchoolListAddItems_();
        this.sendSearchData_(this.showMoreSchoolListItemsSuccess_);
    };

    /**
     * Sending of search data
     * @param {function=} opt_callback
     * @private
     */
    SearchResult.prototype.sendSearchData_ = function(opt_callback) {
        var callback = opt_callback || this.searchSuccess_;

        jQuery.ajax({
            url: this.filters_.getUrl(),
            type: this.filters_.getMethod(),
            data: this.searchData_,
            success: callback.bind(this)
        });
    };

    /**
     * Filters submit callback
     * @param {string} responseData
     * @private
     */
    SearchResult.prototype.searchSuccess_ = function(responseData) {
        var data = JSON.parse(responseData);
        this.schoolList_.hideLoader();
        this.schoolList_.setItems(data);
        this.addScrollListener_();
    };

    /**
     * Show more school list items callback
     * @param {string} responseData
     * @private
     */
    SearchResult.prototype.showMoreSchoolListItemsSuccess_ =
        function(responseData) {
            var data = JSON.parse(responseData) || [];

            this.schoolList_.hideLoader();

            if (!data.length) {
                this.schoolList_.hideShowMoreButton();
            } else {
                this.schoolList_.addItems(data);
                this.addScrollListener_();
            }
        };

    /**
     * Initialization of school list add items
     * @private
     */
    SearchResult.prototype.initSchoolListAddItems_ = function() {
        this.schoolList_.showLoader();
        this.removeScrollListener_();
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
