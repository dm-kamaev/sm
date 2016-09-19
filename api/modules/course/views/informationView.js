const userView = require('../../user/views/user');


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
                url: '/'
            },
            search: {
                placeholder: 'Район, метро, название курса'
            },
            user: user,
            favorites: data.favorites
        },
        user: user,
        authSocialLinks: data.authSocialLinks,
        entityData: data.entityData,
        map: data.map,
        actionButtonText: data.actionButtonText
    };
};
