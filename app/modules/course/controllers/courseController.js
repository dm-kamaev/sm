var async = require('asyncawait/async'),
    await = require('asyncawait/await');

var soy = require('../../../components/soy'),
    services = require('../../../components/services').all,
    courseView = require('../../../../api/modules/course/views/courseView'),
    searchView = require('../../../../api/modules/course/views/searchView'),
    addressView = require('../../../../api/modules/geo/views/addressView');

var config = require('../../../config').config;

var logger = require('../../../components/logger/logger').getLogger('app');

const ANALYTICS_ID = config.analyticsId,
    YANDEX_METRIKA_ID = config.yandexMetrikaId,
    DOMAIN = config.url.protocol + '://' + config.url.host,
    FB_CLIENT_ID = config.facebookClientId;

const models = require('../../../components/models').all;

exports.search = async(function(req, res, next) {
    try {
        var authSocialLinks = services.auth.getAuthSocialUrl(),
            user = req.user || {},
            searchParams =
                await(services.schoolSearch.initSearchParams(req.query));

        var courses = await(services.course.list({page: 0}, 10)),
            coursesList = courseView.list(courses);

        /** Temporary map address data */
        var pinAddresses = await(models.Address.findAll({
            limit: 10
        }));
        var pointAddresses = await(models.Address.findAll({
            limit: 10,
            offset: 10
        }));

        var mapData = createMapItems(pinAddresses, pointAddresses);

        /** End temporary address data */

        var data = searchView.render({
            user: user,
            authSocialLinks: authSocialLinks,
            countResults: courses[0] && courses[0].countResults || 0,
            coursesList: coursesList,
            mapData: mapData,
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


/**
 * Creates map items from addresses
 * @param {Array<models.Address>} pinAddresses
 * @param {Array<models.Address>} pointAddresses
 * @return {{
 *     itemGroups: Array<{
 *         viewType: string,
 *         items: Array<Object>
 *     }>,
 *     position: {
 *         center: Array<number>,
 *         type: string
 *     }
 * }}
 */
var createMapItems = function(pinAddresses, pointAddresses) {
    var district = await(models.District.findAll({
        limit: 1
    }));
    return {
        itemGroups: [
            {
                viewType: 'pin',
                items: pinAddresses.map(addressView.mapItem)
            },
            {
                viewType: 'point',
                items: pointAddresses.map(addressView.mapItem)
            }
        ],
        position: {
            center: [district[0].centerCoords[1], district[0].centerCoords[0]],
            type: 'district'
        }
    };
};
