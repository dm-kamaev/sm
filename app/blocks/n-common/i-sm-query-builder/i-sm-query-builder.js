/**
 * @fileoverview Query builder for get requests
 *
 * It can build query params for url and for api requests
 */
goog.module('sm.iSmQueryBuilder.QueryBuilder');

const QueryData = goog.require('goog.Uri.QueryData');
const StructMap = goog.require('goog.structs.Map');
const GoogObject = goog.require('goog.object');


/**
 * Query builder class
 */
class QueryBuilder {
    /**
     * Create querystring for api from given data object
     * @param {Object<string, (string|number|Object|Array)>} data
     *     Map of parameters from which build query
     * @return {string} Built query
     * @public
     */
    buildApiQuery(data) {
        const params = this.transformParams_(
            data,
            this.transformApiParam_
        );
        return this.makeQueryData_(params);
    }


    /**
     * Create querystring for url from given data object
     * @param {Object<string, (string|number|Object|Array)>} data
     *     Map of parameters from which build query
     * @return {string} Built query
     * @public
     */
    buildUrlQuery(data) {
        const params = this.transformParams_(
            data,
            this.transformUrlParam_
        );
        return this.makeQueryData_(params);
    }


    /**
     * Create query data from given params
     * @param {Object<string, (string|number|boolean)>} queryParams
     * @return {goog.uri.queryData}
     * @private
     */
    makeQueryData_(queryParams) {
        return QueryData.createFromMap(
            new StructMap(queryParams)
        );
    };


    /**
     * Transform params map for build url
     * @param {Object<string, (Array|string|number|boolean)>} params Params
     *      which need to transform
     * @param {Function} transformFunction Function which be apply for all
     *      params to transform it
     * @return {Object<string, (string|number|boolean)>}
     * @private
     */
    transformParams_(params, transformFunction) {
        return goog.object.map(params, transformFunction, this);
    }


    /**
     * Transform array to string of elements divivded by commas
     * @param  {(Array|number|string|boolean)} param
     * @return {(string|number|boolean)} trasformed param
     * @private
     */
    transformUrlParam_(param) {
        var result = param;

        if (Array.isArray(param)) {
            result = this.stringifyArray_(param);
        }

        return result;
    };


    /**
     * Transform only arrays of objects to by JSON.stringify it
     * @param  {(Array|number|string|boolean)} param
     * @return {(string|number|boolean)} trasformed param
     * @private
     */
    transformApiParam_(param) {
        var result = param;

        if (Array.isArray(param)) {
            if (this.isObjectArray_(param)) {
                result = JSON.stringify(param);
            }
        }

        return result;
    };


    /**
     * Transform array of primitives or objects to string
     * @param {Array<(number|string|Object)>} arrayParam
     * @return {string}
     * @private
     */
    stringifyArray_(arrayParam) {
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
    isObjectArray_(array) {
        return array.some((item) => goog.isObject(item));
    };
}
exports = QueryBuilder;

