'use strict';

const EmptyParser = require('./EmptyParser');

const errors = require('../errors');

class BaseListParser extends EmptyParser {
    /**
     * @param  {string}         pattern
     *
     * @return {string[]}
     */
    static splitData(pattern) {
        pattern = BaseListParser.splitBySemicolon(pattern);
        return pattern;
    }

    /**
     * @param  {string|object}  pattern
     * @param  {string}         separator
     *
     * @return {string[]}
     */
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

    /**
     * @param  {string}         pattern
     * @param  {string}         separator
     *
     * @return {string[]}
     */
    static splitStringBySeparator(pattern, separator) {
        pattern = pattern.split(separator);
        pattern = pattern.map(item => item.trim());
        pattern = pattern.filter(item => item);
        return pattern;
    }

    /**
     * @param  {object}         pattern
     * @param  {string}         separator
     *
     * @return {string[]}
     */
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

    /**
     * @param  {string}         pattern
     *
     * @return {string[]}
     */
    static splitBySemicolon(pattern) {
        return BaseListParser.splitBySeparator(pattern, ';');
    }

    /**
     * @param  {string}         pattern
     *
     * @return {string[]}
     */
    static splitByNewLine(pattern) {
        return BaseListParser.splitBySeparator(pattern, '\n');
    }

    /**
     * @param  {string}         pattern
     *
     * @return {string[]}
     */
    static splitByComma(pattern) {
        return BaseListParser.splitBySeparator(pattern, ',');
    }

    /**
     * @return {object}
     */
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
