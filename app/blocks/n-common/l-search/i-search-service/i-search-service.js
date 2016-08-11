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
goog.require('goog.events.EventTarget');
goog.require('sm.lSearch.iSearchService.ListDataLoadedEvent');
goog.require('sm.lSearch.iSearchService.MapDataLoadedEvent');


goog.scope(function() {
    var Request = cl.iRequest.Request;
    var ListDataLoadedEvent =
        sm.lSearch.iSearchService.SearchService.ListDataLoadedEvent;
    var MapDataLoadedEvent =
        sm.lSearch.iSearchService.SearchService.MapDataLoadedEvent;



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
        SCHOOL: 'school/search',
        COURSE: 'course/search'
    };

    /**
     * Possible addresses of search map api to load data
     * depending of entity type
     * @enum {string}
     */
    SearchService.SearchMapApiAddress = {
        SCHOOL: 'school/search/map',
        COURSE: 'course/search/map'
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
     * @param {string} entityType entityType of search page
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
     * Load search data for map and list of entities
     * @param {Object<string, Array<number>>} searchParams
     */
    SearchService.prototype.getData = function(searchParams) {
        this.send_(searchParams, this.searchApi_)
            .then(this.onDataLoaded_.bind(this));
    };


    /**
     * Load search data for map
     * @param {Object<string, Array<number>>} searchParams
     * @return {goog.Promise<{
     *     primary: Array<Object>,
     *     secondary: Array<Object>
     * }>}
     */
    SearchService.prototype.getMapData = function(searchParams) {
        return this.send_(searchParams, SearchService.DataType.LIST);
    };


    /**
     * On data loaded callback
     * Dispatches events with loaded data for map and list
     * @param {Object} data
     * @private
     */
    SearchService.prototype.onDataLoaded_ = function(data) {
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
     * @param {Object} searchParams
     * @param {string} type
     * @return {goog.Promise<Object>}
     * @private
     */
    SearchService.prototype.send_ = function(searchParams, type) {
        var apiAddress;

        switch (type) {
            case SearchService.DataType.SEARCH:
                apiAddress = this.searchApi_;
                break;
            case SearchService.DataType.MAP_POINTS:
                apiAddress = this.searchMapApi_;
                break;
        }

        return this.request.send({
            url: apiAddress,
            data: searchParams,
            isJSON: true
        });
    };
});  // goog.scope
