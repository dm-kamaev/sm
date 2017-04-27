/**
 * @fileoverview Class, for create url and update url from given map
 *
 * It check supportion of html5 history api,
 * then create new url from given not-empty parameters,
 * then update url with reloading page or not (depends of supportion html5
 * history api)
 */
goog.provide('sm.lSearch.iUrlUpdater.UrlUpdater');

goog.require('goog.events.EventTarget');
goog.require('goog.history.Html5History');
goog.require('goog.object');
goog.require('goog.structs.Map');
goog.require('sm.iSmQueryBuilder.QueryBuilder');


goog.scope(function() {
    var QueryBuilder = goog.module.get('sm.iSmQueryBuilder.QueryBuilder');


    /**
     * Url updater
     * @constructor
     */
    sm.lSearch.iUrlUpdater.UrlUpdater = function() {


        /**
         * Query builder instance
         * @type {sm.iSmQueryBuilder.QueryBuilder}
         * @private
         */
        this.queryBuilder_ = new QueryBuilder();
    };
    var UrlUpdater = sm.lSearch.iUrlUpdater.UrlUpdater;


    /**
     * Build url from given params and update it
     * It check if html5history api supported by browser, and if it supported,
     * then update url without reload page via html5history api,
     * otherwise it reload page
     * @param  {Object<string, (Array|string|number|boolean)>} params
     */
    UrlUpdater.prototype.update = function(params) {
        var newUrl = this.generateUrl_(params);

        if (goog.history.Html5History.isSupported()) {
            window.history.pushState(null, null, newUrl);
        } else {
            window.location.href = newUrl;
        }
    };


    /**
     * Generate new url from given params
     * @param  {Object<string, (Array|string|number|boolean)>} params
     * @return {string} builded url
     * @private
     */
    UrlUpdater.prototype.generateUrl_ = function(params) {
        var currentPath = window.location.pathname;
        var transformedParams = this.prepareParams_(params);
        var queryData = this.queryBuilder_.buildUrlQuery(transformedParams);

        return currentPath + '?' + queryData.toString();
    };


    /**
     * Create query data from given params
     * @param {Object<string, (string|number|boolean)>} queryParams
     * @return {goog.uri.queryData}
     * @private
     */
    UrlUpdater.prototype.makeQueryData_ = function(queryParams) {
        return goog.Uri.QueryData.createFromMap(
            new goog.structs.Map(queryParams)
        );
    };

    /**
     * Prepare params map for build url
     * @param  {Object<string, (Array|string|number|boolean)>} params
     * @return {Object<string, (string|number|boolean)>}
     * @private
     */
    UrlUpdater.prototype.prepareParams_ = function(params) {
        return goog.object.filter(
            params, this.isNotEmptyParam_
        );
    };


    /**
     * Check that parame is not empty
     * Which means is not null and
     * if param is array it has length more than zero
     * @param  {?(Array|number|string|boolean)} param
     * @return {boolean}
     * @private
     */
    UrlUpdater.prototype.isNotEmptyParam_ = function(param) {
        var result = param;
        if (goog.isDefAndNotNull(param) && Array.isArray(param)) {
            result = param.length;
        }

        return !!result;
    };
});  // goog.scope

