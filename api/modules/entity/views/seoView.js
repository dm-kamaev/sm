'use strict';

const FormatText = require('../lib/FormatText');

let seoView = {};

const DESCRIPTION_LENGTH = 160;

/**
 * Cuts text to point, if point is, else cuts to lenght = DESCRIPTION_LENGTH
 * @param  {string=} text
 * @return {string}
 */
seoView.formatSeoDescription = function(text) {
    let result;

    if (text) {
        let formatText = new FormatText();

        let maxDescription = formatText.cut(
            text,
            DESCRIPTION_LENGTH,
            ' '
        );

        result = formatText.cut(
            maxDescription,
            maxDescription.length - 1,
            '.',
            true
        );
    } else {
        result = null;
    }
    return result;
};

module.exports = seoView;
