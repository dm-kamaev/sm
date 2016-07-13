'use strict';

class EmptyParser {
    constructor(rawData) {
        this.rawData_ = rawData;
        this.columnName = '';
    }
    
    parse() {
        return {
            columnName: this.columnName,
            dataType: 'EMPTY',
            data: null,
        };
    }
    
    get isString() {
        var hasLength = this.data.length !== undefined;
        return typeof this.data === 'string' && hasLength;
    }
    get isList() {
        var hasLength = this.data.length !== undefined;
        return typeof this.data === 'object' && hasLength;
    }
}

module.exports = EmptyParser;
