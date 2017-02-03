'use strict';

const userView = require('../../../../api/modules/user/views/user');

const footerView = require('../../../../api/modules/entity/views/footerView'),
    headerView = require('../../../../api/modules/entity/views/headerView'),
    sideMenuView = require('../../common/views/sideMenuView');

// const Subheader =
// require('../../../../api/modules/course/lib/CourseSubheader');

let view = {};

/**
 * @param {{
 *     user: Object,
 *     authSocialLinks: Object,
 *     entityType: string,
 *     config: Object
 * }} data
 * @return {Object}
 */
view.render = function(data) {
    let user = userView.default(data.user);

    return {
        seo: {
            metaTitle: '',
            metaDescription: ''
        },
        openGraph: {},
        header: headerView.render(data.config, data.entityType),
        sideMenu: sideMenuView.render(data.config, data.entityType),
        subHeader: view.subheader({
            favoriteEntities: {},
            user: user
        }),
        user: user,
        authSocialLinks: data.authSocialLinks,
        entityData: {},
        footer: footerView.render()
    };
};


/**
 * @param {Object<string, string>} data
 * @return {Object}
 */
view.subheader = function(data) {
    // let subheader = new Subheader();

    // subheader.init({
    //     isLogoRedirect: true,
    //     isSearchRedirect: true,
    //     user: data.user,
    //     favoriteEntities: data.favoriteEntities,
    //     isBottomLine: true
    // });

    // return subheader.getParams();
    return {};
};

module.exports = view;
