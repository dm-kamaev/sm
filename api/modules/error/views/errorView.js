const userView = require('../../user/views/user');
const favoriteView = require('../../favorite/views/favoriteView');


/**
 * @param {{
 *     user: Object,
 *     entityType: string,
 *     authSocialLinks: Object,
 *     favorites: Object
 * }} data
 * @return {Object}
 */
exports.render = function(data) {
    var user = userView.default(data.user);

    return {
        seo: {
            metaTitle: '404: Страница не найдена'
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
        error: {
            text: 'Страница, которую вы искали, не найдена'
        }
    };
};
