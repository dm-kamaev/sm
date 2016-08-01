/**
 * @fileoverview Class, designed for load data with given search params from api
 * for map and entity list.
 *
 * Dispatches event with loaded data on load.
 *
 * Require already inited iRequest.
 */
goog.provide('sm.lSmSearch.iDataLoader.DataLoader');

goog.require('cl.iRequest.Request');
goog.require('goog.events.EventTarget');

goog.scope(function() {



    /**
     * Data loader
     * @constructor
     */
    sm.lSmSearch.iDataLoader.DataLoader = function() {

        /**
         * iRequest instance
         * @type {cl.iRequest.Request}
         */
        this.request = cl.iRequest.Request.getInstance();

    };
    goog.inherits(sm.lSmSearch.iDataLoader.DataLoader, goog.events.EventTarget);
    var DataLoader = sm.lSmSearch.iDataLoader.DataLoader;


    /**
     * POssible events
     * @enum {string}
     */
    DataLoader.Event = {
        LIST_DATA_LOADED: 'listDataLoaded',
        MAP_DATA_LOADED: 'mapDataLoaded'
    };


    /**
     * Possible addresses of api to load data
     * @enum {string}
     */
    DataLoader.ApiAddress = {
        MAP: 'school/searchMapPoints',
        LIST: 'school/search'
    };


    /**
     * Possible type of data to load form backend
     * @enum {string}
     */
    DataLoader.DataType = {
        LIST: 'list',
        MAP: 'map'
    };

    /**
     * Load data for map
     * @param {Object} searchParams
     */
    DataLoader.prototype.getMapData = function(searchParams) {
        this.send_(searchParams, DataLoader.DataType.MAP)
            .then(function(resolve, reject) {

            });
    };


    /**
     * Load data for list
     * @param {Object} searchParams
     * @return {goog.Promise<{
     *     primary: Array<Object>,
     *     secondary: Array<Object>
     * }>}
     */
    DataLoader.prototype.getListData = function(searchParams) {
        return this.send_(searchParams, DataLoader.DataType.LIST);
    };


    /**
     * Load data fom backend
     * @param {Object} searchParams
     * @param {string} type
     * @return {goog.Promise<Object>}
     * @private
     */
    DataLoader.prototype.send_ = function(searchParams, type) {
        var apiAddress;

        switch (type) {
            case DataLoader.DataType.LIST:
                apiAddress = DataLoader.ApiAddress.LIST;
                break;
            case DataLoader.DataType.MAP:
                apiAddress = DataLoader.ApiAddress.MAP;
                break;
        }

        return this.request.send({
            url: apiAddress,
            data: searchParams
        });
    };
});
