'use strict';

const userView = require('../../user/views/user').userView;
const favoriteView = require('../../favorite/views/favoriteView');
const seoView = require('../../entity/views/seoView');

const courseView = require('./courseView'),
    courseCategoryView = require('./courseCategoryView');

const footerView = require('../../entity/views/footerView'),
    headerView = require('../../entity/views/headerView'),
    sideMenuView = require('../../../../app/modules/common/views/sideMenuView');

const Subheader = require('../lib/CourseSubheader');

const courseImageSize = require('../enums/courseImageSize');

let view = {};

/**
 * @param {{
 *     config: Object,
 *     user: Object,
 *     fbClientId: string,
 *     authSocialLinks: Object,
 *     favorites: Object,
 *     course: Object,
 *     categoryAlias: string,
 *     categories: Array<Object>,
 *     categoryAliases: Array<Object>,
 *     actionButtonText: string,
 *     seoParams: ?{
 *         pagePrefixTabTitle: string
 *     }
 * }} data
 * @return {Object}
 */
view.render = function(data) {
    let user = userView.renderDefault(data.user),
        entityData = courseView.page(data.course, data.categoryAlias);

    let imageOpenGraph = entityData.imageUrl ?
        entityData.imageUrl.replace(
            '{width}',
            courseImageSize.MEDIUM[0]
        ) :
        null;

    let pagePrefixTabTitle =
        (data.seoParams && data.seoParams.pagePrefixTabTitle) ?
            data.seoParams.pagePrefixTabTitle :
            'Курс';

    let metaInformation = {
        seo: {
            metaTitle: `${pagePrefixTabTitle} ${entityData.name} в Москве: ` +
                'стоимость обучения, отзывы.',
            metaDescription: seoView.formatSeoDescription(
                entityData.description
            )
        },
        openGraph: {
            title: 'Курс ' + entityData.name + ' на «Курсах Мела»',
            description: entityData.description,
            image: imageOpenGraph,
            relapTag: entityData.categoryName,
            relapImage: imageOpenGraph,
            fbClientId: data.fbClientId
        }
    };

    if (data.pageMetaInformation) {
        metaInformation = view.actualizeMetaInformation(
            metaInformation,
            data.pageMetaInformation
        );
    }

    return {
        seo: metaInformation.seo,
        openGraph: metaInformation.openGraph,
        header: headerView.render(data.config, data.entityType, user),
        sideMenu: sideMenuView.render(data.config, data.entityType),
        subHeader: view.subheader({
            listLinks: courseCategoryView.listLinks(
                data.categories,
                data.categoryAliases
            ),
            favoriteEntities: favoriteView.list(data.favorites)
        }),
        user: user,
        authSocialLinks: data.authSocialLinks,
        entityData: entityData,
        map: courseView.pageMap(data.course, data.categoryAlias),
        priceLabelText: 'Гарантия лучшей цены',
        actionButtonText: data.actionButtonText ?
            data.actionButtonText :
            'Хочу этот курс!',
        footer: footerView.render()
    };
};


/**
 * @param {Object} information
 * @param {Object} actualInformation
 * @return {Object}
 */
view.actualizeMetaInformation = function(information, actualInformation) {
    let result = information;

    if (actualInformation.tabTitle) {
        result.seo.metaTitle = actualInformation.tabTitle;
    }

    if (actualInformation.seoDescription) {
        result.seo.metaDescription = actualInformation.seoDescription;
    }

    if (actualInformation.openGraphTitle) {
        result.openGraph.title = actualInformation.openGraphTitle;
    }

    if (actualInformation.openGraphDescription) {
        result.openGraph.description = actualInformation.openGraphDescription;
    }

    if (actualInformation.shareImageUrl) {
        result.openGraph.image = actualInformation.shareImageUrl;
    }

    if (actualInformation.relapTag) {
        result.openGraph.relapTag = actualInformation.relapTag;
    }

    return result;
};


/**
 * @param {Object<string, string>} data
 * @return {Object}
 */
view.subheader = function(data) {
    let subheader = new Subheader();

    return subheader.render({
        isLogoRedirect: true,
        listLinks: data.listLinks,
        isSearchRedirect: true,
        favoriteEntities: data.favoriteEntities,
        isBottomLine: true
    });
};

module.exports = view;
