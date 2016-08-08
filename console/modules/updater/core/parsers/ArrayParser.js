'use strict';

const BaseListParser = require('./BaseListParser');

class ArrayParser extends BaseListParser {
    static splitData(pattern) {
        pattern = BaseListParser.splitByNewLine(pattern);
        pattern = pattern.map(item => {
            item = item.split(';').filter(val => val)[0];
            return item;
        });
        return pattern;
    }
    
    parse() {
        var data = this.rawData_;
        data = ArrayParser.splitData(data);
        return {
            columnName: this.columnName,
            dataType: 'ARRAY',
            data: data,
        };
    }
}

module.exports = ArrayParser;
