goog.provide('sm.lSearchResult.SearchResult');

goog.require('goog.Uri.QueryData');
goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.history.Html5History');
goog.require('goog.object');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('gorod.gSuggest.Suggest');
goog.require('sm.bHeader.Header');
goog.require('sm.bSearch.Search');
goog.require('sm.iAnalytics.Analytics');
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
     * History support state
     * @private
     * @type {boolean}
     */
    this.isHistorySupported_ = false;

    /**
     * Collection of children instances
     * @type {{
     *     header: sm.bHeader.Header
     *     search: sm.bSearch.Search
     *     filters: sm.lSearchResult.bFilters.Filters
     *     schoolList: sm.lSearchResult.bSchoolList.SchoolList
     * }}
     * @private
     */
    this.instances_ = {};

    /**
     * Current search parameters
     * @type {{
     *     name: ?string,
     *     metroId: ?number,
     *     areaId: ?number,
     *     schoolType: ?Array.<string>,
     *     classes: ?Array.<number>,
     *     ege: ?Array.<string>,
     *     gia: ?Array.<string>,
     *     olimp: ?Array.<string>,
     *     sortType: ?number,
     *     page: ?number
     * }}
     * @private
     */
    this.searchParams_ = {};

    /**
     * Params for request to api
     * @type {{
     *     url: {string},
     *     method: {string}
     * }}
     * @private
     */
    this.requestParams_ = {};

    /**
     * Dom elements
     * @type {Element}
     * @private
     */
    this.elements_ = {};
};
goog.inherits(sm.lSearchResult.SearchResult, goog.ui.Component);

