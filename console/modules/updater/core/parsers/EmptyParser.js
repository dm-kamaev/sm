'use strict';

class EmptyParser {
    /**
     * @constructor
     * @param {Object} rawData
     */
    constructor(rawData) {
        this.rawData_ = rawData;
        this.columnName = '';
    }

    /**
     * @return {object}
     */
    parse() {
        return {
            columnName: this.columnName,
            dataType: 'EMPTY',
            data: null,
        };
    }

    /**
     * @return {bool}
     */
    get isString() {
        var hasLength = this.data.length !== undefined;
        return typeof this.data === 'string' && hasLength;
    }

    /**
     * @return {bool}
     */
    get isList() {
        var hasLength = this.data.length !== undefined;
        return typeof this.data === 'object' && hasLength;
    }
}

module.exports = EmptyParser;
