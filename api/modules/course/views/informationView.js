'use strict';

const userView = require('../../user/views/user');
const favoriteView = require('../../favorite/views/favoriteView');
const seoView = require('../../entity/views/seoView');

const courseCategoryView = require('./courseCategoryView');

const Subheader = require('../lib/CourseSubheader'),
    Header = require('../../entity/lib/Header');

let view = {};

/**
 * @param {{
 *     header: Object,
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
    var user = userView.default(data.user);

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
            image: '/static/images/n-clobl/i-layout/cources_sharing.png',
            fbClientId: data.fbClientId,
        },
        header: data.header,
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
        actionButtonText: data.actionButtonText
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
        contacts: Header.CONTACTS,
        listLinks: data.listLinks,
        isSearchRedirect: true,
        user: data.user,
        favoriteEntities: data.favoriteEntities,
        isBottomLine: true
    });

    return subheader.getParams();
};

module.exports = view;
