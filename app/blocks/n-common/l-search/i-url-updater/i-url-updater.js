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



    /**
     * Url updater
     * @constructor
     */
    sm.lSearch.iUrlUpdater.UrlUpdater = function() {};
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
        var transformedParams = this.transformParams_(params);
        var queryData = this.makeQueryData_(transformedParams);

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
     * Transform params map for build url
     * @param  {Object<string, (Array|string|number|boolean)>} params
     * @return {Object<string, (string|number|boolean)>}
     * @private
     */
    UrlUpdater.prototype.transformParams_ = function(params) {
        var notEmptyParams = goog.object.filter(
            params, this.isNotEmptyParam_
        );

        return goog.object.map(notEmptyParams, this.transformParam_, this);
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


    /**
     * Transform array to string of elements divivded by commas
     * @param  {(Array|number|string|boolean)} param
     * @return {(string|number|boolean)} trasformed param
     * @private
     */
    UrlUpdater.prototype.transformParam_ = function(param) {
        var result = param;

        if (Array.isArray(param)) {
            result = this.transformArray_(param);
        }

        return result;
    };

    /**
     * Transform array of primitives or objects to string
     * @param {Array<(number|string|Object)>} arrayParam
     * @return {string}
     * @private
     */
    UrlUpdater.prototype.transformArray_ = function(arrayParam) {
        var result;

        if (this.isObjectArray_(arrayParam)) {
            result = JSON.stringify(arrayParam);
        } else {
            result = arrayParam.toString();
        }

        return result;
    };

    /**
     * Check that in given array one of members are Object
     * @param {Array<(number|string|Object)>} array
     * @return {boolean}
     * @private
     */
    UrlUpdater.prototype.isObjectArray_ = function(array) {
        return array.some(item => goog.isObject(item));
    };
});  // goog.scope
