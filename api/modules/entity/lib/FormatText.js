'use strict';

class FormatText {
    /**
     * Create short text for comment.
     * Search last dot when slicing, and slices to it position.
     * @param {string} text
     * @param {number} maxLength
     * @return {string}
     */
    cut(text, maxLength) {
        var result;
        if (text.length > maxLength) {
            var lastDotIndex = text.substr(0, maxLength).lastIndexOf('.');

            /** Get a part from text from beginning to last dot, include dot **/
            result = text.slice(0, lastDotIndex + 1);
        }
        return result;
    };
};

module.exports = FormatText;
