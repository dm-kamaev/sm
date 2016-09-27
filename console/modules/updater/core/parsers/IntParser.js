'use strict';

const EmptyParser = require('./EmptyParser');

class IntParser extends EmptyParser {
    /**
     * @return {object}
     */
    parse() {
        var data = this.rawData_;
        return {
            columnName: this.columnName,
            dataType: 'INT',
            data: data,
        };
    }
}

module.exports = IntParser;
