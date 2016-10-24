'use strict';

const searchType = require('../enums/searchType');

let service = {
    name: 'courseFilter'
};


/**
 * Return all possible filters
 * @return {Array<string>}
 */
service.getAll = function() {
    return searchType.toArray();
};

module.exports = service;
