/**
 * @fileOverview Frontick view for school home page layout
 */
'use strict';

const userView = require('../../user/views/user'),
    favoriteView = require('../../favorite/views/favoriteView'),
    seoView = require('./seoView');

const Header = require('../../entity/lib/Header'),
    SubHeader = require('../lib/SchoolSubheader');

let homeView = {};

/**
 * Return template data for layout
 * @param {{
 *      user: Object,
 *      favoriteEntities: Array<Object>,
 *      seoLinks: Array<Object>
 * }} data
 * @return {Object}
 */
homeView.render = function(data) {
    let user = userView.default(data.user),
        favoriteEntities = favoriteView.list(data.favorites);
    return {
        subHeader: homeView.subHeader({
            favoriteEntities: favoriteEntities,
            user: user
        }),
        seoLinks: seoView.linksList(data.seoLinks),
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
homeView.subHeader = function(data) {
    let subHeader = new SubHeader();

    subHeader.init({
        isLogoRedirect: false,
        contacts: Header.CONTACTS,
        isSearchRedirect: true,
        user: data.user,
        favoriteEntities: data.favoriteEntities,
        isBottomLine: false
    });

    return subHeader.getParams();
};

module.exports = homeView;
