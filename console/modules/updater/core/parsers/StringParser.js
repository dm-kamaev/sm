'use strict';

const EmptyParser = require('./EmptyParser');

class StringParser extends EmptyParser {
    static replaceSeparators(pattern) {
        pattern = pattern.replace(/\n/g, ' ');
        pattern = pattern.replace(/\t/g, ' ');
        pattern = pattern.trim();
        return pattern;
    }
    
    parse() {
        var data = this.rawData_;
        data = StringParser.replaceSeparators(data);
        return {
            columnName: this.columnName,
            dataType: 'STRING',
            data: data,
        };
    }
}

module.exports = StringParser;
