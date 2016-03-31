goog.provide('sm.lSearchResult.SearchResult');

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
    this.menuSearch_ = null;

    /**
     * Header instance
     * @type {?sm.bHeader.Header}
     * @private
     */
    this.header_ = null;

    /**
     * Current search settings
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
        this.schoolList_ = new SchoolList();
        this.addChild(this.schoolList_);
        this.schoolList_.decorate(schoolListElement);
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

        this.filters_ = new Filters();
        this.addChild(this.filters_);
        this.filters_.decorate(filtersElement);
    };

    /**
     * Init header instance
     * @private
     */
    SearchResult.prototype.initHeader_ = function() {
        this.header_ = Header.getInstance();
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
            this.menuSearch_ = new Search();
            this.addChild(this.menuSearch_);
            this.menuSearch_.decorate(menuSearch);
        }
    };

    /**
     * Init listeners for search block in menu
     * @private
     */
    SearchResult.prototype.initSearchListeners_ = function() {
        this.getHandler().listen(
            this.menuSearch_,
            Search.Event.SUBMIT,
            this.onSearchSubmit_
        ).listen(
            this.menuSearch_,
            Search.Event.ITEM_SELECT,
            this.onSearchSubmit_
        ).listen(
            this.menuSearch_,
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
            this.header_,
            Header.Event.SUBMIT,
            this.onHeaderSubmit_
        ).listen(
            this.header_,
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
            this.filters_,
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
            this.schoolList_,
            SchoolList.Event.SORT_CLICK,
            this.onSortHandler_
        ).listen(
            this.schoolList_,
            SchoolList.Event.SHOW_MORE,
            this.showMoreSchoolListItemsHandler_
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
        this.doHeaderSearch_(event.data);
    };

    /**
     * Make a search from header
     * @param {Object} paramsToUpdate
     * @private
     */
    SearchResult.prototype.doHeaderSearch_ = function(paramsToUpdate) {
        this.menuSearch_.setValue(paramsToUpdate.text);
        this.header_.setMode(Header.Mode.DEFAULT);
        this.filters_.reset();

        this.doMenuSearch_(paramsToUpdate);
    };

    /**
     * Search submit handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.onSearchSubmit_ = function(event) {
        this.doMenuSearch_(event.data);
    };

    /**
     * Make a search from left menu
     * @param {Object} paramsToUpdate
     * @private
     */
    SearchResult.prototype.doMenuSearch_ = function(paramsToUpdate) {
        var params = {};

        params.page = 0;
        goog.object.extend(
            params, this.getParamsFromSearchEvent_(paramsToUpdate));
        goog.object.extend(params, this.getParamsFromFilters_());

        this.doSearch_(params);
    };

    /**
     * Get search text, which entered into input
     * @private
     * @return {Object}
     */
    SearchResult.prototype.getParamsFromSearch_ = function() {
        var params = {};
        params.name = this.menuSearch_.getValue();
        return params;
    };

    /**
     * Get search params from search submit eventParams
     * @param {Object} eventParams
     * @return {Object}
     * @private
     */
    SearchResult.prototype.getParamsFromSearchEvent_ = function(eventParams) {
        var params = {
            name: eventParams.text,
            metroId: null,
            areaId: null
        };
        if (eventParams.type == 'metro') {
            params.metroId = eventParams.id;
        } else if (eventParams.type == 'areas') {
            params.areaId = eventParams.id;
        }

        return params;
    };

    /**
     * Search input handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.onSearchTextChange_ = function(event) {
        this.updateSearchParams_(
            this.getParamsFromSearchEvent_(event.data)
        );
    };

    /**
     * Filters submit handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.onFiltersSubmit_ = function(event) {
        this.doFiltersSearch_(event.data);
    };

    /**
     * Make a search from filter
     * @param {Object} paramsToUpdate
     * @private
     */
    SearchResult.prototype.doFiltersSearch_ = function(paramsToUpdate) {
        var params = {
            page: 0
        };

        goog.object.extend(params, this.getParamsFromSearch_());
        goog.object.extend(
            params,
            this.getParamsFromFilterEvent_(paramsToUpdate)
        );

        this.doSearch_(params);

        this.filters_.collapse();
        window.scrollTo(0, 0);
    };

    /**
     * Get search params from filters
     * @return {Object}
     * @private
     */
    SearchResult.prototype.getParamsFromFilters_ = function() {
        return this.filters_.serialize();
    };

    /**
     * Get search params from filter submit eventParams
     * @param {Object} eventParams
     * @return {Object}
     * @private
     */
    SearchResult.prototype.getParamsFromFilterEvent_ = function(eventParams) {
        return eventParams;
    };

    /**
     * Make update search params, send query to api, update url
     * @param {Object} searchParams
     * @private
     */
    SearchResult.prototype.doSearch_ = function(searchParams) {
        this.updateSearchParams_(searchParams);

        this.sendQuery_(true);
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
    SearchResult.prototype.onSortHandler_ = function(event) {

        this.searchParams_.page = 0;
        this.searchParams_.sortType = event.itemId;

        this.sendQuery_();
    };

    /**
     * Handler for show more school list items
     * @private
     */
    SearchResult.prototype.showMoreSchoolListItemsHandler_ = function() {
        this.searchParams_.page += 1;
        this.schoolList_.showLoader();
        this.sendQuery_();
    };

    /**
     * Handler for page show
     * @private
     * @param {object} event
     */
    SearchResult.prototype.onShowPage_ = function(event) {
        if (event.event_.persisted) {
            this.schoolList_.reset();
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

        for (var i = 0, elem;
            elem = this.elements_.textChangeElements[i];
            i++) {
            goog.soy.renderElement(
                elem,
                sm.lSearchResult.Template.listHeaderText, {
                    params: {
                        countResults: data.countResults,
                        searchText: this.menuSearch_.getValue()
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

        this.schoolList_.reset();
        this.schoolList_.setItems(data.schools);
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
