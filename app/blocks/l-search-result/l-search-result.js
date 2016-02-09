goog.provide('sm.lSearchResult.SearchResult');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('gorod.gSuggest.Suggest');
goog.require('sm.bSearch.Search');
goog.require('sm.lSearchResult.Template');
goog.require('sm.lSearchResult.bFilters.Filters');
goog.require('sm.lSearchResult.bSchoolList.SchoolList');

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
     * @type {?sm.bSearch.Search}
     * @private
     */
    this.search_ = null;

    /**
     * Current search settings
     * @type {Object}
     * @private
     */
    this.searchSettings_ = {};

    /**
     * Element with amount of finded results
     * @type {Element}
     * @private
     */
    this.textChangeElement_ = null;
};
goog.inherits(sm.lSearchResult.SearchResult, goog.ui.Component);

goog.scope(function() {
    var SearchResult = sm.lSearchResult.SearchResult,
        SchoolList = sm.lSearchResult.bSchoolList.SchoolList,
        Filters = sm.lSearchResult.bFilters.Filters,
        Search = sm.bSearch.Search;

    /**
     * CSS-class enum
     * @enum {string}
     */
    SearchResult.CssClass = {
        ROOT: 'l-search-result',
        TEXT_CHANGE: 'l-search-result__list-header-text_change',
        HIDDEN: 'i-utils__hidden'
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

        this.searchSettings_ = JSON.parse(
            element.getAttribute('data-params')
        );

        //school list
        var bSchoolList = goog.dom.getElementByClass(
            SchoolList.CssClass.ROOT,
            element
        );

        this.schoolList_ = new SchoolList();
        this.addChild(this.schoolList_);
        this.schoolList_.decorate(bSchoolList);

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
            Search.CssClass.ROOT,
            element
        );

        this.search_ = new Search();
        this.addChild(this.search_);
        this.search_.decorate(bSearch);

        this.textChangeElement_ = goog.dom.getElementByClass(
            SearchResult.CssClass.TEXT_CHANGE,
            element
        );
    };

    /**
     * Set up the Component.
     */
    SearchResult.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.schoolList_,
            SchoolList.Event.SORT_CLICK,
            this.onSortHandler_
        );

        this.getHandler().listen(
            this.filters_,
            Filters.event.SUBMIT,
            this.filtersSubmitHandler_
        );

        this.getHandler().listen(
            this.search_,
            sm.bSearch.Search.Event.SUBMIT,
            this.onSubmit_
        );

        this.getHandler().listen(
            this.search_,
            sm.bSearch.Search.Event.ITEM_SELECT,
            this.onSubmit_
        );

        this.getHandler().listen(
            this.schoolList_,
            SchoolList.Event.SHOW_MORE,
            this.showMoreSchoolListItemsHandler_
        );
    };

    /**
     * Input submit handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.onSubmit_ = function(event) {
        this.filters_.submit(event);
    };

    /**
     * Filters submit handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.filtersSubmitHandler_ = function(event) {
        var params = {
            data: event.data,
            url: event.url,
            type: event.method
        };

        var isSchool = (params.data.searchParams.areaId ||
                params.data.searchParams.metroId) ?
                    false :
                    true;

        this.updateSearchSettings_(params);
        this.searchSettings_.data.page = 0;
        this.sendQuery_(true);
    };

    /**
     * Sort item click handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.onSortHandler_ = function(event) {

        this.searchSettings_.data.page = 0;
        this.searchSettings_.data.searchParams.sortType = event.itemId;

        this.sendQuery_();
    };

    /**
     * Handler for show more school list items
     * @private
     */
    SearchResult.prototype.showMoreSchoolListItemsHandler_ = function() {
        this.searchSettings_.data.page += 1;
        this.schoolList_.showLoader();
        this.sendQuery_();
    };

    /**
     * @param {Object} newSettings
     * @private
     */
    SearchResult.prototype.updateSearchSettings_ = function(newSettings) {
        var newSearchParams = newSettings.data.searchParams,
            searchParams = this.searchSettings_.data.searchParams;

        searchParams.schoolType = newSearchParams.schoolType ?
            newSearchParams.schoolType :
            [];

        searchParams.classes = newSearchParams.classes ?
            newSearchParams.classes :
            [];

        searchParams.gia = newSearchParams.gia ? newSearchParams.gia : [];

        searchParams.ege = newSearchParams.ege ? newSearchParams.ege : [];

        searchParams.olimp = newSearchParams.olimp ? newSearchParams.olimp : [];



        if (newSettings.url) {
            this.searchSettings_.url = newSettings.url;
        }

        if (newSettings.method) {
            this.searchSettings_.method = newSettings.method;
        }
    };

    /**
     * Send query with search settings
     * @param {boolean} opt_updateHeader
     * @private
     */
    SearchResult.prototype.sendQuery_ = function(opt_updateHeader) {
        var callback = null,
            updateHeader = opt_updateHeader ?
                opt_updateHeader : false;

        if (this.searchSettings_.data.page) {
            callback = this.addItems_;
        } else if (updateHeader) {
            callback = this.updateList_;
        } else {
            callback = this.setItems_;
        }

        jQuery.ajax({
            url: this.searchSettings_.url,
            type: this.searchSettings_.method,
            data: this.searchSettings_.data,
            success: callback.bind(this)
        });
    };

    /**
     * Filters submit callback
     * @param {string} responseData
     * @private
     */
    SearchResult.prototype.setItems_ = function(responseData) {
        var data = JSON.parse(responseData);
        this.schoolList_.reset();
        this.schoolList_.setItems(data.schools);
    };

    /**
     * Filters submit callback
     * @param {string} responseData
     * @private
     */
    SearchResult.prototype.addItems_ = function(responseData) {
        var data = JSON.parse(responseData);
        this.schoolList_.addItems(data.schools);
    };

    /**
     * Filters submit callback
     * @param {string} responseData
     * @private
     */
    SearchResult.prototype.updateList_ = function(responseData) {
        var data = JSON.parse(responseData);

       goog.soy.renderElement(
           this.textChangeElement_,
           sm.lSearchResult.Template.generateHeaderText,
           {params: {
               countResults: data.countResults
           }}
       );
       this.schoolList_.reset();
       this.schoolList_.setItems(data.schools);
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
