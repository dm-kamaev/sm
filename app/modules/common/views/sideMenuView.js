'use strict';

const footerView = require('../../../../api/modules/entity/views/footerView');

const Menu = require('../lib/Menu');

let sideMenuView = {
};

/**
 * Create params for render side menu
 * @param {{
 *     protocol: string,
 *     courses: {
 *         host: string
 *     },
 *     schools: {
 *         host: string
 *     }
 * }} config
 * @param {string} entityType
 * @return {{
 *     content: {
 *         menuItems: Array<Object>,
 *         footerItems: Array<Object>
 *     }
 * }}
 */
sideMenuView.render = function(config, entityType) {
    return {
        content: {
            menuItems: sideMenuView.menuItems(config, entityType),
            footerItems: footerView.render()
        }
    };
};

/**
 * Create params for menu items
 * @param {{
 *     protocol: string,
 *     courses: {
 *         host: string
 *     },
 *     schools: {
 *         host: string
 *     }
 * }} config
 * @param {string} entityType
 * @return {Array<{
 *     name: string,
 *     url: string,
 *     type: string,
 *     isSelected: boolean
 * }>}
 */
sideMenuView.menuItems = function(config, entityType) {
    let menu = new Menu({
        config: config,
        entityType: entityType
    });

    return menu.params;
};

module.exports = sideMenuView;
