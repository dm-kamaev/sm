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
    let costField = lodash.camelCase(priceType),
        result;

    let arrayOfCosts = options
        .map(option => option[costField])
        .filter(cost => cost !== null);

    if (arrayOfCosts.length === 0) {
        result = 'Цена не указана';
    } else {
        let cost = Math.min.apply(null, arrayOfCosts);

        if (cost === 0) {
            result = 'Бесплатно';
        } else if (priceType === categoryPrice.COST_PER_HOUR) {
            result = `От ${cost} руб. / час`;
        } else if (priceType === categoryPrice.TOTAL_COST) {
            result = `От ${cost} руб. / курс`;
        }
    }

    return result;
};

module.exports = view;
