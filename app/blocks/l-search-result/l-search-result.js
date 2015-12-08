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
     * Template-based dom element creation.
     * @public
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
     * Internal decorates the DOM element
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
        
        var bSearch = goog.dom.getElementByClass(
            Search.CssClass.INPUT,
            element
        );

        var bSearchInstance = new Search();
        this.addChild(bSearchInstance);
        bSearchInstance.decorate(bSearch);
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
            this.schoolList_,
            SchoolList.Event.ITEM_CLICK,
            this.redirect_
        );

        this.getHandler().listen(
            this.filters_,
            Filters.event.SUBMIT,
            this.filtersSubmitHandler_
        );

    };

    /**
     * Sends form using jQuery.ajax
     * @param {string} url
     * @param {string} method
     * @param {Object} data
     * @param {Function=} opt_callback
     * @private
     */
    SearchResult.prototype.send_ = function(url, method, data, opt_callback) {
        jQuery.ajax({
            url: url,
            type: method,
            data: data,
            success: opt_callback ? opt_callback : function() {}
        });
    };

    /**
     * Filters submit callback
     * @param {string} responseData
     * @param {string} status
     * @param {Object} response
     * @private
     */
    SearchResult.prototype.filtersSubmitCallback_ =
        function(responseData, status, response) {
            if (response.status == 200 && status == 'success') {
                console.log(status);
                var data = JSON.parse(responseData);
                this.schoolList_.setList(data);
            }
        };

    /**
     * Sort item click handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.onSortHandler_ = function(event) {
        this.schoolList_.sort(event.itemId);
    };

    /**
     * Filters submit handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.filtersSubmitHandler_ = function(event) {
        this.send_(
            event.url,
            event.method,
            event.data,
            this.filtersSubmitCallback_.bind(this)
        );
    };

    /**
     * Redirect item click handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.redirect_ = function(event) {
        document.location.href = '/school/' + event.itemId;
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
