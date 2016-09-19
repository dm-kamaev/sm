var async = require('asyncawait/async'),
    await = require('asyncawait/await');

var soy = require('../../../components/soy'),
    services = require('../../../components/services').all;

var courseView = require('../../../../api/modules/course/views/courseView'),
    searchView = require('../../../../api/modules/course/views/searchView'),
    informationView = require(
        '../../../../api/modules/course/views/informationView'
    );

var config = require('../../../config').config;

var logger = require('../../../components/logger/logger').getLogger('app');

const ANALYTICS_ID = config.analyticsId,
    YANDEX_METRIKA_ID = config.yandexMetrikaId,
    DOMAIN = config.url.protocol + '://' + config.url.host,
    FB_CLIENT_ID = config.facebookClientId;

const ENTITY_TYPE = 'course';


exports.search = async(function(req, res, next) {
    try {
        var authSocialLinks = services.auth.getAuthSocialUrl(),
            user = req.user || {},
            searchParams =
                await(services.schoolSearch.initSearchParams(req.query));

        var courses = await(services.course.list({page: 0}, 10));
        var mapCourses = await(services.course.listMap({page: 0}, 10));

        var data = searchView.render({
            entityType: ENTITY_TYPE,
            user: user,
            authSocialLinks: authSocialLinks,
            countResults: courses[0] && courses[0].countResults || 0,
            coursesList: courses,
            mapCourses: mapCourses,
            searchParams: searchParams
        });


        var html = soy.render(
            'sm.lSearch.Template.search', {
                params: {
                    data: data,
                    config: {
                        entityType: ENTITY_TYPE,
                        modifier: 'stendhal',
                        staticVersion: config.lastBuildTimestamp,
                        year: new Date().getFullYear(),
                        analyticsId: ANALYTICS_ID,
                        yandexMetrikaId: YANDEX_METRIKA_ID,
                        csrf: req.csrfToken(),
                        domain: DOMAIN,
                        fbClientId: FB_CLIENT_ID,
                        type: 'course'
                    }
                }
            }
        );

        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
    } catch (error) {
        logger.error(error);

        res.status(error.code || 500);
        next();
    }
});


exports.information = async(function(req, res, next) {
    try {
        var authSocialLinks = services.auth.getAuthSocialUrl(),
            user = req.user || {};

        var entityData = {
            id: 12,
            name: 'Система «Выбор»',
            description: 'Месячный курс, направленный на выработку навыка осознанного выбора',
            fullDescription: {
                cutText: ['Программа, которая поможет подростку ' +
                        'задавать себе правильные вопросы и принимать ' +
                        'осознанные решения']
            },
            score: {
                marks: {
                    primary: {
                        value: 4.5
                    },
                    secondary: [{
                        name: 'Средняя оценка',
                        value: 4.2
                    }, {
                        name: 'Образование',
                        value: 4
                    }, {
                        name: 'Преподаватели',
                        value: 4.8
                    }, {
                        name: 'Атмосфера',
                        value: 4.9
                    }, {
                        name: 'Инфраструктура',
                        value: 3.3
                    }]
                },
                secondaryMarkListHeader: 'Оценки, поставленные пользователями'
            },
            cost: '39 520 руб. / курс',
            generalOptions: {
                items: [{
                    name: 'Культурный центр ЗИЛ',
                    score: 4.9,
                    description: 'Одна из крупнейших сетей курсов английского языка в Москве'
                }, {
                    name: 'Возраст',
                    description: 'от 7 лет'
                }, {
                    name: 'Расписание',
                    description: 'Два раза в неделю, чт в 16:00 и сб в 11:00'
                }, {
                    name: 'Возраст',
                    description: '13-17 лет'
                }, {
                    name: 'Группы',
                    description: 'Не более 10 человек в группе'
                }, {
                    name: 'Начало занятий',
                    description: 'В сентябре 2016'
                }]
            },
            online: 'available'
        };

        var map = {
            itemGroups: [{
                viewType: 'pin',
                items: [{
                    addressId: 12,
                    coordinates: [55.783946, 37.602038],
                    title: {
                        text: 'School №234',
                        alias: '/'
                    },
                    description: 'Best school',
                    items: [{
                        content: 'School',
                        url: '/'
                    }],
                    score: 5.5
                },
                {
                    addressId: 12,
                    coordinates: [55.78, 37.63],
                    title: {
                        text: 'School №345',
                        alias: '/'
                    },
                    description: 'Best school',
                    items: [{
                        content: 'School2',
                        url: '/'
                    }],
                    score: 3
                }]
            }]
        };

        var favorites = {
            entities: [{
                id: 12,
                type: ENTITY_TYPE,
                name: {
                    light: 'School',
                    bold: '#12'
                },
                alias: '',
                score: {
                    marks: {
                        primary: {
                            value: 12
                        }
                    }
                },
                metro: [{
                    id: 3,
                    name: 'Павелецкая'
                }]
            },
            {
                id: 12,
                type: ENTITY_TYPE,
                name: {
                    light: 'School',
                    bold: '#12'
                },
                alias: '',
                score: {
                    marks: {
                        primary: {
                            value: 12
                        }
                    }
                },
                metro: [{
                    id: 3,
                    name: 'Павелецкая'
                }]
            },
            {
                id: 12,
                type: ENTITY_TYPE,
                name: {
                    light: 'School',
                    bold: '#12'
                },
                alias: '',
                score: {
                    marks: {
                        primary: {
                            value: 12
                        }
                    }
                },
                metro: [{
                    id: 3,
                    name: 'Павелецкая'
                }]
            },
            {
                id: 12,
                type: ENTITY_TYPE,
                name: {
                    light: 'School',
                    bold: '#12'
                },
                alias: '',
                score: {
                    marks: {
                        primary: {
                            value: 12
                        }
                    }
                },
                metro: [{
                    id: 3,
                    name: 'Павелецкая'
                }]
            },
            {
                id: 12,
                type: ENTITY_TYPE,
                name: {
                    light: 'School',
                    bold: '#12'
                },
                alias: '',
                score: {
                    marks: {
                        primary: {
                            value: 12
                        }
                    }
                },
                metro: [{
                    id: 3,
                    name: 'Павелецкая'
                }]
            },
            {
                id: 12,
                type: ENTITY_TYPE,
                name: {
                    light: 'School',
                    bold: '#12'
                },
                alias: '',
                score: {
                    marks: {
                        primary: {
                            value: 12
                        }
                    }
                },
                metro: [{
                    id: 3,
                    name: 'Павелецкая'
                }]
            }]
        };

        var data = informationView.render({
            user: user,
            authSocialLinks: authSocialLinks,
            entityData: entityData,
            map: map,
            favorites: favorites,
            actionButtonText: 'Хочу этот курс!'
        });

        var html = soy.render(
            'sm.lCourse.Template.course', {
                params: {
                    data: data,
                    config: {
                        entityType: ENTITY_TYPE,
                        modifier: 'stendhal',
                        staticVersion: config.lastBuildTimestamp,
                        year: new Date().getFullYear(),
                        analyticsId: ANALYTICS_ID,
                        yandexMetrikaId: YANDEX_METRIKA_ID,
                        csrf: req.csrfToken(),
                        domain: DOMAIN,
                        fbClientId: FB_CLIENT_ID
                    }
                }
            }
        );

        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
    } catch (error) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', error);
        logger.error(error);

        res.status(error.code || 500);
        next();
    }
});
