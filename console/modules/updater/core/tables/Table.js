'use strict';

const lodash = require('lodash');

class Table {
    constructor(data, parsingMap) {
        if(!data || !parsingMap) {
            throw new Error('Invalid school constrictor params!');
        }
        this.rawData_ = data;
        this.map_ = parsingMap;
        this.parse();
    }
    
    get name() {
        return 'table';
    }
    
    parse() {
        this.data = [];
        Object.keys(this.rawData_).forEach(
            key => {
                var data = this.rawData_[key];
                var hasData = this.checkData(data);
                if (hasData) {
                    var Parser = this.map_[key].parser;
                    var columnName = this.map_[key].columnName;
                    var additionalHandler = 
                        this.map_[key].additionalHandler;
                    if (!Parser) {
                        throw new Error(
                            'Can not parse column \'' + key + 
                            '\'. Parser is unknown.'
                        );
                    }
                    var parser = new Parser(data);
                    parser.columnName = columnName;
                    data = parser.parse()
                    if (additionalHandler) {
                        data = additionalHandler(data);
                    }
                    this.data.push(data);
                }
            }
        );
        this.columns = lodash.groupBy(this.data, 'columnName');
        return this.data;
    }
    
    checkData(data) {
        var result;
        var isString = (typeof data === 'string');
        var isNumber = (typeof data === 'number');
        if (isString) {
            var isNotEmpty = data && true;
            var hasLength = data.replace(/ /g, '').length > 2;
            result = isNotEmpty && hasLength;
        }
        if (isNumber) {
            result = true;
        }
        return result;
    }
    
    isColumnExists(columnName) {
        return (this.columns && this.columns[columnName] && true);
    }
};

module.exports = Table;
