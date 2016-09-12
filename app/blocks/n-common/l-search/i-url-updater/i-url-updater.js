/**
 * @fileoverview Class, for create url and update url from given map
 *
 * It check supportion of html5 history api,
 * then create new url from given not-empty parameters,
 * then update url with reloading page or not (depends of supportion html5
 * history api)
 */
goog.provide('sm.lSearch.iUrlUpdater.UrlUpdater');

goog.require('goog.Uri.QueryData');
goog.require('goog.events.EventTarget');
goog.require('goog.history.Html5History');
goog.require('goog.object');
goog.require('goog.structs.Map');


goog.scope(function() {
    var UrlUpdater = sm.lSearch.iUrlUpdater.UrlUpdater;


    /**
     * Build url from given params and update it
     * It check if html5history api supported by browser, and if it supported,
     * then update url without reload page via html5history api,
     * otherwise it reload page
     * @param  {Object<string, (Array|string|number|boolean)>} params
     */
    UrlUpdater.update = function(params) {
        var newUrl = UrlUpdater.generateUrl_(params);

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
    UrlUpdater.generateUrl_ = function(params) {
        var currentPath = window.location.pathname;
        var transformedParams = UrlUpdater.transformParams_(params);
        var queryData = UrlUpdater.makeQueryData_(transformedParams);

        return currentPath + '?' + queryData.toString();
    };


    /**
     * Create query data from given params
     * @param {Object<string, (string|number|boolean)>} queryParams
     * @return {goog.uri.queryData}
     * @private
     */
    UrlUpdater.makeQueryData_ = function(queryParams) {
        return goog.Uri.QueryData.createFromMap(
            new goog.structs.Map(queryParams)
        );
    };

    /**
    * Transform params map for build url
    * @param  {Object<string, (Array|string|number|boolean)>} params
    * @return {Object<string, (string|number|boolean)>}
    * @private
    */
    UrlUpdater.transformParams_ = function(params) {
        var notEmptyParams = goog.object.filter(
            params, UrlUpdater.isNotEmptyParam_
        );

        return goog.object.map(notEmptyParams, UrlUpdater.transformParam_);
    };


    /**
    * Check that parame is not empty
    * Which means is not null and
    * if param is array it has length more than zero
    * @param  {?(Array|number|string|boolean)} param
    * @return {boolean}
    * @private
    */
    UrlUpdater.isNotEmptyParam_ = function(param) {
        var result = param;
        if (goog.isDefAndNotNull(param) && Array.isArray(param)) {
            result = param.length;
        }

        return !!result;
    };


    /**
    * Transform array to string of elements divivded by commas
    * @param  {(Array|number|string|boolean)} param
    * @return {(string|number|boolean)} trasformed param
    * @private
    */
    UrlUpdater.transformParam_ = function(param) {
        var result = param;
        if (Array.isArray(param)) {
            result = goog.isNull(param) ? null : param.toString();
        }

        return result;
    };

});  // goog.scope
