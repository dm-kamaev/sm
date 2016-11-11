'use strict';

class FormatUtils {
    /**
     * Create short text for comment.
     * Search last dot when slicing, and slices to it position.
     * @param {string} text
     * @param {number} maxLength
     * @param {string} symbol - symbol before cut
     * @param {boolean=} opt_includeLast
     * @return {string}
     */
    cutText(text, maxLength, symbol, opt_includeLast) {
        let result,
            lastSymbol = opt_includeLast ? 1 : 0;
        if (text.length > maxLength) {
            let lastDotIndex = text.substr(0, maxLength).lastIndexOf(symbol);

            /** Get a part from text from beginning to last dot, include dot **/
            result = text.slice(0, lastDotIndex + lastSymbol);
        }
        return result || text;
    };


    /**
     * Transform any type value to array
     * @param  {(number|string|undefined|Array)} value
     * @return {Array}
     */
    transformToArray(value) {
        let result = [];
        if (value) {
            switch (typeof value) {
            case 'number':
                result = this.transformNumberToArray(value);
                break;
            case 'string':
                result = this.transformStringToArray(value);
                break;
            case 'object':
                result = this.transformObjectToArray(value);
                break;
            }
        }
        return result;
    };


    /**
     * Transform string to array
     * @param {string} value
     * @return {Array<string>}
     */
    transformStringToArray(value) {
        let result;
        if (~value.indexOf(',')) {
            result = value.split(',');
        } else {
            result = [value];
        }
        return result;
    };


    /**
     * Transform number to array
     * @param {number} value
     * @return {Array<number>}
     */
    transformNumberToArray(value) {
        return [value];
    };


    /**
     * Transform object to array
     * @param {Object|Array} value
     * @return {Array}
     */
    transformObjectToArray(value) {
        let result = [];
        if (Array.isArray(value)) {
            result = value;
        }
        return result;
    };
};

module.exports = FormatUtils;
