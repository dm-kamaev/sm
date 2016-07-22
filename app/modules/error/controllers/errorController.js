var soy = require.main.require('./app/components/soy');
var services = require('../../../../app/components/services').all;
const schoolView = require('../../../../api/modules/school/views/schoolView');
const userView = require('../../../../api/modules/user/views/user');
const entityType = require('../../../../api/modules/entity/enums/entityType');

const config = require('../../../config').config;
const analyticsId = config.analyticsId;
const yandexMetrikaId = config.yandexMetrikaId;

var async = require('asyncawait/async');
var await = require('asyncawait/await');

exports.notFound = async(function(req, res) {
    var user = req.user || {};

    var favoriteIds = await(services.favorite.getAllItemIdsByUserId(user.id)),
        dataPromises = {
            popularSchools: services.school.getRandomPopularSchools(5),
            amountSchools: services.school.getSchoolsCount(),
            authSocialLinks: services.auth.getAuthSocialUrl(),
            favorites: {
                items: services.school.getByIdsWithGeoData(favoriteIds),
                itemUrls: services.page.getAliases(
                    favoriteIds,
                    entityType.SCHOOL
                )
            }
        },
        data = await(dataPromises);

    var popularAliases = await(services.page.getAliases(
        data.popularSchools.map(school => school.id),
        entityType.SCHOOL
    ));
    data.popularSchools = schoolView.joinAliases(
        data.popularSchools,
        popularAliases
    );

    var html = soy.render('sm.lErrorNotFound.Template.base', {
        params: {
            data: {
                authSocialLinks: data.authSocialLinks,
                user: userView.default(user),
                favorites: {
                    schools: schoolView.listCompact(data.favorites)
                }
            },
            errorText: 'Страница, которую вы искали, не найдена',
            popularSchools: schoolView.popular(data.popularSchools),
            dataLinks: schoolView.dataLinks(),
            amountSchools: data.amountSchools,
            config: {
                staticVersion: config.lastBuildTimestamp,
                year: new Date().getFullYear(),
                analyticsId: analyticsId,
                yandexMetrikaId: yandexMetrikaId,
                csrf: req.csrfToken()
            }
        }
    });

    res.end(html);
});
