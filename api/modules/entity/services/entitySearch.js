'use strict';

const lodash = require('lodash');


const COMMON_PARAMS = ['page', 'sortType'];

let service = {
    name: 'entitySearch'
};

/**
 * Detect is empty given search params
 * @param {Object<string, (string|number|Array)>} searchParams
 * @return {boolean}
 */
service.isEmptyParams = function(searchParams) {
    return lodash.every(searchParams, this.isEmptyParam);
};


/**
 * Check is given param value is empty
 * @param {(Object|Array|number|string)} paramValue
 * @param {string} paramName
 * @return {boolean}
 */
service.isEmptyParam = function(paramValue, paramName) {
    let result = true;
    let isUncommonParam = !~lodash.findIndex(COMMON_PARAMS, commonParamName => {
        return paramName == commonParamName;
    });

    if (isUncommonParam) {
        if (lodash.isNumber(paramValue)) {
            result = paramValue >= 0;
        } else {
            result = lodash.isEmpty(paramValue);
        }
    }

    return result;
};

module.exports = service;
