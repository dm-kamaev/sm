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
 * @param {{
 *     firstName: string,
 *     lastName: string,
 *     photoUrl: ?string
 * }} user
 * @return {Object<string, (string|Object)>}
 */
headerView.render = function(config, entityType, user) {
    let header = new Header();

    header.generateParams({
        entityType: entityType,
        config: config,
        user: user
    });

    return header.params;
};

module.exports = headerView;
