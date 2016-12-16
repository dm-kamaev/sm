'use strict';

const categoryPrice = require('../enums/categoryPrice'),
    lodash = require('lodash');

let view = {};

/**
 * @param  {number} cost
 * @param  {string} field
 * @return {{
 *     value: number,
 *     type: string
 * }}
 */
view.formatListCost = function(cost, field) {
    let fields = {
        [categoryPrice.TOTAL_COST]: 'курс',
        [categoryPrice.COST_PER_HOUR]: 'час'
    };
    return {
        value: cost,
        type: fields[field]
    };
};

/**
 * @param  {Array<Object>} options
 * @param  {string}        priceType
 * @return {string}
 */
view.formatPageCost = function(options, priceType) {
    let costField = lodash.camelCase(priceType);

    let value = Math.min.apply(
            null,
            options.map(option => option[costField])
        ),
        text;
    if (priceType == categoryPrice.COST_PER_HOUR) {
        text = 'руб. / час';
    } else if (priceType == categoryPrice.TOTAL_COST) {
        text = 'руб. / курс';
    }

    return `${value} ${text}`;
};

module.exports = view;
