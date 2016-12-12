'use strict';

const userView = require('../../user/views/user');
const favoriteView = require('../../favorite/views/favoriteView');

const CourseSubheader = require('../../course/lib/CourseSubheader'),
    SchoolSubheader = require('../../school/lib/SchoolSubheader'),
    Header = require('../../entity/lib/Header');

const entityTypeEnum = require('../../entity/enums/entityType');

let view = {};


/**
 * @param {{
 *     user: Object,
 *     entityType: string,
 *     authSocialLinks: Object,
 *     favorites: Object,
 *     errorText: string
 * }} data
 * @return {Object}
 */
view.render = function(data) {
    let user = userView.default(data.user);

    return {
        seo: {
            metaTitle: '404: Страница не найдена'
        },
        subHeader: view.subheader({
            favoriteEntities: favoriteView.list(data.favorites),
            user: user,
            entityType: data.entityType
        }),
        header: data.header,
        user: user,
        authSocialLinks: data.authSocialLinks,
        error: {
            text: data.errorText || 'Страница, которую вы искали, не найдена'
        }
    };
};

/**
 * @param {Object<string, string>} data
 * @return {Object}
 */
view.subheader = function(data) {
    let Subheader = {
        [entityTypeEnum.COURSE]: CourseSubheader,
        [entityTypeEnum.SCHOOL]: SchoolSubheader
    };

    let subheader = new Subheader[data.entityType]();

    subheader.init({
        isLogoRedirect: true,
        contacts: Header.CONTACTS,
        isSearchRedirect: true,
        user: data.user,
        favoriteEntities: data.favoriteEntities,
        isBottomLine: true
    });
    return subheader.getParams();
};


module.exports = view;
