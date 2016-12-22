'use strict';

const userView = require('../../user/views/user');
const favoriteView = require('../../favorite/views/favoriteView');
const seoView = require('../../entity/views/seoView');
const courseView = require('./courseView');

const courseCategoryView = require('./courseCategoryView');

const courseImageSize = require('../enums/courseImageSize');

/**
 * @param {{
 *     user: Object,
 *     fbClientId: string,
 *     authSocialLinks: Object,
 *     favorites: Object,
 *     course: Object,
 *     categoryAlias: string,
 *     categories: Array<Object>,
 *     categoryAliases: Array<Object>,
 *     actionButtonText: string
 * }} data
 * @return {Object}
 */
exports.render = function(data) {
    let user = userView.default(data.user),
        entityData = courseView.page(data.course, data.categoryAlias);

    let imageOpenGraph = entityData.imageUrl.replace(
        '{width}',
        courseImageSize.DEFAULT[0]
    );

    return {
        seo: {
            metaTitle: 'Профориентационный курс ' + entityData.name +
                ' в Москве: стоимость обучения, отзывы.',
            metaDescription: seoView.formatSeoDescription(
                entityData.description
            )
        },
        openGraph: {
            title: 'Курс ' + entityData.name + ' на «Курсах Мела»',
            description: entityData.description,
            image: imageOpenGraph,
            relapImage: imageOpenGraph,
            fbClientId: data.fbClientId,
        },
        subHeader: {
            logo: {
                linkUrl: '/',
                altText: '«Курсы Мела»',
                imgUrl: '/static/images/n-common/b-sm-subheader/course-logo.svg'
            },
            listLinks: {
                opener: 'Все курсы',
                content: {
                    items: courseCategoryView.listLinks(
                        data.categories,
                        data.categoryAliases
                    )
                }
            },
            search: {
                placeholder: 'Район, метро, название курса',
                redirect: true,
                pageAlias: 'proforientacija'
            },
            user: user,
            favorites: {
                items: favoriteView.list(data.favorites)
            }
        },
        user: user,
        authSocialLinks: data.authSocialLinks,
        entityData: entityData,
        map: courseView.pageMap(data.course, data.categoryAlias),
        priceLabelText: 'Гарантия лучшей цены',
        actionButtonText: data.actionButtonText ?
            data.actionButtonText :
            'Хочу этот курс!'
    };
};
