var async = require('asyncawait/async'),
    await = require('asyncawait/await');

var soy = require('../../../components/soy'),
    services = require('../../../components/services').all,
    courseView = require('../../../../api/modules/course/views/courseView'),
    searchView = require('../../../../api/modules/course/views/searchView');

const entityType =
    require('../../../../api/modules/entity/enums/entityType.js');

var config = require('../../../config').config;

var logger = require('../../../components/logger/logger').getLogger('app');

const ANALYTICS_ID = config.analyticsId,
    YANDEX_METRIKA_ID = config.yandexMetrikaId,
    DOMAIN = config.url.protocol + '://' + config.url.host,
    FB_CLIENT_ID = config.facebookClientId;


exports.search = async(function(req, res, next) {
    try {
        var authSocialLinks = services.auth.getAuthSocialUrl(),
            user = req.user || {},
            searchParams = searchView.initSearchParams(req.query);
        searchParams.page = 0;

        var data = await({
            courses: services.course.list(searchParams, 10),
            mapCourses: services.course.listMap(searchParams, 10),
            filtersData: {
                type: services.courseType.getAll()
            }
        });

        var templateData = searchView.render({
            entityType: entityType.COURSE,
            user: user,
            authSocialLinks: authSocialLinks,
            countResults: data.courses[0] && data.courses[0].countResults || 0,
            coursesList: data.courses,
            mapCourses: data.mapCourses,
            searchParams: searchParams,
            filtersData: data.filtersData
        });

        var html = soy.render(
            'sm.lSearch.Template.search', {
                params: {
                    data: templateData,
                    config: {
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
