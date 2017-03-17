/**
 * @fileOverview Frontick view for school home page layout
 */
'use strict';

const userView = require('../../user/views/user').userView,
    favoriteView = require('../../favorite/views/favoriteView'),
    footerView = require('../../entity/views/footerView'),
    headerView = require('../../entity/views/headerView'),
    sideMenuView = require('../../../../app/modules/common/views/sideMenuView'),
    seoView = require('./seoView');

const SubHeader = require('../lib/SchoolSubheader');

let homeView = {};

/**
 * Return template data for layout
 * @param {{
 *      config: Object,
 *      entityType: string,
 *      user: Object,
 *      favorites: Array<Object>,
 *      seoLinks: Array<Object>,
 *      authSocialLinks: {
 *          vk: string,
 *          fb: string
 *      }
 * }} data
 * @return {Object}
 */
homeView.render = function(data) {
    let user = userView.renderDefault(data.user),
        favoriteEntities = favoriteView.list(data.favorites);
    return {
        header: headerView.render(data.config, data.entityType),
        sideMenu: sideMenuView.render(data.config, data.entityType),
        subHeader: homeView.subHeader({
            favoriteEntities: favoriteEntities,
            user: user
        }),
        user: user,
        authSocialLinks: data.authSocialLinks,
        footer: footerView.render(
            seoView.linksList(data.seoLinks)
        )
    };
};

/**
 * Subheader params init
 * @param {{
 *      user: Object,
 *      favoriteEntities: Array<Object>
 * }} data
 * @return {Object}
 */
homeView.subHeader = function(data) {
    let subHeader = new SubHeader();

    return subHeader.render({
        isLogoRedirect: false,
        isSearchRedirect: true,
        user: data.user,
        favoriteEntities: data.favoriteEntities,
        isBottomLine: false
    });
};

module.exports = homeView;
