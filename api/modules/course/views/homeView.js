/**
 * @fileOverview Frontick view for course home page layout
 */
'use strict';

const lodash = require('lodash');

const userView = require('../../user/views/user').userView,
    favoriteView = require('../../favorite/views/favoriteView'),
    courseCategoryView = require('../../course/views/courseCategoryView'),
    footerView = require('../../entity/views/footerView'),
    headerView = require('../../entity/views/headerView'),
    sideMenuView = require('../../../../app/modules/common/views/sideMenuView');

const Subheader = require('../lib/CourseSubheader');

const PAGE_ALIAS = 'search';

let view = {};


/**
 * @param {{
 *     config: Object,
 *     header: Object,
 *     user: Object,
 *     authSocialLinks: Object,
 *     favorites: Object,
 *     categories: Array<Object>,
 *     categoryAliases: Array<Object>,
 *     recommendations: Array<Object>,
 *     entityType: string
 * }} data
 * @return {Object}
 */
view.render = function(data) {
    let user = userView.renderDefault(data.user);
    return {
        seo: {
            metaTitle: 'Курсы мела',
            metaDescription: ''
        },
        openGraph: {
            title: 'Курсы «Мела»',
            description: 'Поиск, подбор и бронирование курсов и кружков ' +
                'для вашего ребёнка',
            image: '/static/images/n-clobl/i-layout/cources_sharing.png',
            relapTag: 'курсы мела',
            relapImage: '/static/images/n-clobl/i-layout/cources_sharing.png',
            fbClientId: data.fbClientId
        },
        user: user,
        authSocialLinks: data.authSocialLinks,
        header: headerView.render(data.config, data.entityType),
        sideMenu: sideMenuView.render(data.config, data.entityType),
        subHeader: view.subheader({
            listLinks: courseCategoryView.listLinks(
                data.categories,
                data.categoryAliases
            ),
            favoriteEntities: favoriteView.list(data.favorites),
            user: user
        }),
        image: {
            imageUrl: '/static/images/n-common/l-home/images/main-courses.svg',
            title: 'Найдите в Москве лучший&nbsp;кружок или секцию ' +
                'для вашего ребёнка',
            items: [
                'Ищите развивающие кружки и&nbsp;курсы рядом с&nbsp;домом ' +
                'и&nbsp;онлайн с&nbsp;удобным для&nbsp;вас расписанием',
                'Не платите лишнего: мы гарантируем лучшую цену',
                'Не можете выбрать? Позвоните или&nbsp;напишите экспертам ' +
                '«Курсов Мела»'
            ]
        },
        searchPanel: view.searchPanel(),
        recommendations: {
            list: view.recommendations(data.recommendations)
        },
        footer: footerView.render()
    };
};


/**
 * @param {Object<string, string>} data
 * @return {Object}
 */
view.subheader = function(data) {
    let subheader = new Subheader();

    subheader.init({
        isLogoRedirect: false,
        listLinks: data.listLinks,
        isSearchRedirect: true,
        user: data.user,
        favoriteEntities: data.favoriteEntities,
        bottomLine: false
    });

    return subheader.getParams();
};



/**
 * @return {Object}
 */
view.searchPanel = function() {
    let searchUrl = `/${PAGE_ALIAS}?name=`;

    let links = [{
        'content': 'Английский язык',
        'url': '/anglijskij-jazyk'
    }, {
        'content': 'ЦАО',
        'url': searchUrl + encodeURIComponent('ЦАО')
    }, {
        'content': 'Кутузовская',
        'url': searchUrl + encodeURIComponent('Кутузовская')
    }];

    return {
        title: 'Что вы ищете?',
        search: {
            placeholder: 'Район, метро, название курса',
            pageAlias: PAGE_ALIAS
        },
        links: links,
        button: {
            textL: 'Найти кружок или секцию',
            textS: 'Найти'
        },
        searchLink: {
            content: 'Расширенный поиск',
            url: `/${PAGE_ALIAS}`
        }
    };
};


/**
 * Separate array to array objects on type
 * @param {Array<{
 *     id: number,
 *     name: string,
 *     url: string,
 *     type: string
 * }>} data
 *
 * @return {Array<{
 *     type: string,
 *     header: {
 *         label: string,
 *         img: {
 *             url: string,
 *             altText: string
 *         }
 *     },
 *     items: Array<{
 *         id: number,
 *         content: string,
 *         url: string
 *     }>
 * }>}
 */
view.recommendations = function(data) {
    let types = lodash.uniqBy(data, item => item.type)
        .map(item => item.type);

    types = view.setTypesPriority(types);

    return types.map(type => ({
        type: type,
        header: view.getTypeHeader(type),
        list: {
            items: view.getTypeItems(data, type),
            itemType: 'smLink',
            itemConfig: {
                size: 'xxl',
                theme: 'interval'
            }
        }
    }));
};


/**
 * Get items on type
 * @param {Array<Object>} items
 * @param {string} type
 * @return {Array<Object>}
 */
view.getTypeItems = function(items, type) {
    return lodash.remove(items, item => item.type == type)
        .map(item => ({
            id: item.id,
            content: item.name,
            url: item.url
        }));
};


/**
 * Set priority of type as index in array
 * @param {Array<Object>} types
 * @return {Array<Object>}
 */
view.setTypesPriority = function(types) {
    let result = [];

    types.forEach(type => {
        let index = view.getTypeIndex(type);
        result[index] = type;
    });

    return lodash.compact(result);
};


/**
 * Get index of type in array
 * Using for render priority on page
 * @param {string} type
 * @return {number}
 */
view.getTypeIndex = function(type) {
    let index;
    switch (type) {
    case 'juniorSchool':
        index = 0;
        break;
    case 'middleSchool':
        index = 1;
        break;
    case 'highSchool':
        index = 2;
        break;
    }
    return index;
};


/**
 * Get data on type
 * @param {string} type
 * @return {Object}
 */
view.getTypeHeader = function(type) {
    let result = {};
    switch (type) {
    case 'juniorSchool':
        result = {
            label: 'Для дошкольников и&nbsp;младших классов',
            img: {
                url: '/static/images/n-common/b-sm-catalog/' +
                    'junior-school-logo.png',
                altText: 'Младшая школа',
            }
        };
        break;
    case 'middleSchool':
        result = {
            label: 'Для средней школы',
            img: {
                url: '/static/images/n-common/b-sm-catalog/' +
                    'middle-school-logo.png',
                altText: 'Средняя школа',
            }
        };
        break;
    case 'highSchool':
        result = {
            label: 'Для старшеклассников',
            img: {
                url: '/static/images/n-common/b-sm-catalog/' +
                    'high-school-logo.png',
                altText: 'Старшая школа',
            }
        };
        break;
    }
    return result;
};

module.exports = view;
