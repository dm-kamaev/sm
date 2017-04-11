/**
 * @fileoverview Page with filters and results of search
 */
goog.provide('sm.lSearch.Search');


goog.require('cl.iRequest.Request');
goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.object');
goog.require('sm.bSearch.Search');
goog.require('sm.bSmMap.SmMap');
goog.require('sm.bSmSubheader.SmSubheader');
goog.require('sm.gHint.HintStendhal');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.iSmSearchParamsManager.SmSearchParamsManager');
goog.require('sm.lSearch.Template');
goog.require('sm.lSearch.View');
goog.require('sm.lSearch.bFilter.FilterLabels');
goog.require('sm.lSearch.bFilterPanel.FilterPanel');
goog.require('sm.lSearch.bSearchResults.SearchResults');
goog.require('sm.lSearch.iAnalyticsSender.AnalyticsSender');
goog.require('sm.lSearch.iSearchService.SearchService');
goog.require('sm.lSearch.iUrlUpdater.UrlUpdater');


goog.scope(function() {
    var Request = cl.iRequest.Request,
        SearchService = sm.lSearch.iSearchService.SearchService,
        SearchParamsManager = sm.iSmSearchParamsManager.SmSearchParamsManager,
        UrlUpdater = sm.lSearch.iUrlUpdater.UrlUpdater,
        Map = sm.bSmMap.SmMap,
        Analytics = sm.iAnalytics.Analytics,
        AnalyticsSender = sm.lSearch.iAnalyticsSender.AnalyticsSender;



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
         * Search Instance
         * @type {sm.bSearch.Search}
         * @private
         */
        this.search_ = null;


        /**
         * Filters Instance
         * @type {sm.lSearch.bFilterPanel.FilterPanel}
         * @protected
         */
        this.filterPanel = null;


        /**
         * List Instance
         * @type {sm.lSearch.bSearchResults.SearchResults}
         * @protected
         */
        this.searchResults = null;


        /**
         * Map instance
         * @type {sm.bSmMap.SmMap}
         * @private
         */
        this.map_ = null;


        /**
         * Search service instance
         * @type {sm.lSearch.iSearchService.SearchService}
         * @protected
         */
        this.searchService = null;


        /**
         * Search parameters manager
         * @type {sm.iSearchParamsManager.SearchParamsManager}
         * @protected
         */
        this.paramsManager = null;


        /**
         * Url updater
         * @type {sm.lSearch.iUrlUpdater.UrlUpdater}
         * @protected
         */
        this.urlUpdater = null;


        /**
         * Instances analytics sender
         * @type {sm.lSearch.iAnalyticsSender.AnalyticsSender}
         * @protected
         */
        this.analyticsSender = null;
    };
    goog.inherits(sm.lSearch.Search, sm.iLayout.LayoutStendhal);
    var Search = sm.lSearch.Search,
        View = sm.lSearch.View;

    /**
     * Name of this element in factory
     */
    Search.NAME = sm.lSearch.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Search.NAME, {
        control: Search,
        view: View
    });

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
     * Entity type
     * @const {Object<string>}
     */
    Search.EntityType = {
        SCHOOL: 'school',
        COURSE: 'course'
    };


    /**
     * @typedef {sm.lSearch.View.Params}
     */
    sm.lSearch.Params;


    /**
     * @override
     * @public
     */
    Search.prototype.enterDocument = function() {
        Search.base(this, 'enterDocument');

        this.initSubheaderListeners()
            .initLeftMenuListeners_()
            .initSearchServiceListeners_()
            .initSearchResultsListeners()
            .initWindowListeners_()
            .initMapListeners();

        this.detectShowMoreResultsList_();

        this.sendAnalyticsPageview_();
        this.sendAnalyticsItemsLoad_(1);
    };


    /**
     * @param {Element} element
     * @override
     * @protected
     */
    Search.prototype.decorateInternal = function(element) {
        Search.base(this, 'decorateInternal', element);

        this.initServices_()
            .initUrlUpdater_()
            .initParamsManager_()
            .initLeftMenuInstances()
            .initSearchResultsInstance()
            .initMap();
    };


    /**
     * Map data load event handler
     * @param {sm.lSearch.iSearchService.MapDataLoadedEvent} event
     * @protected
     */
    Search.prototype.onMapDataLoaded = function(event) {
        var itemGroups = event.getItemGroups();

        var isItems = itemGroups.some(function(group) {
            return group.items.length;
        });
        this.getView().setSectionMapVisibility(isItems);

        this.map_.addItems(itemGroups);
        this.map_.center(event.getPosition());
    };


    /**
     * Make all actions to update information on page
     * @protected
     */
    Search.prototype.updatePage = function() {
        this.resetSecondarySearchParams_();
        this.clearMap_();
        this.updateParams_();

        this.searchResults.setStatus(
            sm.lSearch.bSearchResults.SearchResults.Status.SEARCH_IN_PROGRESS
        );

        this.makeSearch_();
        this.updateUrl_();
    };


    /**
     * Init listeners for left menu instances
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initLeftMenuListeners_ = function() {
        this.initSearchListeners()
            .initFilterPanelListeners();

        return this;
    };


    /**
     * Init listeners for map
     * @return {sm.lSearch.Search}
     * @protected
     */
    Search.prototype.initMapListeners = function() {
        this.getHandler().listen(
            this.map_,
            Map.Event.READY,
            this.onMapReady_
        ).listen(
            this.map_,
            Map.Event.BALLOON_OPEN,
            this.onBalloonOpen_
        );

        return this;
    };


    /**
     * Init listeners for subheader
     * @return {sm.lSearch.Search}
     * @protected
     */
    Search.prototype.initSubheaderListeners = function() {
        this.getHandler().listen(
            this.subheader,
            sm.bSmSubheader.SmSubheader.Event.SEARCH_SUBMIT,
            this.onHeaderSearchSubmit_
        );

        return this;
    };


    /**
     * Init map instance
     * @return {sm.lSearch.Search}
     * @protected
     */
    Search.prototype.initMap = function() {
        this.map_ = this.decorateChild(
            sm.bSmMap.SmMap.NAME,
            this.getView().getDom().map
        );

        return this;
    };


    /**
     * Init listeners for filter panel
     * @protected
     * @return {sm.lSearch.Search}
     */
    Search.prototype.initFilterPanelListeners = function() {
        this.getHandler().listen(
            this.filterPanel,
            sm.lSearch.bFilterPanel.FilterPanel.Event.SUBMIT,
            this.onFilterPanelSubmit_
        );
        return this;
    };


    /**
     * Init listeners for left menu
     * @return {sm.lSearch.Search}
     * @protected
     */
    Search.prototype.initSearchResultsListeners = function() {
        this.getHandler().listen(
            this.searchResults,
            sm.lSearch.bSearchResults.SearchResults.Event.LIST_ITEM_CLICK,
            this.onListItemClick_
        ).listen(
            this.searchResults,
            sm.lSearch.bSearchResults.SearchResults.Event.SORT_TYPE_CHANGE,
            this.onSortReleased_
        ).listen(
            this.searchResults,
            sm.lSearch.bSearchResults.SearchResults.Event.SHOW_MORE_CLICK,
            this.onShowMoreButtonClick_
        );

        return this;
    };


    /**
     * Init results list, sort and show more button instances
     * @return {sm.lSearch.Search}
     * @protected
     */
    Search.prototype.initSearchResultsInstance = function() {
        this.searchResults = this.decorateChild(
            sm.lSearch.bSearchResults.SearchResults.NAME,
            this.getView().getDom().searchResults
        );

        return this;
    };


    /**
     * Init listeners for search block in menu
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initSearchListeners = function() {
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
     * Init listeners for window
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initWindowListeners_ = function() {
        this.getHandler().listen(
            goog.dom.getWindow(),
            goog.events.EventType.PAGESHOW,
            this.onShowPage_
        ).listen(
            goog.dom.getWindow(),
            goog.events.EventType.SCROLL,
            this.onScroll_
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
            this.searchService,
            SearchService.Event.MAP_DATA_LOADED,
            this.onMapDataLoaded
        ).listen(
            this.searchService,
            SearchService.Event.LIST_DATA_LOADED,
            this.onResultsListDataLoaded_
        );

        return this;
    };


    /**
     * Header submit handler
     * @param {sm.bSmSubheader.SearchSubmitEvent} event
     * @private
     */
    Search.prototype.onHeaderSearchSubmit_ = function(event) {
        var searchData = event.getSearchData();
        this.setSearchFieldText_(searchData);
        this.makeNewSearch_();
    };


    /**
     * Search submit handler
     * @private
     */
    Search.prototype.onSearchSubmit_ = function() {
        this.updatePage();
    };


    /**
     * Filter panel submit handler
     * @private
     */
    Search.prototype.onFilterPanelSubmit_ = function() {
        this.updatePage();
        this.filterPanel.collapse();
    };


    /**
     * Sort action event handler
     * @param {Object} event
     * @private
     */
    Search.prototype.onSortReleased_ = function(event) {
        this.resetSecondarySearchParams_();

        var sortType = event.data ? event.data.value : null;
        this.paramsManager.setSortType(sortType);

        this.searchResults.setStatus(
            sm.lSearch.bSearchResults.SearchResults.Status.SORT_IN_PROGRESS
        );

        this.clearMap_();
        this.makeSearch_();
    };


    /**
     * Show more button click handler
     * @private
     */
    Search.prototype.onShowMoreButtonClick_ = function() {
        if (!this.searchService.isSearchDataPending()) {
            this.loadNextPage_();
        }
    };


    /**
     * Send request to load additional points to map
     * @private
     */
    Search.prototype.onMapReady_ = function() {
        this.initAnalyticsSender_();
        this.searchService.loadMapData(this.paramsManager.getParams());
    };


    /**
     * Action pin handler
     * @param {sm.bSmBalloon.Event.Open} event
     * @private
     */
    Search.prototype.onBalloonOpen_ = function(event) {
        this.sendMapAnalytics_(event.data);
    };


    /**
     * Results list data load event handler
     * @param  {sm.lSearch.iSearchService.ListDataLoadedEvent} event
     * @private
     */
    Search.prototype.onResultsListDataLoaded_ = function(event) {
        var listItems = event.getListItems();

        this.updateResultsList_(
            listItems,
            event.getCountResults(),
            event.getHeaderText()
        );
        this.detectShowMoreResultsList_();

        this.sendAnalyticsItemsLoad_(0);
    };


    /**
     * Window scroll handler
     * @private
     */
    Search.prototype.onScroll_ = function() {
        if (this.isNextPageCanBeLoaded_() &&
            !this.searchService.isSearchDataPending()) {

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
            this.searchService.loadSearchData(
                this.paramsManager.getParams()
            );
        }
    };


    /**
     * Search submit handler
     * @param {goog.events.EventType} event
     * @private
     */
    Search.prototype.onListItemClick_ = function(event) {
        this.searchResults.sendAnalyticsItemClick(
            event.data.itemId,
            'search results'
        );
    };


    /**
     * Get search params from filters and search field and update
     * it in params manager
     * @private
     */
    Search.prototype.updateParams_ = function() {
        this.paramsManager.updateParams(this.getParamsFromFilterPanel_());
        this.paramsManager.updateParams(this.getParamsFromSearch_());
    };


    /**
     * Reset secondary search params to default values
     * Secondary search params is page and sortType, it affect more view of
     * results page than search results
     * @private
     */
    Search.prototype.resetSecondarySearchParams_ = function() {
        this.paramsManager.setPage(0);
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
        this.searchService.loadSearchData(
            this.paramsManager.getParams(/*requestMapResults*/ true)
        );
        this.searchService.loadMapData(this.paramsManager.getParams());
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
        this.paramsManager.resetSortType();
        this.searchResults.resetSort();

        this.updatePage();
        this.filterPanel.reset();
    };


    /**
     * Update url via url updater
     * @private
     */
    Search.prototype.updateUrl_ = function() {
        this.urlUpdater.update(this.paramsManager.getUrlParams(
            this.getUrlParamsToExclude_()
        ));
    };


    /**
     * Search params names, which exclude when built url
     * all names of filters used to build url
     * @return {Array<string>}
     * @private
     */
    Search.prototype.getUrlParamsToExclude_ = function() {
        var filtersName = Object.keys(this.getParamsFromFilterPanel_());

        return goog.array.filter(Search.URL_PARAMS_TO_EXCLUDE, function(param) {
            return !filtersName.some(function(filterName) {
                return param == filterName;
            });
        });
    };


    /**
     * Update results list and results header with given items and amount items
     * @param {Array<sm.bSmItem.SmItem.RenderParams>} listItems
     * @param {number} countResults
     * @param {sm.lSearch.bSearchResults.TextHeaderParams} headerText
     * @private
     */
    Search.prototype.updateResultsList_ = function(
            listItems, countResults, headerText) {
        if (this.paramsManager_.getPage() == 0) {
            this.searchResults_.update({
                items: listItems,
                countResults: countResults,
                headerText: headerText
            });
        } else {
            this.searchResults_.addPage(listItems);
        }
    };


    /**
     * Detect whether results list can be loaded more items.
     * If all items loaded, then results list cannot add more items and send
     * queries to backend to load more results
     * @private
     */
    Search.prototype.detectShowMoreResultsList_ = function() {
        if (this.searchResults.isAllSearchItemsLoaded()) {
            this.searchResults.setShowMoreButtonVisibility(false);
        } else {
            this.searchResults.setShowMoreButtonVisibility(true);
        }
    };


    /**
     * Check is needed and possible to load next page
     * @return {boolean}
     * @private
     */
    Search.prototype.isNextPageCanBeLoaded_ = function() {
        return this.isDocumentEndReached_() &&
            !this.isAllSearchItemsLoaded_() &&
            !this.isResultsListAnimationEnded_();
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
     * Detect if all search items loaded
     * @return {boolean}
     * @private
     */
    Search.prototype.isAllSearchItemsLoaded_ = function() {
        return this.searchResults.isAllSearchItemsLoaded();
    };


    /**
     * Detect if search results animation ended
     * @return {boolean}
     * @private
     */
    Search.prototype.isResultsListAnimationEnded_ = function() {
        return this.searchResults.isAnimationEnded();
    };


    /**
     * Load next page to results list
     * @private
     */
    Search.prototype.loadNextPage_ = function() {
        if (!this.searchResults.isAllSearchItemsLoaded()) {
            this.paramsManager.increasePage();

            this.searchResults.setLoaderVisibility(true);
            this.searchResults.setShowMoreButtonVisibility(false);

            this.searchService.loadSearchData(
                this.paramsManager.getParams()
            );
        }
    };


    /**
     * Get search params from filters panel
     * @return {Object<string, Array<(string|number)>>}
     * @private
     */
    Search.prototype.getParamsFromFilterPanel_ = function() {
        var params = this.filterPanel.getData();

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

        interval.start = amountItems * this.paramsManager.getPage();
        interval.end = interval.start + amountItems;

        var params = {
            list: 'search results',
            action: 'load',
            nonInteraction: nonInteraction
        };

        this.searchResults.sendAnalyticsItemsImpression(params, interval);
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
        this.searchService = new SearchService();
        this.searchService.init(this.params.type);

        return this;
    };


    /**
     * Init url updater
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initUrlUpdater_ = function() {
        this.urlUpdater = new UrlUpdater();

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
        this.paramsManager = new SearchParamsManager(searchParams);

        return this;
    };


    /**
     * Init left menu instances
     * @return {sm.lSearch.Search}
     * @protected
     */
    Search.prototype.initLeftMenuInstances = function() {
        this.search_ = new sm.bSearch.Search();
        this.addChild(this.search_);
        this.search_.decorate(this.getView().getDom().search);

        this.filterPanel = this.decorateChild(
            sm.lSearch.bFilterPanel.FilterPanel.NAME,
            this.getView().getDom().filterPanel
        );

        return this;
    };


    /**
     * Initializes instance of Analytics Sender
     * @private
     */
    Search.prototype.initAnalyticsSender_ = function() {
        this.analyticsSender = new AnalyticsSender('search page');
    };


    /**
     * Send map analytics
     * @param {sm.bSmBalloon.View.RenderParams} params
     * @private
     */
    Search.prototype.sendMapAnalytics_ = function(params) {
        var entityItems;
        var name;

        if (params.content.items.length > 0) {
            entityItems = params.content.items;
            name = params.footer.title;
        } else {
            entityItems = [params];
            name = params.header.title;
        }

        entityItems = this.transformEntityItemsParams_(entityItems);

        this.analyticsSender.addImpressions(entityItems);

        this.analyticsSender.send({
            category: 'search map',
            action: 'pin details',
            name: name
        });
    };


    /**
     * Transform entity items
     * @param {Array<{Object}>} entityItems
     * @return {Array<{
     *             id: number,
     *             name: string,
     *             list: string,
     *             category: ?string,
     *             position: number
     * }>}
     * @private
     */
    Search.prototype.transformEntityItemsParams_ = function(entityItems) {
        var result = [];

        entityItems.forEach(function(item, index) {
            result.push({
                id: item.id,
                name: item.name ? item.name.light : item.header.title,
                list: 'map balloon',
                category: item.category || null,
                position: index + 1
            });
        });

        return result;
    };
});  // goog.scope

