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
                filterPanel: {
                    filters: [
                        {
                            data: {
                                "header":{
                                   "title":"Дополнительные занятия",
                                   "tooltip":""
                                },
                                "name":"additionalEducation",
                                "filters":[
                                   {
                                      "label":"Математика",
                                      "value":"math",
                                      "isChecked":false
                                   },
                                   {
                                      "label":"Занимательная математика",
                                      "value":"zanMath",
                                      "isChecked":false
                                   },
                                   {
                                      "label":"Робототехника",
                                      "value":"robo",
                                      "isChecked":false
                                   },
                                   {
                                      "label":"Макраме",
                                      "value":"4",
                                      "isChecked":false
                                   },
                                   {
                                      "label":"Вязание",
                                      "value":"vaz",
                                      "isChecked":false
                                   },
                                   {
                                      "label":"Пение",
                                      "value":"pen",
                                      "isChecked":false
                                   },
                                   {
                                      "label":"Чтение",
                                      "value":"cht",
                                      "isChecked":false
                                   },
                                   {
                                      "label":"Рисование",
                                      "value":"ris",
                                      "isChecked":false
                                   },
                                   {
                                      "label":"История",
                                      "value":"ist",
                                      "isChecked":false
                                   }
                                ]
                            },
                            config: {
                                type: 'extended',
                                isShowed: false
                            }
                        },
                        {
                            data: {
                                "header":{
                                   "title":"Default",
                                   "tooltip":""
                                },
                                "name":"Default",
                                "filters":[
                                   {
                                      "label":"Математика",
                                      "value":"math",
                                      "isChecked":false
                                   },
                                   {
                                      "label":"Занимательная математика",
                                      "value":"zanMath",
                                      "isChecked":false
                                   }
                                ]
                            },
                            config: {
                                isShowed: false
                            }
                        }
                    ]
                },
                entityList: {
                    items: [
                        {
                            id: 5,
                            type: 'course',
                            name: {
                                light: 'Подготовка к ЕГЭ по русскому языку'
                            },
                            brand: 'Центр «Эрудит», 1 год',
                            cost: '1 200',
                            score: {
                                marks: {
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
                                }
                            },
                            metro: [
                                {
                                    id: 9,
                                    name: 'Сокол'
                                },
                                {
                                    id: 7,
                                    name: 'Дмитровская'
                                }
                            ],
                            isFavorite: true
                        },
                        {
                            id: 5,
                            type: 'course',
                            name: {
                                light: 'Полная экспресс-подготовка к ЕГЭ по русскому языку для 11 классов'
                            },
                            description: 'Компания Резольвента предлагает для ' +
                                'подготовки к ЕГЭ по русскому языку в 11 классе учебный курс',
                            brand: 'Центр «Зил»',
                            score: {
                                marks: {
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
                                }
                            },
                            area: [
                                {
                                    id: 3,
                                    name: 'Даниловский'
                                }
                            ],
                            metro: [
                                {
                                    id: 6,
                                    name: 'Юго-западная'
                                },
                                {
                                    id: 3,
                                    name: 'Беляево'
                                }
                            ],
                            online: 'only',
                            isFavorite: true
                        },
                        {
                            id: 5,
                            type: 'course',
                            name: {
                                light: 'Подготовка к ЕГЭ по русскому языку'
                            },
                            description: 'Компания Резольвента предлагает для ' +
                                'подготовки к ЕГЭ по русскому языку в 11 классе учебный курс ' +
                                'ЕГЭ классический включающий подготовку к итоговому ' +
                                'сочинению Приводятся программа курса и стоимость обучения.',
                            cost: 0,
                            score: {
                                marks: {
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
                                }
                            },
                            area: [
                                {
                                    id: 3,
                                    name: 'Покровское-стрешнево'
                                }
                            ],
                            online: 'available',
                            isFavorite: true
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
