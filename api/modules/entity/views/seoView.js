'use strict';

const FormatUtils = require('../lib/FormatUtils');

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
        let formatUtils = new FormatUtils();

        let maxDescription = formatUtils.cutText(
            text,
            DESCRIPTION_LENGTH,
            ' '
        );

        result = formatUtils.cutText(
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