goog.scope(function() {
    var SearchResult = sm.lSearchResult.SearchResult,
        SchoolList = sm.lSearchResult.bSchoolList.SchoolList,
        Filters = sm.lSearchResult.bFilters.Filters,
        Search = sm.bSearch.Search,
        Header = sm.bHeader.Header;

    /**
     * CSS-class enum
     * @enum {string}
     */
    SearchResult.CssClass = {
        ROOT: 'l-search-result',
        TEXT_CHANGE: 'l-search-result__list-header',
        LIST_CONTAINER: 'l-search-result__list-body',
        HIDDEN: 'i-utils__hidden',
        LEFT_MENU: 'l-search-result__left-menu'
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

        /** Init params **/
        this.initParams_();
        this.detectHistorySupport_();
        /** end init params **/

        /** init child instances **/
        this.initSchoolList_();
        this.initFilters_();
        this.initHeader_();
        this.initSearch_();
        /** end init child instances **/

        /** get dom elements **/
        this.initElements_(element);
        /** end get dom elements **/
    };

    /**
     * Set up the Component.
     * @override
     */
    SearchResult.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.initSearchListeners_();
        this.initHeaderListeners_();
        this.initFiltersListeners_();
        this.initSchoolListListeners_();
        this.initWindowListeners_();
    };

    /**
     * Init dom elements
     * @param {Node} element
     * @private
     */
    SearchResult.prototype.initElements_ = function(element) {
        this.elements_.textChangeElements = goog.dom.getElementsByClass(
            SearchResult.CssClass.TEXT_CHANGE,
            element
        );

        this.elements_.listContainer = goog.dom.getElementByClass(
            SearchResult.CssClass.LIST_CONTAINER,
            element
        );
    };

    /**
     * Get search settings from data-params
     * @private
     */
    SearchResult.prototype.initParams_ = function() {
        var element = this.getElement(),
            dataParams = JSON.parse(goog.dom.dataset.get(element, 'params'));

        this.requestParams_ = {
            url: dataParams.url,
            method: dataParams.method || 'GET'
        };

        this.searchParams_ = dataParams.searchParams;
    };

    /**
     * Init school list block
     * @private
     */
    SearchResult.prototype.initSchoolList_ = function() {
        var element = this.getElement();

        var schoolListElement = goog.dom.getElementByClass(
            SchoolList.CssClass.ROOT,
            element
        );
        this.instances_.schoolList = new SchoolList();
        this.addChild(this.instances_.schoolList);
        this.instances_.schoolList.decorate(schoolListElement);
    };

    /**
     * Init filters block
     * @private
     */
    SearchResult.prototype.initFilters_ = function() {
        var element = this.getElement();

        var filtersElement = goog.dom.getElementByClass(
            Filters.CssClass.ROOT,
            element
        );

        this.instances_.filters = new Filters();
        this.addChild(this.instances_.filters);
        this.instances_.filters.decorate(filtersElement);
    };

    /**
     * Init header instance
     * @private
     */
    SearchResult.prototype.initHeader_ = function() {
        this.instances_.header = Header.getInstance();
    };

    /**
     * Init search in menu
     * @private
     */
    SearchResult.prototype.initSearch_ = function() {
        var element = this.getElement();

        var menuSearch = goog.dom.getElementByClass(
            Search.CssClass.ROOT,
            element
        );
        if (menuSearch) {
            this.instances_.search = new Search();
            this.addChild(this.instances_.search);
            this.instances_.search.decorate(menuSearch);
        }
    };

    /**
     * Init listeners for search block in menu
     * @private
     */
    SearchResult.prototype.initSearchListeners_ = function() {
        this.getHandler().listen(
            this.instances_.search,
            Search.Event.SUBMIT,
            this.onSearchSubmit_
        ).listen(
            this.instances_.search,
            Search.Event.ITEM_SELECT,
            this.onSearchSubmit_
        ).listen(
            this.instances_.search,
            Search.Event.TEXT_CHANGE,
            this.onSearchTextChange_
        );
    };

    /**
     * Init listeners for header blocfk
     * @private
     */
    SearchResult.prototype.initHeaderListeners_ = function() {
        this.getHandler().listen(
            this.instances_.header,
            Header.Event.SUBMIT,
            this.onHeaderSubmit_
        ).listen(
            this.instances_.header,
            Header.Event.ITEM_SELECT,
            this.onHeaderSubmit_
        );
    };

    /**
     * Init listeners for filters
     * @private
     */
    SearchResult.prototype.initFiltersListeners_ = function() {
        this.getHandler().listen(
            this.instances_.filters,
            Filters.event.SUBMIT,
            this.onFiltersSubmit_
        );
    };

    /**
     * Init listeners for school list block
     * @private
     */
    SearchResult.prototype.initSchoolListListeners_ = function() {
        this.getHandler().listen(
            this.instances_.schoolList,
            SchoolList.Event.SORT_CLICK,
            this.onSort_
        ).listen(
            this.instances_.schoolList,
            SchoolList.Event.SHOW_MORE,
            this.onShowMoreSchoolListItems_
        );
    };

    /**
     * Init listeners for window
     * @private
     */
    SearchResult.prototype.initWindowListeners_ = function() {
        this.getHandler().listen(
            goog.dom.getWindow(),
            goog.events.EventType.PAGESHOW,
            this.onShowPage_
        );
    };

    /**
     * Header submit handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.onHeaderSubmit_ = function(event) {
        this.headerSearch_(event.data);
    };

    /**
     * Make a search from header
     * @param {Object} paramsToUpdate
     * @private
     */
    SearchResult.prototype.headerSearch_ = function(paramsToUpdate) {
        this.instances_.search.setValue(paramsToUpdate.name);
        this.instances_.header.setMode(Header.Mode.DEFAULT);
        this.instances_.filters.reset();

        this.search_(paramsToUpdate);
    };

    /**
     * Search submit handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.onSearchSubmit_ = function(event) {
        this.menuSearch_(event.data);
    };

    /**
     * Make a search from left menu
     * @param {Object} paramsToUpdate
     * @private
     */
    SearchResult.prototype.menuSearch_ = function(paramsToUpdate) {
        var params = {
            page: 0
        };
        goog.object.extend(params, paramsToUpdate);
        goog.object.extend(params, this.getParamsFromFilters_());

        this.search_(params);
    };

    /**
     * Handler for typing in left menu search
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.onSearchTextChange_ = function(event) {
        this.updateSearchParams_(event.data);
    };

    /**
     * Filters submit handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.onFiltersSubmit_ = function(event) {
        this.filtersSearch_(event.data);
    };

    /**
     * Make a search from filter when filters submits
     * @param {Object} filterParams
     * @private
     */
    SearchResult.prototype.filtersSearch_ = function(filterParams) {
        var params = {
            page: 0
        };
        goog.object.extend(params, filterParams);

        this.search_(params);

        this.instances_.filters.collapse();
        window.scrollTo(0, 0);
    };

    /**
     * Get search params from filters
     * @return {Object}
     * @private
     */
    SearchResult.prototype.getParamsFromFilters_ = function() {
        return this.instances_.filters.getData();
    };

    /**
     * Update search params, send query to api, update url
     * @param {Object} newParams
     * @private
     */
    SearchResult.prototype.search_ = function(newParams) {
        this.updateSearchParams_(newParams);

        this.updateUrl_();
        this.send_(true);
    };

    /**
     * Update url in according to current search params
     * For IE9, which not support HTML5 history reload page
     * @private
     */
    SearchResult.prototype.updateUrl_ = function() {
        var currentPath = window.location.pathname,
            queryParams = this.generateQueryString_(),
            newUrl = currentPath + '?' + queryParams;

        if (this.isHistorySupported_) {
           window.history.pushState(null, null, newUrl);
        } else {
            window.location.href = newUrl;
        }
    };

    /**
     * Generate new query string from current params to push it to history
     * @return {string}
     * @private
     */
    SearchResult.prototype.generateQueryString_ = function() {
        var cleanedParams = goog.object.filter(this.searchParams_,
            this.paramsFilter_);

        return encodeURI(jQuery.param(cleanedParams));
    };

    /**
     * Filter function for cleaning object
     * Return true if param need to be at filtered object
     * Return false on params, which have name 'sortType' and 'page',
     * empty arrays and params with null, '' and 0 values
     * @param {string|number|Array} paramValue
     * @param {string} paramName
     * @return {boolean}
     * @private
     */
    SearchResult.prototype.paramsFilter_ = function(paramValue, paramName) {
        var result = false;
        if (paramName !== 'sortType' && paramName !== 'page') {
            if (Array.isArray(paramValue)) {
                result = !!paramValue.length;
            } else {
                result = !! paramValue;
            }
        }
        return result;
    };

    /**
     * Update search parameters object with given data
     * @param {Object} params
     * @private
     */
    SearchResult.prototype.updateSearchParams_ = function(params) {
        var paramsToUpdate = goog.object.getKeys(params),
            that = this;

        paramsToUpdate.forEach(function(param) {
            if (goog.object.containsKey(that.searchParams_, param)) {
                goog.object.set(that.searchParams_, param, params[param]);
            }
        });
    };

    /**
     * Sort item click handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.onSort_ = function(event) {

        this.searchParams_.page = 0;
        this.searchParams_.sortType = event.itemId;

        this.send_();
    };

    /**
     * Handler for show more school list items
     * @private
     */
    SearchResult.prototype.onShowMoreSchoolListItems_ = function() {
        this.searchParams_.page += 1;
        this.instances_.schoolList.showLoader();
        this.send_();
    };

    /**
     * Handler for page show
     * @private
     * @param {object} event
     */
    SearchResult.prototype.onShowPage_ = function(event) {
        if (event.event_.persisted) {
            this.instances_.schoolList.reset();
        }
    };

    /**
     * Send query with search settings
     * @param {boolean} opt_updateHeader
     * @private
     */
    SearchResult.prototype.send_ = function(opt_updateHeader) {
        var callback = null,
            updateHeader = opt_updateHeader ?
                opt_updateHeader : false;

        if (this.searchParams_.page) {
            callback = this.addItems_;
        } else if (updateHeader) {
            callback = this.updateList_;
        } else {
            callback = this.setItems_;
        }

        jQuery.ajax({
            url: this.requestParams_.url,
            type: this.requestParams_.method,
            data: this.searchParams_,
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
        this.instances_.schoolList.reset();
        this.instances_.schoolList.setItems(data.schools);
    };

    /**
     * Filters submit callback
     * @param {string} responseData
     * @private
     */
    SearchResult.prototype.addItems_ = function(responseData) {
        var data = JSON.parse(responseData);
        this.instances_.schoolList.addItems(data.schools);
    };

    /**
     * Filters submit callback
     * @param {string} responseData
     * @private
     */
    SearchResult.prototype.updateList_ = function(responseData) {
        var data = JSON.parse(responseData);

        for (var i = 0, elem;
            elem = this.elements_.textChangeElements[i];
            i++) {
            goog.soy.renderElement(
                elem,
                sm.lSearchResult.Template.listHeaderText, {
                    params: {
                        countResults: data.countResults,
                        searchText: this.instances_.search.getValue()
                    }
                }
            );
        }

        data.countResults ?
            goog.dom.classes.remove(
                this.elements_.listContainer,
                SearchResult.CssClass.HIDDEN
            ) :
            goog.dom.classes.add(
                this.elements_.listContainer,
                SearchResult.CssClass.HIDDEN
            );

        this.instances_.schoolList.reset();
        this.instances_.schoolList.setItems(data.schools);
    };

    /**
     * Detect is browser support HTML5 history
     * @private
     */
    SearchResult.prototype.detectHistorySupport_ = function() {
        this.isHistorySupported_ = goog.history.Html5History.isSupported();
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
