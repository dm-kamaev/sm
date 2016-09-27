/**
 * @fileoverview Utilities for Search page for manipulating Search parameters
 *
 * It stores parameters and can update either each parameter or all at a time.
 *
 * Please note, that search params return and update in uncompressed state.
 */
goog.provide('sm.iSmSearchParamsManager.SmSearchParamsManager');

goog.require('goog.array');
goog.require('goog.events.EventTarget');
goog.require('goog.object');


goog.scope(function() {



    /**
     * Search parameters manager
     * @param {Object<string, (Array<number>|number|string)>} params
     * @constructor
     * @extends {goog.events.EventTarget}
     */
    sm.iSmSearchParamsManager.SmSearchParamsManager = function(params) {
        sm.iSmSearchParamsManager.SmSearchParamsManager.base(
            this, 'constructor');


        /**
         * Current search parameters
         * @type {Object<string, (Array<number>|number|string)>}
         * @dict
         * @private
         */
        this.params_ = params;
    };
    goog.inherits(
        sm.iSmSearchParamsManager.SmSearchParamsManager,
        goog.events.EventTarget
    );
    var SearchParamsManager = sm.iSmSearchParamsManager.SmSearchParamsManager;


    /**
     * Getter for search parameters for api request
     * Return parameters in uncompressed state and only params with values
     * @param {boolean} requestMapResults
     * @return {Object<string, (Array<number>|number|string)>}
     * @public
     */
    SearchParamsManager.prototype.getParams = function(requestMapResults) {
        var result = goog.object.filter(this.params_, this.hasNotEmptyValue_);
        if (requestMapResults) {
            goog.object.extend(result, {
                'requestMapResults': true
            });
        }

        return result;
    };


    /**
     * Return object with params which names are not in excluded params
     * @param {Array<string>} paramsToExclude
     * @return {Object<string, (Array<number>|number|string)>}
     */
    SearchParamsManager.prototype.getUrlParams = function(paramsToExclude) {
        return goog.object.filter(
            this.params_,
            goog.partial(this.isExcludedParam_, paramsToExclude),
            this);
    };


    /**
     * Setter for search params
     * @param {Object<string, (Array<number>|number|string)>} params
     * @public
     */
    SearchParamsManager.prototype.setParams = function(params) {
        this.params_ = params;
    };


    /**
     * Update params with given data
     * @param {Object<string, (Array<number>|number|string)>} params
     * @public
     */
    SearchParamsManager.prototype.updateParams = function(params) {
        if (!goog.object.isEmpty(params)) {
            this.updateParams_(params);
        }
    };


    /**
     * Set given sortType and return new sort type
     * @param {number} sortType
     * @return {?number}
     * @public
     */
    SearchParamsManager.prototype.setSortType = function(sortType) {
        return this.params_['sortType'] = sortType;
    };


    /**
     * Getter for text of search
     * @return {?string}
     * @public
     */
    SearchParamsManager.prototype.getName = function() {
        return goog.isDefAndNotNull(this.params_['name']) ?
            this.params_['name'] :
            null;
    };


    /**
     * Getter for sort type
     * @return {?number}
     * @public
     */
    SearchParamsManager.prototype.getSortType = function() {
        return goog.isDefAndNotNull(this.params_['sortType']) ?
            this.params_['sortType'] :
            null;
    };


    /**
     * Setter for page
     * @param {number} page
     * @public
     */
    SearchParamsManager.prototype.setPage = function(page) {
        this.params_['page'] = page;
    };


    /**
     * Increase by 1 current page.
     * Return increased page number,
     * if in current params page not defined return null
     * @return {?number}
     * @public
     */
    SearchParamsManager.prototype.increasePage = function() {
        return goog.isDefAndNotNull(this.params_['page']) ?
            this.params_['page']++ :
            null;
    };


    /**
     * Getter for page
     * @return {?number}
     * @public
     */
    SearchParamsManager.prototype.getPage = function() {
        return goog.isDefAndNotNull(this.params_['page']) ?
            this.params_['page'] :
            null;
    };


    /**
     * Check is parameter name not in excluded params
     * @param {Array<string>} excludedParams
     * @param {(number|string|Array<(number|string)>)} paramValue
     * @param {string} paramName
     * @return {boolean}
     * @private
     */
    SearchParamsManager.prototype.isExcludedParam_ = function(
        excludedParams, paramValue, paramName) {
        return !~goog.array.findIndex(
            excludedParams,
            function(excludedParamName) {
                return excludedParamName == paramName;
            }
        );
    };


    /**
     * Update search parameters object with given data
     * @param {Object<string, (Array<string>|number)>} params
     * @private
     */
    SearchParamsManager.prototype.updateParams_ = function(params) {
        goog.object.forEach(params, this.updateParam_, this);
    };


    /**
     * Update each param in params_ by given paramName and paramValue.
     * Please note, that 'text' field from given params corresponds to
     * 'name' field in params_
     * @param {(Array<number>|string|number)} paramValue
     * @param {string} paramName
     * @private
     */
    SearchParamsManager.prototype.updateParam_ = function(
        paramValue, paramName) {
            if (paramName == 'text') {
                this.params_['name'] = paramValue;
            } else {
                this.params_[paramName] = paramValue;
            }
    };


    /**
     * Check that parameter has not empty value
     * @param {(Array|Object|number|string)} value
     * @return {boolean}
     * @private
     */
    SearchParamsManager.prototype.hasNotEmptyValue_ = function(value) {
        var result = goog.isDefAndNotNull(value);

        if (result) {
            if (goog.isString(value)) {
                result = (value !== '');
            } else if (goog.isArray(value)) {
                result = !goog.array.isEmpty(value);
            } else if (goog.isObject(value)) {
                result = !goog.object.isEmpty(value);
            }
        }

        return result;
    };
});  // goog.scope
