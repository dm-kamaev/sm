const services = require('../../../components/services').all;

const async = require('asyncawait/async');
const await = require('asyncawait/await');

const soy = require('../../../components/soy');

const config = require('../../../config').config;
const ANALYTICS_ID = config.analyticsId;
const YANDEX_METRIKA_ID = config.yandexMetrikaId;
const DOMAIN = config.url.protocol + '://' + config.url.host;
const FB_CLIENT_ID = config.facebookClientId;

exports.search = async(function(req, res, next) {
    try {
        var searchParams =
            await(services.search.initSearchParams(req.query));
        var authSocialLinks = await(services.auth.getAuthSocialUrl());

        var params = {
            data: {
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
                    user: null,
                    favorites: []
                },
                user: null,
                authSocialLinks: authSocialLinks,
                map: {
                    schools: []
                },
                search: {
                    countResults: 100,
                    searchText: 'Супер курс'
                },
                sort: {
                    listItems: [
                        {
                            'label': 'Средняя оценка',
                            'text': 'средней оценке'
                        },
                        {
                            'label': 'Качество',
                            'text': 'качеству'
                        },
                        {
                            'label': 'Стоимость',
                            'text': 'стоимости'
                        }
                    ],
                    staticText: 'Сортировать по ',
                    defaultOpenerText: 'стоимости'
                },
                entityList: {
                    items: [
                        {
                            id: 5,
                            name: {
                                light: 'Подготовка к ЕГЭ по русскому языку'
                            },
                            score: {
                                primary: {
                                    name: 'Средняя оценка',
                                    value: 4.5
                                },
                                secondary: [
                                    {
                                        name: 'Стоимость',
                                        value: 4.7
                                    },
                                    {
                                        name: 'Качество',
                                        value: 3
                                    }
                                ]
                            },
                            area: [
                                'Даниловский'
                            ],
                            metro: [
                                'Юго-западная',
                                'Беляево'
                            ],
                            isFavorite: true,
                            countDepartment: 10
                        },
                        {
                            id: 5,
                            name: {
                                light: 'Подготовка к ЕГЭ по русскому языку'
                            },
                            score: {
                                primary: {
                                    name: 'Средняя оценка',
                                    value: 4.5
                                },
                                secondary: [
                                    {
                                        name: 'Стоимость',
                                        value: 4.7
                                    },
                                    {
                                        name: 'Качество',
                                        value: 3
                                    }
                                ]
                            },
                            area: [
                                'Даниловский'
                            ],
                            metro: [
                                'Юго-западная',
                                'Беляево'
                            ],
                            isFavorite: true,
                            countDepartment: 10
                        },
                        {
                            id: 5,
                            name: {
                                light: 'Подготовка к ЕГЭ по русскому языку'
                            },
                            score: {
                                primary: {
                                    name: 'Средняя оценка',
                                    value: 4.5
                                },
                                secondary: [
                                    {
                                        name: 'Стоимость',
                                        value: 4.7
                                    },
                                    {
                                        name: 'Качество',
                                        value: 3
                                    }
                                ]
                            },
                            area: [
                                'Даниловский'
                            ],
                            metro: [
                                'Юго-западная',
                                'Беляево'
                            ],
                            isFavorite: true,
                            countDepartment: 10
                        }
                    ],
                    itemType: 'smItemEntity'
                },
                searchSettings: {
                    url: 'api/course/search',
                    method: 'GET',
                    searchParams: searchParams
                }
            },
            config: {
                landingScript: 'l-sm-search.js',
                modifier: 'stendhal',
                staticVersion: config.lastBuildTimestamp,
                year: new Date().getFullYear(),
                analyticsId: ANALYTICS_ID,
                yandexMetrikaId: YANDEX_METRIKA_ID,
                csrf: req.csrfToken(),
                domain: DOMAIN,
                fbClientId: FB_CLIENT_ID
            }
        };
        var html = soy.render(
            'sm.lSmSearch.Template.search',
            {
                params: params
            }
        );

        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
    } catch (error) {
        console.log(error);

        res.status(error.code || 500);
        next();
    }
});
