'use strict';

const userView = require('../../user/views/user');
const favoriteView = require('../../favorite/views/favoriteView');
const seoView = require('../../entity/views/seoView');
const footerView = require('../../entity/views/footerView'),
    headerView = require('../../entity/views/headerView'),
    sideMenuView = require('../../../../app/modules/common/views/sideMenuView');

const courseCategoryView = require('./courseCategoryView');

const Subheader = require('../lib/CourseSubheader');

let view = {};

/**
 * @param {{
 *     config: Object,
 *     user: Object,
 *     fbClientId: string,
 *     authSocialLinks: Object,
 *     entityData: Object,
 *     map: Object,
 *     favorites: Object,
 *     categories: Array<Object>,
 *     categoryAliases: Array<Object>,
 *     priceLabelText: string,
 *     actionButtonText: string
 * }} data
 * @return {Object}
 */
view.render = function(data) {
    let user = userView.default(data.user);

    return {
        seo: {
            metaTitle: 'Профориентационный курс ' + data.entityData.name +
                ' в Москве: стоимость обучения, отзывы.',
            metaDescription: seoView.formatSeoDescription(
                data.entityData.description
            )
        },
        openGraph: {
            title: 'Курс ' + data.entityData.name + ' на «Курсах Мела»',
            description: data.entityData.description,
            image: data.entityData.relapImgUrl,
            relapTag: data.entityData.category,
            relapImage: data.entityData.relapImgUrl,
            fbClientId: data.fbClientId
        },
        header: headerView.render(data.config, data.entityType),
        sideMenu: sideMenuView.render(data.config, data.entityType),
        subHeader: view.subheader({
            listLinks: courseCategoryView.listLinks(
                data.categories,
                data.categoryAliases
            ),
            favoriteEntities: favoriteView.list(data.favorites),
            user: user
        }),
        user: user,
        authSocialLinks: data.authSocialLinks,
        entityData: data.entityData,
        map: data.map,
        priceLabelText: data.priceLabelText,
        actionButtonText: data.actionButtonText,
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
        listLinks: data.listLinks,
        isSearchRedirect: true,
        user: data.user,
        favoriteEntities: data.favoriteEntities,
        isBottomLine: true
    });

    return subheader.getParams();
};

module.exports = view;
