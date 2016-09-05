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
