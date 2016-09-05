/**
 * @fileoverview Class, designed for load data with given search params from api
 * for map and entity list.
 *
 * Dispatches event with loaded data on load.
 *
 * Require already inited iRequest.
 */
goog.provide('sm.lSearch.iSearchService.SearchService');

goog.require('cl.iRequest.Request');
goog.require('goog.Uri.QueryData');
goog.require('goog.events.EventTarget');
goog.require('goog.object');
goog.require('sm.lSearch.iSearchService.ListDataLoadedEvent');
goog.require('sm.lSearch.iSearchService.MapDataLoadedEvent');


goog.scope(function() {
    var Request = cl.iRequest.Request;
    var ListDataLoadedEvent =
        sm.lSearch.iSearchService.ListDataLoadedEvent;
    var MapDataLoadedEvent =
        sm.lSearch.iSearchService.MapDataLoadedEvent;



    /**
     * Data loader
     * @constructor
     */
    sm.lSearch.iSearchService.SearchService = function() {

        /**
         * iRequest instance
         * @type {cl.iRequest.Request}
         * @private
         */
        this.request_ = null;


        /**
         * Search api address
         * @type {string}
         * @private
         */
        this.searchApi_ = null;


        /**
         * Search map api
         * @type {string}
         * @private
         */
        this.searchMapApi_ = null;


        /**
         * Stores search promise
         * @type {goog.Promise}
         * @private
         */
        this.searchDataPromise_ = null;


        /**
         * Stores map promise
         * @type {goog.Promise}
         * @private
         */
        this.mapDataPromise_ = null;
    };
    goog.inherits(
        sm.lSearch.iSearchService.SearchService, goog.events.EventTarget
    );
    var SearchService = sm.lSearch.iSearchService.SearchService;


    /**
     * Possible events
     * @enum {string}
     */
    SearchService.Event = {
        LIST_DATA_LOADED: ListDataLoadedEvent.Type,
        MAP_DATA_LOADED: MapDataLoadedEvent.Type
    };


    /**
     * Possible addresses of search api to load data depending of entity type
     * @enum {string}
     */
    SearchService.SearchApiAddress = {
        SCHOOL: '/api/school/search',
        COURSE: '/api/course/search'
    };

    /**
     * Possible addresses of search map api to load data
     * depending of entity type
     * @enum {string}
     */
    SearchService.SearchMapApiAddress = {
        SCHOOL: '/api/school/search/map',
        COURSE: '/api/course/search/map'
    };


    /**
     * Possible type of data to load form backend
     * @enum {string}
     */
    SearchService.EntityType = {
        SCHOOL: 'school',
        COURSE: 'course'
    };


    /**
     * Possible data types for loading
     * @enum {string}
     */
    SearchService.DataType = {
        SEARCH: 'search',
        MAP_POINTS: 'searchMapPoints'
    };


    /**
     * Init search service by given type
     * Please note, that servis must be inited before use
     * @param {string} entityType entityType of search page
     * @public
     */
    SearchService.prototype.init = function(entityType) {
        switch (entityType) {
            case SearchService.EntityType.SCHOOL:
                this.searchApi_ = SearchService.SearchApiAddress.SCHOOL;
                this.searchMapApi_ = SearchService.SearchMapApiAddress.SCHOOL;
                break;
            case SearchService.EntityType.COURSE:
                this.searchApi_ = SearchService.SearchApiAddress.COURSE;
                this.searchMapApi_ = SearchService.SearchMapApiAddress.COURSE;
                break;
        }

        this.request_ = Request.getInstance();
    };


    /**
     * Resets all requests
     * @public
     */
    SearchService.prototype.resetRequests = function() {
        this.resetSearchDataRequest_();
        this.resetMapDataRequest_();
    };


    /**
     * Load search data for map and list of entities
     * @param {Object<string, (number|string)>} searchParams
     * @public
     */
    SearchService.prototype.loadSearchData = function(searchParams) {
        if (!this.isSearchDataPending()) {
            this.searchDataPromise_ = this.send_(
                searchParams,
                SearchService.DataType.SEARCH
            );

            this.searchDataPromise_.then(this.onSearchDataLoaded_.bind(this));
        }
    };



    /**
     * Load search data for map
     * @param {Object<string, (number|string)>} searchParams
     * @public
     */
    SearchService.prototype.loadMapData = function(searchParams) {
        if (!this.isMapDataPending()) {
            this.mapDataPromise_ = this.send_(
                searchParams,
                SearchService.DataType.MAP_POINTS
            );

            this.mapDataPromise_.then(this.onMapDataLoaded_.bind(this));
        }
    };


    /**
     * Check whether loaded map data
     * @return {boolean}
     * @public
     */
    SearchService.prototype.isMapDataPending = function() {
        return !goog.isNull(this.mapDataPromise_);
    };


    /**
     * Check whether loaded search data
     * @return {boolean}
     * @public
     */
    SearchService.prototype.isSearchDataPending = function() {
        return !goog.isNull(this.searchDataPromise_);
    };


    /**
     * Search data loaded callback
     * @param {{
     *     list: Object,
     *     map: Object
     * }} data
     * @private
     */
    SearchService.prototype.onSearchDataLoaded_ = function(data) {
        this.dispatchDataEvents_(data);
        this.resetSearchDataRequest_();
    };


    /**
     * Map data loaded callback
     * @param {{
     *     list: Object,
     *     map: Object
     * }} data
     * @private
     */
    SearchService.prototype.onMapDataLoaded_ = function(data) {
        this.dispatchDataEvents_(data);
        this.resetMapDataRequest_();
    };


    /**
     * Reset data request promise
     * @private
     */
    SearchService.prototype.resetSearchDataRequest_ = function() {
        if (this.isSearchDataPending()) {
            this.searchDataPromise_.cancel();
        }
        this.searchDataPromise_ = null;
    };


    /**
     * Reset map data request promise
     * @private
     */
    SearchService.prototype.resetMapDataRequest_ = function() {
        if (this.isMapDataPending()) {
            this.mapDataPromise_.cancel();
        }
        this.mapDataPromise_ = null;
    };


    /**
     * Dispatches events about loaded data
     * Dispatches events with loaded data for map and list
     * @param {{
     *     list: Object,
     *     map: Object
     * }} data
     * @private
     */
    SearchService.prototype.dispatchDataEvents_ = function(data) {
        var listData = data['list'];
        if (goog.isDefAndNotNull(listData)) {
            var listDataLoadedEvent = new ListDataLoadedEvent(listData, this);
            this.dispatchEvent(listDataLoadedEvent);
        }


        var mapData = data['map'];
        if (goog.isDefAndNotNull(mapData)) {
            var mapDataLoadedEvent = new MapDataLoadedEvent(mapData, this);
            this.dispatchEvent(mapDataLoadedEvent);
        }
    };


    /**
     * Load data fom backend
     * @param {Object<string, Array<(string|number)>>} searchParams
     * @param {string} type
     * @return {goog.Promise<Object>}
     * @private
     */
    SearchService.prototype.send_ = function(searchParams, type) {
        var apiRequest = this.buildApiRequest_(searchParams, type);

        return this.request_.send({
            url: apiRequest
        });
    };


    /**
     * Build api requiest for get requiest from given parameters and searchType
     * @param {Object<string, (string|number|Array<(string|number)>)>} searchParams
     * @param {sm.lSearch.iSearchService.SearchService.DataType} searchType
     * @return {string}
     * @private
     */
    SearchService.prototype.buildApiRequest_ = function(
        searchParams, searchType) {
        var apiAddress = this.generateApiAddress_(searchType);
        var queryParams = this.buildQueryParams_(searchParams);

        return apiAddress + '?' + queryParams;
    };


    /**
     * Generate api address from given search type
     * @param {m.lSearch.iSearchService.SearchService.DataType} searchType
     * @return {string}
     * @private
     */
    SearchService.prototype.generateApiAddress_ = function(searchType) {
        var apiAddress;
        switch (searchType) {
            case SearchService.DataType.SEARCH:
                apiAddress = this.searchApi_;
                break;
            case SearchService.DataType.MAP_POINTS:
                apiAddress = this.searchMapApi_;
                break;
        }
        return apiAddress;
    };


    /**
     * Build query params from given search parameters
     * @param {Object<string, (string|number|Array<(string|number)>)>} searchParams
     * @return {string}
     * @private
     */
    SearchService.prototype.buildQueryParams_ = function(searchParams) {
        var notNullParams = goog.object.filter(
            searchParams,
            this.isNotEmptyParameter_
        );
        var queryData = goog.Uri.QueryData.createFromMap(notNullParams);

        return queryData.toString();
    };


    /**
     * Check whether parameter is not empty
     * @param {string|number|Array} parameter
     * @return {boolean}
     * @private
     */
    SearchService.prototype.isNotEmptyParameter_ = function(parameter) {
        return goog.isDefAndNotNull(parameter) && parameter !== '';
    };
});  // goog.scope
