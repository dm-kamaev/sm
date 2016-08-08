'use strict';

const StringParser = require('./StringParser');

const PositiveValues = [
    'да',
    'есть',
];

const NegativeValues = [
    'нет',
    'отсутствует',
];

class BoolParser extends StringParser {
    /**
     * @return {object}
     */
    parse() {
        var data = null;
        var isPositiveValue = 
            PositiveValues.indexOf(this.rawData_) !== -1;
        if (isPositiveValue) {
            data = true;
        }
        var isNegativeValue = 
            NegativeValues.indexOf(this.rawData_) !== -1;
        if (isNegativeValue) {
            data = false;
        }
        return {
            columnName: this.columnName,
            dataType: 'BOOL',
            data: data,
        };
    }
}

module.exports = BoolParser;
