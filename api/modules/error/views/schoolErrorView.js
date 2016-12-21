/**
 * @fileOverview Frontick view for school not found page layout
 */
'use strict';

const userView = require('../../user/views/user'),
    favoriteView = require('../../favorite/views/favoriteView'),
    seoView = require('../../school/views/seoView'),
    headerView = require('../../entity/views/headerView'),
    sideMenuView = require('../../../../app/modules/common/views/sideMenuView'),
    footerView = require('../../entity/views/footerView');

const SubHeader = require('../../school/lib/SchoolSubheader');

let schoolErrorView = {};

/**
 * Return template data for layout
 * @param {{
 *      header: Object,
 *      user: Object,
 *      favoriteEntities: Array<Object>,
 *      seoLinks: Array<Object>
 * }} data
 * @return {Object}
 */
schoolErrorView.render = function(data) {
    let user = userView.default(data.user),
        favoriteEntities = favoriteView.list(data.favorites);
    return {
        header: headerView.render(data.config, data.entityType),
        sideMenu: sideMenuView.render(data.config, data.entityType),
        subHeader: schoolErrorView.subHeader({
            favoriteEntities: favoriteEntities,
            user: user
        }),
        footer: footerView.render(
            seoView.linksList(data.seoLinks)
        ),
        user: user,
        authSocialLinks: data.authSocialLinks
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
schoolErrorView.subHeader = function(data) {
    let subHeader = new SubHeader();

    subHeader.init({
        isLogoRedirect: true,
        isSearchRedirect: true,
        user: data.user,
        favoriteEntities: data.favoriteEntities,
        isBottomLine: true
    });

    return subHeader.getParams();
};

module.exports = schoolErrorView;
