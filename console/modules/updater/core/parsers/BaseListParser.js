'use strict';

const EmptyParser = require('./EmptyParser');

const StringParser = require('./StringParser');

const errors = require('../errors');

class BaseListParser extends EmptyParser {
    static splitData(pattern) {
        pattern = BaseListParser.splitBySemicolon(pattern);
        return pattern;
    }
    
    static splitBySeparator(pattern, separator) {
        var hasLength = pattern.length !== undefined;
        var isString = typeof pattern === 'string' && hasLength;
        var isList = typeof pattern === 'object' && hasLength;
        if (isString) {
            pattern = BaseListParser.splitStringBySeparator(pattern, separator);
        } else if (isList) {
            pattern = BaseListParser.splitListBySeparator(pattern, separator);
        } else {
            throw new errors.typeError.ListParserArgumentError(pattern);
        }
        return pattern;
    }
    
    static splitStringBySeparator(pattern, separator) {
        pattern = pattern.split(separator);
        pattern = pattern.map(item => item.trim());
        pattern = pattern.filter(item => item);
        return pattern;
    }
    
    static splitListBySeparator(pattern, separator) {
        var drafts = pattern.map(
            item => {
                return BaseListParser.splitStringBySeparator(
                    item, 
                    separator
                );
            }
        );
        pattern = [];
        drafts.forEach(
            draft => {
                pattern = pattern.concat(draft);
            }
        );
        return pattern;
    }
    
    static splitBySemicolon(pattern) {
        return BaseListParser.splitBySeparator(pattern, ';');
    }
    
    static splitByNewLine(pattern) {
        return BaseListParser.splitBySeparator(pattern, '\n');
    }
    
    static splitByComma(pattern) {
        return BaseListParser.splitBySeparator(pattern, ',');
    }
    
    parse() {
        var data = this.rawData_;
        data = BaseListParser.splitData(data);
        return {
            columnName: this.columnName,
            dataType: 'BASELIST',
            data: data,
        };
    }
}

module.exports = BaseListParser;
