/**
 * @fileoverview Page with filters and results of search
 */
goog.provide('sm.lSearch.Search');


goog.require('cl.iRequest.Request');
goog.require('goog.events');
goog.require('goog.object');
goog.require('sm.bSearch.Search');
goog.require('sm.bSmMap.SmMap');
goog.require('sm.bSmSubheader.SmSubheader');
goog.require('sm.gDropdown.DropdownSelect');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.iSmSearchParamsManager.SmSearchParamsManager');
goog.require('sm.lSearch.View');
goog.require('sm.lSearch.bFilterPanel.FilterPanel');
goog.require('sm.lSearch.iSearchService.SearchService');
goog.require('sm.lSearch.iUrlUpdater.UrlUpdater');


goog.scope(function() {
    var Request = cl.iRequest.Request;
    var SearchService = sm.lSearch.iSearchService.SearchService;
    var SearchParamsManager = sm.iSmSearchParamsManager.SmSearchParamsManager;
    var UrlUpdater = sm.lSearch.iUrlUpdater.UrlUpdater;

    var Analytics = sm.iAnalytics.Analytics;



    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {sm.iLayout.LayoutStendhal}
     */
    sm.lSearch.Search = function(view, opt_domHelper) {
        sm.lSearch.Search.base(this, 'constructor', view, opt_domHelper);

        /**
         * @type {sm.lSearch.Search.Params}
         * @protected
         */
        this.params = null;


        /**
         * Subheader instance
         * @type {sm.bSmSubheader.SmSubheader}
         * @protected
         */
        this.subheader = null;


        /**
         * Sort control
         * @type {sm.gDropdown.DropdownSelect}
         * @private
         */
        this.sort_ = null;


        /**
         * Search Instance
         * @type {sm.bSearch.Search}
         * @private
         */
        this.search_ = null;


        /**
         * Filters Instance
         * @type {sm.lSearch.bFilterPanel.FilterPanel}
         * @private
         */
        this.filterPanel_ = null;


        /**
         * List Instance
         * @type {sm.bSmItemList.SmItemList}
         * @private
         */
        this.resultsList_ = null;


        /**
         * Show more button instance
         * @type {cl.gButton.Button}
         * @private
         */
        this.showMoreButton_ = null;


        /**
         * Map instance
         * @type {sm.bSmMap.SmMap}
         * @private
         */
        this.map_ = null;


        /**
         * Search service instance
         * @type {sm.lSearch.iSearchService.SearchService}
         * @private
         */
        this.searchService_ = null;


        /**
         * Search parameters manager
         * @type {sm.iSearchParamsManager.SearchParamsManager}
         * @private
         */
        this.paramsManager_ = null;


        /**
         * Url updater
         * @type {sm.lSearch.iUrlUpdater.UrlUpdater}
         * @private
         */
        this.urlUpdater_ = null;
    };
    goog.inherits(sm.lSearch.Search, sm.iLayout.LayoutStendhal);
    var Search = sm.lSearch.Search;


    /**
     * Defines item amount of one search request (one page) from list
     * @const {Number}
     */
    Search.SEARCH_CHUNK_SIZE = 10;


    /**
     * Search params names, which exclude when built url
     * @const {Array<string>}
     */
    Search.URL_PARAMS_TO_EXCLUDE = ['sortType', 'page', 'categoryId'];


    /**
     * @typedef {sm.lSearch.View.Params}
     */
    sm.lSearch.Params;


    /**
     * @param {Element} element
     * @override
     */
    Search.prototype.decorateInternal = function(element) {
        Search.base(this, 'decorateInternal', element);

        this.initServices_()
            .initUrlUpdater_()
            .initParamsManager_()
            .initLeftMenuInstances_()
            .initResultsListInstances_()
            .initMap_();
    };


    /**
     * @override
     * @protected
     */
    Search.prototype.enterDocument = function() {
        Search.base(this, 'enterDocument');

        this.initSubheaderListeners_()
            .initLeftMenuListeners_()
            .initSearchServiceListeners_()
            .initResultsListListeners_()
            .initWindowListeners_()
            .initMapListeners_()
            .initLoadMoreResultsListItemsListeners_();

        this.sendAnalyticsPageview_();
        this.sendAnalyticsItemsLoad_(1);
    };


    /**
     * Init listeners for left menu instances
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initLeftMenuListeners_ = function() {
        this.initSearchListeners_()
            .initFilterPanelListeners_();

        return this;
    };


    /**
     * Init listeners for search block in menu
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initSearchListeners_ = function() {
        this.getHandler().listen(
            this.search_,
            sm.bSearch.Search.Event.SUBMIT,
            this.onSearchSubmit_
        ).listen(
            this.search_,
            sm.bSearch.Search.Event.ITEM_SELECT,
            this.onSearchSubmit_
        );

        return this;
    };


    /**
     * Init listeners for filter panel
     * @private
     * @return {sm.lSearch.Search}
     */
    Search.prototype.initFilterPanelListeners_ = function() {
        this.getHandler().listen(
            this.filterPanel_,
            sm.lSearch.bFilterPanel.FilterPanel.Event.SUBMIT,
            this.onFilterPanelSubmit_
        );
        return this;
    };


    /**
     * Init listeners for left menu
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initResultsListListeners_ = function() {
        this.getHandler().listen(
            this.sort_,
            sm.gDropdown.DropdownSelect.Event.ITEM_SELECT,
            this.onSortReleased_
        );

        this.getHandler().listen(
            this.resultsList_,
            sm.bSmItemList.SmItemList.Event.ITEM_CLICK,
            this.onListItemClick_
        );

        this.detectShowMoreResultsList_();
        return this;
    };


    /**
     * Init listeners for window
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initWindowListeners_ = function() {
        this.getHandler().listen(
            goog.dom.getWindow(),
            goog.events.EventType.PAGESHOW,
            this.onShowPage_
        );

        return this;
    };


    /**
     * Init listeners for map
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initMapListeners_ = function() {
        this.getHandler().listen(
            this.map_,
            sm.bSmMap.SmMap.Event.READY,
            this.onMapReady_
        );

        return this;
    };


    /**
     * Init listeners for subheader
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initSubheaderListeners_ = function() {
        this.getHandler().listen(
            this.subheader,
            sm.bSmSubheader.SmSubheader.Event.SEARCH_SUBMIT,
            this.onHeaderSearchSubmit_
        );

        return this;
    };


    /**
     * Init search service listeners
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initSearchServiceListeners_ = function() {
        this.getHandler().listen(
            this.searchService_,
            SearchService.Event.MAP_DATA_LOADED,
            this.onMapDataLoaded_
        ).listen(
            this.searchService_,
            SearchService.Event.LIST_DATA_LOADED,
            this.onResultsListDataLoaded_
        );

        return this;
    };


    /**
     * Header submit handler
     * @param {Object} event
     * @private
     */
    Search.prototype.onHeaderSearchSubmit_ = function(event) {
        var searchText = this.subheader.getSearchData();

        this.setSearchFieldText_(searchText);
        this.makeNewSearch_();
    };


    /**
     * Search submit handler
     * @private
     */
    Search.prototype.onSearchSubmit_ = function() {
        this.updatePage_();
    };


    /**
     * Filter panel submit handler
     * @private
     */
    Search.prototype.onFilterPanelSubmit_ = function() {
        this.updatePage_();
        this.filterPanel_.collapse();
    };


    /**
     * Sort action event handler
     * @param {Object} event
     * @private
     */
    Search.prototype.onSortReleased_ = function(event) {
        this.resetSecondarySearchParams_();
        this.paramsManager_.setSortType(event['itemId']);


        this.getView().hideResultsList();
        this.makeSearch_();
    };


    /**
     * Show more button click handler
     * @private
     */
    Search.prototype.onShowMoreButtonClick_ = function() {
        if (!this.searchService_.isSearchDataPending()) {
            this.loadNextPage_();
        }
    };


    /**
     * Send request to load additional points to map
     * @private
     */
    Search.prototype.onMapReady_ = function() {
        this.searchService_.loadMapData(this.paramsManager_.getParams());
    };


    /**
     * Map data load event handler
     * @param  {sm.lSearch.iSearchService.MapDataLoadedEvent} event
     * @private
     */
    Search.prototype.onMapDataLoaded_ = function(event) {
        var itemGroups = event.getItemGroups();

        var isItems = itemGroups.some(function(group) {
            return group.items.length;
        });
        this.getView().setSectionMapVisibility(isItems);

        this.map_.addItems(itemGroups);
        this.map_.center(event.getPosition());
    };


    /**
     * Results list data load event handler
     * @param  {sm.lSearch.iSearchService.ListDataLoadedEvent} event
     * @private
     */
    Search.prototype.onResultsListDataLoaded_ = function(event) {
        var listItems = event.getListItems();
        this.params.countResults = event.getCountResults();

        this.updateResultsList_(listItems, this.params.countResults);
        this.detectShowMoreResultsList_();

        var sortVisibility = this.resultsList_.getCountItems() ? true : false;
        this.getView().setSortVisibility(sortVisibility);
        // this.getView().setLoaderVisibility(false);

        this.sendAnalyticsItemsLoad_(0);
    };


    /**
     * Window scroll handler
     * @private
     */
    Search.prototype.onScroll_ = function() {
        if (this.isDocumentEndReached_() &&
            !this.searchService_.isSearchDataPending()) {
            this.loadNextPage_();
        }
    };


    /**
     * Handler for page show
     * @param {goog.events.BrowserEvent} event
     * @private
     */
    Search.prototype.onShowPage_ = function(event) {
        if (event.getBrowserEvent().persisted) {
            this.searchService_.loadSearchData(
                this.paramsManager_.getParams()
            );
        }
    };


    /**
     * Search submit handler
     * @param {goog.events.EventType} event
     * @private
     */
    Search.prototype.onListItemClick_ = function(event) {
        this.resultsList_.sendAnalyticsItemClick(
            event.data.itemId,
            'search results'
        );
    };


    /**
     * Make all actions to update information on page
     * @private
     */
    Search.prototype.updatePage_ = function() {
        this.resetSecondarySearchParams_();
        this.clearMap_();
        this.updateParams_();

        this.getView().hideResultsListWrap();

        this.makeSearch_();
        this.updateUrl_();
    };


    /**
     * Get search params from filters and search field and update
     * it in params manager
     * @private
     */
    Search.prototype.updateParams_ = function() {
        this.paramsManager_.updateParams(this.getParamsFromFilterPanel_());
        this.paramsManager_.updateParams(this.getParamsFromSearch_());
    };



    /**
     * Reset secondary search params to default values
     * Secondary search params is page and sortType, it affect more view of
     * results page than search results
     * @private
     */
    Search.prototype.resetSecondarySearchParams_ = function() {
        this.paramsManager_.setPage(0);
    };


    /**
     * Clear a map
     * @private
     */
    Search.prototype.clearMap_ = function() {
        this.map_.clear();
    };


    /**
     * Take params from search params manager and send queries for list and map
     * Update url also
     * for small amount results and for other map results
     * @private
     */
    Search.prototype.makeSearch_ = function() {
        this.searchService_.loadSearchData(
            this.paramsManager_.getParams(/*requestMapResults*/ true)
        );
        this.searchService_.loadMapData(this.paramsManager_.getParams());
    };


    /**
     * Set given text of search field
     * @param {string} searchText
     * @private
     */
    Search.prototype.setSearchFieldText_ = function(searchText) {
        this.search_.setData(searchText);
        this.subheader.setMode(sm.bSmSubheader.SmSubheader.Mode.DEFAULT);
    };


    /**
     * Make new search using only the params of search field
     * reset filters and sort
     * @private
     */
    Search.prototype.makeNewSearch_ = function() {
        this.paramsManager_.setSortType(1);

        this.updatePage_();
        this.sort_.clear();
        this.filterPanel_.reset();
    };


    /**
     * Update url via url updater
     * @private
     */
    Search.prototype.updateUrl_ = function() {
        this.urlUpdater_.update(this.paramsManager_.getUrlParams(
            Search.URL_PARAMS_TO_EXCLUDE
        ));
    };


    /**
     * Update results list and results header with given items and amount items
     * @param {Array<sm.bSmItem.SmItem.RenderParams>} listItems
     * @param {number} countResults
     * @private
     */
    Search.prototype.updateResultsList_ = function(listItems, countResults) {
        if (this.paramsManager_.getPage() == 0) {
            this.resultsList_.clear();

            this.getView().updateListHeader(
                countResults,
                this.paramsManager_.getName()
            );
        }
        this.resultsList_.addItemsBottom(listItems);
    };


    /**
     * Detect whether results list can be loaded more items.
     * If all items loaded, then results list cannot add more items and send
     * queries to backend to load more results
     * @private
     */
    Search.prototype.detectShowMoreResultsList_ = function() {
        if (this.isAllSearchItemsLoaded_()) {
            this.getView().setShowMoreButtonVisibility(false);
        } else {
            this.getView().setShowMoreButtonVisibility(true);
        }
    };


    /**
     * Check if all items of current search parameters loaded
     * @return {boolean}
     * @private
     */
    Search.prototype.isAllSearchItemsLoaded_ = function() {
        return this.resultsList_.getCountItems() == this.params.countResults;
    };


    /**
     * Init listeners event for loading new data
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initLoadMoreResultsListItemsListeners_ = function() {
        this.getHandler().listen(
            this.showMoreButton_,
            cl.gButton.Button.Event.CLICK,
            this.onShowMoreButtonClick_
        ).listen(
            goog.dom.getWindow(),
            goog.events.EventType.SCROLL,
            this.onScroll_
        );
        return this;
    };


    /**
     * Detect is user scroll on document end
     * @return {boolean}
     * @private
     */
    Search.prototype.isDocumentEndReached_ = function() {
        var viewportHeght = goog.dom.getViewportSize().height;
        var yCoordinate = goog.dom.getDocumentScroll().y;
        var documentHeght = goog.dom.getDocumentHeight();
        return viewportHeght + yCoordinate >= documentHeght;
    };


    /**
     * Load next page to results list
     * @private
     */
    Search.prototype.loadNextPage_ = function() {
        if (!this.isAllSearchItemsLoaded_()) {
            this.paramsManager_.increasePage();

            // this.getView().setLoaderVisibility(true);
            this.getView().setShowMoreButtonVisibility(false);

            this.searchService_.loadSearchData(
                this.paramsManager_.getParams()
            );
        }
    };


    /**
     * Get search params from filters panel
     * @return {Object<string, Array<(string|number)>>}
     * @private
     */
    Search.prototype.getParamsFromFilterPanel_ = function() {
        var params = this.filterPanel_.getData();

        return goog.object.map(params, this.getParamsFromFilter_);
    };


    /**
     * Get formatted parameters from each filter of filter panel
     * transform it from array of filter data objects to array of it values
     * @param  {sm.lSearch.bFilterPanel.FilterPanel.FilterData} filterData
     * @return {Array<(string|number)>}
     * @private
     */
    Search.prototype.getParamsFromFilter_ = function(filterData) {
        return goog.array.map(filterData, function(option) {
            return option.value;
        });
    };


    /**
     * Get params from search in menu
     * @return {sm.bSearch.Search.Data}
     * @private
     */
    Search.prototype.getParamsFromSearch_ = function() {
        return this.search_.getData();
    };


    /**
     * Sends pageview analytics
     * @private
     */
    Search.prototype.sendAnalyticsPageview_ = function() {
        Analytics.getInstance().send('pageview');
    };


     /**
     * Send Analytics when shown items
     * Interval sets the position of the elements for which the analyst goes
     * @param {number} nonInteraction - possible values 0 or 1
     * @private
     */
    Search.prototype.sendAnalyticsItemsLoad_ = function(nonInteraction) {
        var amountItems = Search.SEARCH_CHUNK_SIZE,
            interval = {};

        interval.start = amountItems * this.paramsManager_.getPage();
        interval.end = interval.start + amountItems;

        var params = {
            list: 'search results',
            action: 'load',
            nonInteraction: nonInteraction
        };

        this.resultsList_.sendAnalyticsItemsImpression(params, interval);
    };


    /**
     * Init data loading services
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initServices_ = function() {
        /** IRequest init **/
        Request.getInstance().init();

        /** Search service init **/
        this.searchService_ = new SearchService();
        this.searchService_.init(this.params.type);

        return this;
    };


    /**
     * Init url updater
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initUrlUpdater_ = function() {
        this.urlUpdater_ = new UrlUpdater();

        return this;
    };


    /**
     * Init search params manager by
     * creating it and setting search params from data params to it
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initParamsManager_ = function() {
        var searchParams = this.params.searchParams;
        this.paramsManager_ = new SearchParamsManager(searchParams);

        return this;
    };


    /**
     * Init left menu instances
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initLeftMenuInstances_ = function() {
        this.search_ = new sm.bSearch.Search();
        this.addChild(this.search_);
        this.search_.decorate(this.getView().getDom().search);

        this.filterPanel_ = this.decorateChild(
            'lSearch-filterPanel',
            this.getView().getDom().filterPanel
        );

        return this;
    };


    /**
     * Init results list, sort and show more button instances
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initResultsListInstances_ = function() {
        this.sort_ = this.decorateChild(
            'dropdown-select',
            this.getView().getDom().sort
        );

        this.resultsList_ = this.decorateChild(
            'smItemList',
            this.getView().getDom().resultsList
        );

        this.showMoreButton_ = this.decorateChild(
            'button',
            this.getView().getDom().showMoreButton
        );

        return this;
    };


    /**
     * Init map instance
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initMap_ = function() {
        this.map_ = this.decorateChild(
            'smMap',
            this.getView().getDom().map
        );

        return this;
    };
});  // goog.scope


/**
 * creates sm.lSearch.Search instance
 */
jQuery(function() {
    var domElement = goog.dom.getElementByClass(
        sm.lSearch.View.CssClass.ROOT
    );

    var view = new sm.lSearch.View(null, null, 'stendhal');
    var instance = new sm.lSearch.Search(view);

    instance.decorate(domElement);
});
