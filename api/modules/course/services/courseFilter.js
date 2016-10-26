'use strict';

const filterName = require('../enums/filterName');

let service = {
    name: 'courseFilter'
};


/**
 * Return all possible filters
 * @return {Array<string>}
 */
service.getAll = function() {
    return filterName.toArray();
};

module.exports = service;
