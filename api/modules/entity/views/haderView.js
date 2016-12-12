'use strict';

const entityType = require('../enums/entityType');

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

    header.init({
        entityType: entityType,
        entityLinks: headerView.links(config)
    });

    return header.getParams();
};


/**
 * Generate links for header menu
 * @param {{
 *     protocol: string,
 *     courses: {
 *         host: string
 *     },
 *     schools: {
 *         host: string
 *     }
 * }} config
 * @return {Object<string, string>}
 */
headerView.links = function(config) {
    let protocol = config.protocol;
    return {
        [entityType.SCHOOL]: `${protocol}://${config.schools.host}`,
        [entityType.COURSE]: `${protocol}://${config.courses.host}`
    };
};

module.exports = headerView;
