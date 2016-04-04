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
goog.require('sm.bMap.Map');
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
     * Collection of children instances
     * @type {{
     *     header: ?sm.bHeader.Header
     *     search: ?sm.bSearch.Search
     *     filters: ?sm.lSearchResult.bFilters.Filters
     *     schoolList: ?sm.lSearchResult.bSchoolList.SchoolList
     * }}
     * @private
     */
    this.instances_ = {
        header: null,
        search: null,
        filters: null,
        schoolList: null
    };

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
    this.searchParams_ = {
        name: null,
        metrId: null,
        areaId: null,
        schoolType: [],
        classes: [],
        ege: [],
        gia: [],
        olimp: [],
        sortType: 0,
        page: 0
    };

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
        Header = sm.bHeader.Header,
        Map = sm.bMap.Map;

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
        /** end init params **/

        /** init child instances **/
        this.initSchoolList_();
        this.initFilters_();
        this.initHeader_();
        this.initSearch_();
        this.initMap_();
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
     * Init map
     * @private
     */
    SearchResult.prototype.initMap_ = function() {
        var element = this.getElement();

        var map = goog.dom.getElementByClass(
            Map.CssClass.ROOT,
            element
        );
        if (map) {
            var mapInstance = new Map();
            this.addChild(mapInstance);
            mapInstance.decorate(map);
        }
    };

    /**
     * Header submit handler
     * @private
     */
    SearchResult.prototype.onHeaderSubmit_ = function() {
        var newSearchData = this.instances_.header.getSearchData();
        this.instances_.search.setData(newSearchData);

        this.instances_.header.setMode(Header.Mode.DEFAULT);

        this.instances_.filters.reset();

        this.search_();
    };

    /**
     * Search submit handler
     * @private
     */
    SearchResult.prototype.onSearchSubmit_ = function() {
        this.search_();
    };

    /**
     * Filters submit handler
     * @private
     */
    SearchResult.prototype.onFiltersSubmit_ = function() {
        this.search_();

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
     * Get params from search in menu
     * @return {Object}
     * @private
     */
    SearchResult.prototype.getParamsFromSearch_ = function() {
        return this.instances_.search.getData();
    };

    /**
     * Update search params, send query to api, update url
     * @private
     */
    SearchResult.prototype.search_ = function() {
        var params = {
            page: 0,
            sortType: 0
        };

        goog.object.extend(params, this.getParamsFromFilters_());
        goog.object.extend(params, this.getParamsFromSearch_());
        this.updateSearchParams_(params);

        this.updateUrl_();

        this.send_().then(this.updateList_.bind(this));
    };

    /**
     * Update url in according to current search params
     * For IE9, which not support HTML5 history reload page
     * @private
     */
    SearchResult.prototype.updateUrl_ = function() {
        var newUrl = this.generateUrl_();

        if (goog.history.Html5History.isSupported()) {
           window.history.pushState(null, null, newUrl);
        } else {
            window.location.href = newUrl;
        }
    };

    /**
     * Generate new url from current params to push it to history
     * @return {string}
     * @private
     */
    SearchResult.prototype.generateUrl_ = function() {
        var filteredParams = goog.object.filter(this.searchParams_,
            this.isCorrectUrlParam_);

        var currentPath = window.location.pathname,
            queryParams = jQuery.param(filteredParams);

        return currentPath + '?' + queryParams;
    };

    /**
     * Check whether correct each param in search params field
     * Return false on params, which have name 'sortType' and 'page',
     * empty arrays and params with null, '' and 0 values
     * @param {string|number|Array} paramValue
     * @param {string} paramName
     * @return {boolean}
     * @private
     */
    SearchResult.prototype.isCorrectUrlParam_ =
        function(paramValue, paramName) {
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
        var paramsToUpdate = goog.object.getKeys(params);

        paramsToUpdate.filter(this.isCorrectParam_.bind(this))
            .forEach(this.updateSearchParam_.bind(this, params));
    };

    /**
     * Get value for each paramName from paramsToUpdate and put it to
     * corresponding field of searchParams_ object.
     * 'text' field from paramsToUpdate correspond to
     * 'name' field in searchParams_
     * @param {Object} paramsToUpdate - object with new parameters
     * @param {string} paramName - name of each parameter
     * @private
     */
    SearchResult.prototype.updateSearchParam_ =
        function(paramsToUpdate, paramName) {
            if (paramName == 'text') {
                this.searchParams_['name'] = paramsToUpdate['text'];
            } else {
                this.searchParams_[paramName] = paramsToUpdate[paramName];
            }
    };

    /**
     * Check whether correct each param and contains in searchParams_ object
     * except 'text' field
     * @param {string} param
     * @return {boolean}
     * @private
     */
    SearchResult.prototype.isCorrectParam_ = function(param) {
        return param == 'text' ?
            true :
            goog.object.containsKey(this.searchParams_, param);
    };

    /**
     * Sort item click handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.onSort_ = function(event) {
        this.updateSearchParams_({
            page: 0,
            sortType: event.itemId
        });

        this.send_().then(this.setItems_.bind(this));
    };

    /**
     * Handler for show more school list items
     * @private
     */
    SearchResult.prototype.onShowMoreSchoolListItems_ = function() {
        this.updateSearchParams_({
            page: this.searchParams_.page + 1
        });

        this.instances_.schoolList.showLoader();

        this.send_().then(this.addItems_.bind(this));
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
     * @return {Promise}
     * @private
     */
    SearchResult.prototype.send_ = function() {
    return jQuery.ajax({
            url: this.requestParams_.url,
            type: this.requestParams_.method,
            data: this.searchParams_
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
                        searchText: this.instances_.search.getText()
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
