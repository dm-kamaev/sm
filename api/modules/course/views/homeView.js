'use strict';

const userView = require('../../user/views/user'),
    favoriteView = require('../../favorite/views/favoriteView'),
    courseCategoryView = require('../../course/views/courseCategoryView');

const Subheader = require('../lib/CourseSubheader');

const PAGE_ALIAS = 'search';

let view = {};


/**
 * @param {{
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
        subHeader: view.subheader({
            contacts: '',
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
        searchPanel: view.searchPanel()
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
        contacts: data.contacts,
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


module.exports = view;
