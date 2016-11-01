const userView = require('../../user/views/user');
const favoriteView = require('../../favorite/views/favoriteView');
const seoView = require('../../entity/views/seoView');


/**
 * @param {{
 *     user: Object,
 *     fbClientId: string,
 *     authSocialLinks: Object,
 *     entityData: Object,
 *     map: Object,
 *     favorites: Object,
 *     priceLabelText: string,
 *     actionButtonText: string
 * }} data
 * @return {Object}
 */
exports.render = function(data) {
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
        subHeader: {
            logo: {
                imgUrl: '/static/images/n-common/b-sm-subheader/course-logo.svg'
            },
            links: {
                nameL: 'Все курсы, кружки и секции',
                nameM: 'Все курсы',
                url: '/proforientacija'
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
        entityData: data.entityData,
        map: data.map,
        priceLabelText: data.priceLabelText,
        actionButtonText: data.actionButtonText
    };
};
