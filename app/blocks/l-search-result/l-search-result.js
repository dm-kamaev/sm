goog.provide('sm.lSearchResult.SearchResult');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
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
     * @type {Object}
     * @private
     */
    this.searchSettings_ = {};

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

        //header
        this.header_ = Header.getInstance();

        var leftMenu = goog.dom.getElementByClass(
            SearchResult.CssClass.ROOT
        );
        var menuSearch = goog.dom.getElementByClass(
            Search.CssClass.ROOT,
            leftMenu
        );

        if (menuSearch) {
            this.menuSearch_ = new Search();
            this.addChild(this.menuSearch_);
            this.menuSearch_.decorate(menuSearch);
        }
        this.initElements_(element);

        this.initMap_();
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
        ).listen(
            this.filters_,
            Filters.event.SUBMIT,
            this.filtersSubmitHandler_
        );

        this.initSearchListeners_();

        this.initHeaderListeners_();

        this.getHandler().listen(
            this.schoolList_,
            SchoolList.Event.SHOW_MORE,
            this.showMoreSchoolListItemsHandler_
        );

        this.getHandler().listen(
            goog.dom.getWindow(),
            goog.events.EventType.PAGESHOW,
            this.onShowPage_
        );
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
     * Init listeners for search in menu
     * @private
     */
    SearchResult.prototype.initSearchListeners_ = function() {
        this.getHandler().listen(
            this.menuSearch_,
            Search.Event.SUBMIT,
            this.onSubmit_
        ).listen(
            this.menuSearch_,
            Search.Event.ITEM_SELECT,
            this.onSubmit_
        );
    };

    /**
     * Init listeners for header
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
     * Init search in menu
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
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.onHeaderSubmit_ = function(event) {
        this.menuSearch_.setValue(event.data.text);
        this.header_.setMode(Header.Mode.DEFAULT);
        this.filters_.reset();
        this.onSubmit_(event);
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

        params.data.searchParams.name = this.menuSearch_.getValue();

        this.updateSearchSettings_(params);
        this.searchSettings_.data.page = 0;
        this.sendQuery_(true);

        this.filters_.collapse();
        window.scrollTo(0, 0);
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
     * @param {Object} newSettings
     * @private
     */
    SearchResult.prototype.updateSearchSettings_ = function(newSettings) {
        this.searchSettings_.data = newSettings.data;

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
