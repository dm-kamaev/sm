/**
 * @fileoverview Page with filters and results of search
 */
goog.provide('sm.lSearch.Search');


goog.require('cl.iRequest.Request');
goog.require('goog.object');
goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.lSearch.View');
goog.require('sm.lSearch.iSearchService.SearchService');


goog.scope(function() {
    var Request = cl.iRequest.Request;
    var SearchService = sm.lSearch.iSearchService.SearchService;



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
    };
    goog.inherits(sm.lSearch.Search, sm.iLayout.LayoutStendhal);
    var Search = sm.lSearch.Search;


    /**
     * Defines item amount of one search request (one page) from list
     * @const {Number}
     */
    Search.SEARCH_CHUNK_SIZE = 10;


    /**
     * @typedef {sm.lSearch.View.Params}
     */
    Search.Params;


    /**
     * @param {Element} element
     * @override
     */
    Search.prototype.decorateInternal = function(element) {
        Search.base(this, 'decorateInternal', element);

        this.initServices_();
        this.initLeftMenuInstances_();
        this.initResultsListInstances_();
        this.initMap_();
    };


    /**
     * @override
     * @protected
     */
    Search.prototype.enterDocument = function() {
        Search.base(this, 'enterDocument');

        this.initLeftMenuListeners_()
            .initResultsListListeners_()
            .initWindowListeners_();
    };


    /**
     * Init data loading services
     * @return {sm.lSearch.SmSearch}
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

        var resultListItemsCount = this.resultsList_.getCountItems();
        if (!this.isAllSearchItemsLoaded_(resultListItemsCount)) {
            this.enableLoadMoreResultsListItems_();
        }

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
     * Init search service listeners
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initSearchServiceListeners_ = function() {
        this.getHandler().listen(
            this.searchService_,
            sm.lSearch.iSearchService.SearchService.Event.MAP_DATA_LOADED,
            this.onMapDataLoaded_
        ).listen(
            this.searchService_,
            sm.lSearch.iSearchService.SearchService.Event.LIST_DATA_LOADED,
            this.onResultsListDataLoaded_
        );

        return this;
    };


    /**
     * Search submit handler
     * @private
     */
    Search.prototype.onSearchSubmit_ = function() {
        console.log('Search submit');
    };


    /**
     * Filter panel submit handler
     * @private
     */
    Search.prototype.onFilterPanelSubmit_ = function() {
        console.log('Filter panel submit');
    };


    /**
     * Sort action event handler
     * @private
     */
    Search.prototype.onSortReleased_ = function() {
        console.log('Sort released!');
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
     * Map data load event handler
     * @param  {sm.lSearch.iSearchService.MapDataLoadedEvent} event
     * @private
     */
    Search.prototype.onMapDataLoaded_ = function(event) {
        var mapData = event.getMapData();
        this.map_.addItems(mapData);
    };


    /**
     * Results list data load event handler
     * @param  {sm.lSearch.iSearchService.ListDataLoadedEvent} event
     * @private
     */
    Search.prototype.onResultsListDataLoaded_ = function(event) {
        var listItems = event.getListItems();
        var countResults = event.getCountResults();

        this.resultsList_.addItemsBottom(listItems);

        if (this.isAllSearchItemsLoaded_(listItems.length, countResults)) {
            this.disableLoadMoreResultsListItems_();
            this.getView().setShowMoreButtonVisibility(false);
        } else {
            this.getView().setShowMoreButtonVisibility(true);
        }
        this.getView().setLoaderVisibility(false);
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
     * @private
     * @param {Object} event
     */
    Search.prototype.onShowPage_ = function(event) {
        if (event.event_.persisted) {
            this.resultsList_.clear();
        }
    };


    /**
     * Check if all items of current search parameters loaded
     * @param {number} listItemsLength
     * @param {number=} opt_countResults
     * @return {boolean}
     * @private
     */
    Search.prototype.isAllSearchItemsLoaded_ = function(
        listItemsLength,
        opt_countResults) {
        var listItemsAmount = this.resultsList_.getCountItems();
        var countResults = opt_countResults || 0;
        return (listItemsLength < Search.SEARCH_CHUNK_SIZE) ||
            (countResults == listItemsAmount);
    };


    /**
     * Disable loading more items to results list
     * Unlisten scroll and show more button click events
     * to disable load more items to results list
     * @private
     */
    Search.prototype.disableLoadMoreResultsListItems_ = function() {
        this.getHandler().unlisten(
            this.showMoreButton_,
            cl.gButton.Button.Event.CLICK
        ).unlisten(
            goog.dom.getWindow(),
            goog.events.EventType.SCROLL
        );
    };


    /**
     * Enable loading more items to results list
     * Listen scroll and show more button click events
     * to enable load more items to results list
     * @private
     */
    Search.prototype.enableLoadMoreResultsListItems_ = function() {
        this.getHandler().listen(
            this.showMoreButton_,
            cl.gButton.Button.Event.CLICK,
            this.onShowMoreButtonClick_
        ).listen(
            goog.dom.getWindow(),
            goog.events.EventType.SCROLL,
            this.onScroll_
        );
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
        this.params.searchParams['page']++;

        this.getView().setLoaderVisibility(true);
        this.getView().setShowMoreButtonVisibility(false);

        this.searchService_.loadSearchData(this.params.searchParams);
    };


    /**
     * Get search params from filters panel
     * @return {Object<string, Array<(string|number)>>}
     * @private
     */
    Search.prototype.getParamsFromFilterPanel_ = function() {
        var params = this.filterPanel_.getData();

        return goog.object.map(params, this.getParamsFromFilterPanel_);
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
     * Update search parameters object with given data
     * @param {Object<string, (string, number)>} params
     * @private
     */
    Search.prototype.updateSearchParams_ = function(params) {
        var paramsToUpdate = goog.object.getKeys(params);

        paramsToUpdate.forEach(this.updateSearchParam_.bind(this, params));
    };


    /**
     * Get value for each paramName from paramsToUpdate and put it to
     * corresponding field of searchParams_ object.
     * 'text' field from paramsToUpdate correspond to
     * 'name' field in searchParams_
     * @param {Object<string, (string,number)>} paramsToUpdate - object with new
     * parameters
     * @param {string} paramName - name of each parameter
     * @private
     */
    Search.prototype.updateSearchParam_ = function(
        paramsToUpdate,
        paramName) {
        if (paramName == 'text') {
            this.params.searchParams['name'] = paramsToUpdate['text'];
        } else {
            this.params.searchParams[paramName] = paramsToUpdate[paramName];
        }
    };


    /**
     * Init left menu instances
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
    };


    /**
     * Init results list, sort and show more button instances
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
    };


    /**
     * Init map instance
     * @private
     */
    Search.prototype.initMap_ = function() {
        this.map_ = this.decorateChild(
            'smMap',
            this.getView().getDom().map
        );
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
