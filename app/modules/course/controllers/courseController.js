var async = require('asyncawait/async'),
    await = require('asyncawait/await');

var soy = require('../../../components/soy'),
    services = require('../../../components/services').all,
    courseView = require('../../../../api/modules/course/views/courseView'),
    searchView = require('../../../../api/modules/course/views/searchView');

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

        var courses = await(services.course.list({page: 0}, 10)),
            coursesList = courseView.list(courses, ENTITY_TYPE);

        var data = searchView.render({
            entityType: ENTITY_TYPE,
            user: user,
            authSocialLinks: authSocialLinks,
            countResults: courses[0] && courses[0].countResults || 0,
            coursesList: coursesList,
            searchParams: searchParams
        });

        var html = soy.render(
            'sm.lSmSearch.Template.search', {
                params: {
                    data: data,
                    config: {
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
        logger.error(error);

        res.status(error.code || 500);
        next();
    }
});


exports.information = async(function(req, res, next) {
    try {
        var authSocialLinks = services.auth.getAuthSocialUrl(),
            user = req.user || {};

        var data = {
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
                user: user,
                favorites: []
            },
            user: user,
            authSocialLinks: authSocialLinks
        };

        data.generalOptions = {
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
        };

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
