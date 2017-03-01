'use strict';

const userView = require('../../../../api/modules/user/views/user'),
    footerView = require('../../../../api/modules/entity/views/footerView'),
    headerView = require('../../../../api/modules/entity/views/headerView'),
    sideMenuView = require('../../common/views/sideMenuView'),
    Subheader = require('../lib/UniversitySubheader'),
    FormatUtils = require('../../../../api/modules/entity/lib/FormatUtils');

const FULL_DESCRIPTION_LENGTH = 280;

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
        entityData: data.entityData,
        subunitType: data.subunitType,
        subunitName: data.subunitName,
        subscribeBoard: data.subscribeBoard,
        navigationPanel: data.navigationPanel,
        footer: footerView.render()
    };
};


/**
 * @param {Object<string, string>} data
 * @return {Object}
 */
view.subheader = function(data) {
    let subheader = new Subheader();

    subheader.init({
        isLogoRedirect: true,
        isSearchRedirect: true,
        user: data.user,
        favoriteEntities: data.favoriteEntities,
        isBottomLine: true
    });

    return subheader.getParams();
};

/**
 * @param  {string=} text
 * @return {Object}
 */
view.formatFullDescription = function(text) {
    let result = {
        cutText: []
    };

    if (text) {
        if (text.length > FULL_DESCRIPTION_LENGTH) {
            let formatUtils = new FormatUtils();
            result.fullText = [text];
            result.cutText.push(
                formatUtils.cutText(text, FULL_DESCRIPTION_LENGTH, ' ')
            );
        } else {
            result.cutText.push(text);
        }
    } else {
        result = null;
    }
    return result;
};

module.exports = view;
