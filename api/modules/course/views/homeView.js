'use strict';

const userView = require('../../user/views/user'),
    favoriteView = require('../../favorite/views/favoriteView'),
    courseCategoryView = require('../../course/views/courseCategoryView');


let view = {};

/**
 * @param {{
 *     user: Object,
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
        subHeader: {
            logo: {
                imgUrl: '/static/images/n-common/b-sm-subheader/course-logo.svg'
            },
            search: {
                placeholder: 'Район, метро, название курса',
                pageAlias: ''
            },
            user: user,
            favorites: {
                items: favoriteView.list(data.favorites)
            },
            listLinks: {
                opener: 'Все курсы',
                content: {
                    items: courseCategoryView.listLinks(
                        data.categories,
                        data.categoryAliases
                    )
                }
            }
        },
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
            pageAlias: ''
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
