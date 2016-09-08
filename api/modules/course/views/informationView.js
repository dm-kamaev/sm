/**
 * @param {{
 *     user: Object,
 *     authSocialLinks: Object,
 *     entityData: Object,
 *     actionButtonText: string
 * }} data
 * @return {Object}
 */
exports.render = function(data) {
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
            search: {},
            user: data.user,
            favorites: []
        },
        user: data.user,
        authSocialLinks: data.authSocialLinks,
        entityData: data.entityData,
        actionButtonText: data.actionButtonText,
        map: {}
    };
};
