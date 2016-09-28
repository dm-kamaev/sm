'use strict';

class FormatText {
    /**
     * Create short text for comment.
     * Search last dot when slicing, and slices to it position.
     * @param {string} text
     * @param {number} maxLength
     * @param {string} symbol - symbol before cut
     * @param {boolean=} opt_includeLast
     * @return {string}
     */
    cut(text, maxLength, symbol, opt_includeLast) {
        let result,
            lastSymbol = opt_includeLast ? 1 : 0;
        if (text.length > maxLength) {
            let lastDotIndex = text.substr(0, maxLength).lastIndexOf(symbol);

            /** Get a part from text from beginning to last dot, include dot **/
            result = text.slice(0, lastDotIndex + lastSymbol);
        }
        return result;
    };
};

module.exports = FormatText;
