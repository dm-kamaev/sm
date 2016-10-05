const userView = require('../../user/views/user');
const favoriteView = require('../../favorite/views/favoriteView');


/**
 * @param {{
 *     user: Object,
 *     authSocialLinks: Object,
 *     entityData: Object,
 *     map: Object,
 *     favorites: Object,
 *     actionButtonText: string
 * }} data
 * @return {Object}
 */
exports.render = function(data) {
    var user = userView.default(data.user);

    return {
        seo: {
            metaTitle: 'Кружки и секции'
        },
        subHeader: {
            logo: {
                imgUrl: '/images/n-common/b-sm-subheader/course-logo.svg'
            },
            links: {
                nameL: 'Все курсы, кружки и секции',
                nameM: 'Все курсы',
                url: '/proforientacija'
            },
            search: {
                placeholder: 'Район, метро, название курса',
                redirect: 'true',
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
        actionButtonText: data.actionButtonText
    };
};
