'use strict';

const Header = require('../lib/Header');

const headerView = {};

/**
 * Header view
 * @param {{
 *     entityType: string,
 *     protocol: string,
 *     coursesHost: string,
 *     schoolsHost: string
 * }} config
 * @param {string} entityType
 * @return {Object<string, (string|Object)>}
 */
headerView.render = function(config, entityType) {
    let header = new Header();

    header.generateParams({
        entityType: entityType,
        config: config
    });

    return header.params;
};

module.exports = headerView;
