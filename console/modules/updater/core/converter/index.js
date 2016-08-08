'use strict';

const array = require('./array');
const bool = require('./bool');
const list = require('./list');
const string = require('./string');
const pairsArray = require('./pairsArray');
const intArraysArray = require('./intArraysArray');

const errors = require('../errors');

var convertToString = function(values) {
    var result = '';
    if (values.length) {
        var dataType = values[0].dataType;
        var isAllDataTypesMatch = true;
        values.forEach(
            value => {
                isAllDataTypesMatch = 
                    isAllDataTypesMatch && 
                    value.dataType === dataType;
            }
        );
        if (!isAllDataTypesMatch) {
            throw new errors.typeError.DataTypesNotMatchError(values);
        }
        var converter = module.exports[dataType];
        if (!converter) {
            throw new errors.typeError.UnknownDataTypeError(dataType);
        }
        result = converter(values);
    } else {
        throw new errors.typeError.EmptyListError();
    }
    return result;
}

module.exports = {
    ARRAY: array,
    PAIRSARRAY: pairsArray,
    ARRAYINTARRAYS: intArraysArray,
    BOOL: bool,
    BASELIST: list,
    STRING: string,
    convertToString: convertToString,
};
