'use strict';

const BaseListParser = require('./BaseListParser');

class ArrayOfIntArraysParser extends BaseListParser {
    static splitData(pattern) {
        pattern = BaseListParser.splitByNewLine(pattern);
        pattern = pattern.map(
            item => {
                return BaseListParser
                    .splitByComma(item)
                    .map(value => parseInt(value, 10));
            }
        );
        return pattern;
    }
    
    parse() {
        var data = this.rawData_;
        data = ArrayOfIntArraysParser.splitData(data);
        return {
            columnName: this.columnName,
            dataType: 'ARRAYINTARRAYS',
            data: data,
        };
    }
}

module.exports = ArrayOfIntArraysParser;
