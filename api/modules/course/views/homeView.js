/**
 * @fileOverview Frontick view for course home page layout
 */
'use strict';

const userView = require('../../user/views/user'),
    favoriteView = require('../../favorite/views/favoriteView'),
    courseCategoryView = require('../../course/views/courseCategoryView'),
    footerView = require('../../entity/views/footerView');

const Subheader = require('../lib/CourseSubheader'),
    Header = require('../../entity/lib/Header');

const PAGE_ALIAS = 'search';

let view = {};


/**
 * @param {{
 *     header: Object,
 *     user: Object,
 *     authSocialLinks: Object,
 *     favorites: Object,
 *     categories: Array<Object>,
 *     categoryAliases: Array<Object>,
 *     entityType: string
 * }} data
 * @return {Object}
 */
view.render = function(data) {
    let user = userView.default(data.user);
    return {
        seo: {
            metaTitle: 'Курсы мела',
            metaDescription: ''
        },
        user: user,
        authSocialLinks: data.authSocialLinks,
        header: data.header,
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
        recommendations: view.recommendations(data.recommendations),
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
        contacts: Header.CONTACTS,
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
    let searchUrl = '/school?name=';

    let links = [{
        'content': 'Английский язык',
        'url': encodeURIComponent(`${searchUrl}Английский язык`)
    }, {
        'content': 'ЦАО',
        'url': encodeURIComponent(`${searchUrl}ЦАО`)
    }, {
        'content': 'Кутузовская',
        'url': encodeURIComponent(`${searchUrl}Кутузовская`)
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
            url: '/search'
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
    let object = {};
    let result = [];

    data.forEach(function(item) {
        if (object[item.type]) {
            object[item.type].items.push({
                id: item.id,
                content: item.name,
                url: item.url
            });
        } else {
            object[item.type] = {
                type: item.type,
                index: view.getRecommendationIndex(item.type),
                header: view.getRecommendationData(item.type),
                items: []
            };
            object[item.type].items.push({
                id: item.id,
                content: item.name,
                url: item.url
            });
        }
    });

    for (var key in object) {
        result[object[key].index] = object[key];
    }

    return result;
};


/**
 * Get data on type
 * @param {string} type
 * @return {Object}
 */
view.getRecommendationData = function(type) {
    var result = {};
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


/**
 * Get index of recommendation in array
 * @param {string} type
 * @return {number}
 */
view.getRecommendationIndex = function(type) {
    var index;
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


module.exports = view;
