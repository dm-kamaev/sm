'use strict';

var errors = {};

errors.ListParserArgumentError = function(argument) {
    this.code = 'ListParserArgumentError';
    this.message = 
        'Argument type must be {string|list} but found ' + 
        typeof argument;
    Error.call(this, this.message);
};

errors.EmptyListError = function() {
    this.code = 'EmptyListError';
    this.message = 
        'Converted values can not be empty';
    Error.call(this, this.message);
};

errors.DataTypesNotMatchError = function(values) {
    this.code = 'DataTypesNotMatchError';
    this.message = 
        'Values types of data do not match!';
    this.values = values;
    Error.call(this, this.message);
};
errors.UnknownDataTypeError = function(dataType) {
    this.code = 'UnknownDataTypeError';
    this.message = 
        'DataType \'' + dataType + '\' not allowed!';
    Error.call(this, this.message);
};

module.exports = errors;
