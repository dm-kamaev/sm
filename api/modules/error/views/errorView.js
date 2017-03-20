'use strict';

const userView = require('../../user/views/user').userView;
const favoriteView = require('../../favorite/views/favoriteView');
const footerView = require('../../entity/views/footerView'),
    headerView = require('../../entity/views/headerView'),
    sideMenuView = require('../../../../app/modules/common/views/sideMenuView');

const popularView = require('../../../../app/modules/common/views/popularView');

const CourseSubheader = require('../../course/lib/CourseSubheader'),
    SchoolSubheader = require('../../school/lib/SchoolSubheader');

const entityTypeEnum = require('../../entity/enums/entityType');

let view = {};


/**
 * @param {{
 *     config: Object,
 *     user: Object,
 *     entityType: string,
 *     authSocialLinks: Object,
 *     favorites: Object,
 *     popularEntities: Array<(models.School|models.Course)>,
 *     numberEntities: number,
 *     aliasesPopular: Array<models.Page>,
 *     errorText: string
 * }} data
 * @return {Object}
 */
view.render = function(data) {
    let user = userView.renderDefault(data.user);

    return {
        seo: {
            metaTitle: '404: Страница не найдена'
        },
        subHeader: view.subheader({
            favoriteEntities: favoriteView.list(data.favorites),
            user: user,
            entityType: data.entityType
        }),
        header: headerView.render(data.config, data.entityType, user),
        sideMenu: sideMenuView.render(data.config, data.entityType),
        user: user,
        authSocialLinks: data.authSocialLinks,
        error: {
            text: data.errorText ||
                'Страница, которую вы искали, не&nbsp;найдена'
        },
        popular: data.popularEntities ?
            popularView.render({
                entities: data.popularEntities,
                aliases: data.aliasesPopular,
                entityType: data.entityType,
                numberEntities: data.numberEntities
            }) :
            null,
        footer: footerView.render()
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

    return subheader.render({
        isLogoRedirect: true,
        isSearchRedirect: true,
        user: data.user,
        favoriteEntities: data.favoriteEntities,
        isBottomLine: true
    });
};


module.exports = view;
