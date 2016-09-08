var async = require('asyncawait/async'),
    await = require('asyncawait/await');

var soy = require('../../../components/soy'),
    services = require('../../../components/services').all,
    searchView = require('../../../../api/modules/course/views/searchView');

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
            searchParams =
                await(services.schoolSearch.initSearchParams(req.query));

        var courses = await(services.course.list({page: 0}, 10));
        var mapCourses = await(services.course.listMap({page: 0}, 10));

        var data = searchView.render({
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
