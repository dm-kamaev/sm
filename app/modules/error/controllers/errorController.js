'use strict';

const soy = require.main.require('./app/components/soy');
const services = require('../../../../app/components/services').all;
const schoolView = require('../../../../api/modules/school/views/schoolView');
const headerView = require('../../../../api/modules/entity/views/haderView');
const userView = require('../../../../api/modules/user/views/user');
const seoView = require('../../../../api/modules/school/views/seoView');

const entityTypeEnum =
    require('../../../../api/modules/entity/enums/entityType');
const errorView = require('../../../../api/modules/error/views/errorView');

const logger = require('../../../components/logger/logger').getLogger('app');

const config = require('../../../config').config;
const analyticsId = config.schools.analyticsId;
const yandexMetrikaId = config.schools.yandexMetrikaId;

const MODIFIER = 'stendhal',
    FB_CLIENT_ID = config.facebookClientId,
    CARROTQUEST_ID = config.carrotquestId;

var async = require('asyncawait/async');
var await = require('asyncawait/await');

let controller = {};

controller.schoolNotFound = async(function(req, res) {
    var user = req.user || {};

    var favorites = await(services.favorite.getByUserId(user.id)),
        favoriteIds = services.favorite.getEntityIdsFiltredByType(
            favorites,
            entityTypeEnum.SCHOOL
        );

    var dataPromises = {
        popularSchools: services.school.getRandomPopularSchools(5),
        amountSchools: services.school.getSchoolsCount(),
        authSocialLinks: services.auth.getAuthSocialUrl(),
        favorites: {
            items: services.school.getByIdsWithGeoData(favoriteIds),
            itemUrls: services.page.getAliases(
                favoriteIds,
                entityTypeEnum.SCHOOL
            )
        },
        seoLinks: services.seoSchoolList.getByTypes()
    };

    var data = await(dataPromises);

    let errorText;

    if (/(\/error)$/.test(req.path)) {
        res.status(500);
        errorText = 'Что-то пошло не так';
    } else {
        res.status(404);
    }

    var popularAliases = await(services.page.getAliases(
        data.popularSchools.map(school => school.id),
        entityTypeEnum.SCHOOL
    ));
    data.popularSchools = schoolView.joinAliases(
        data.popularSchools,
        popularAliases
    );

    var html = soy.render('sm.lErrorSchoolNotFound.Template.base', {
        params: {
            data: {
                authSocialLinks: data.authSocialLinks,
                user: userView.default(user),
                favorites: {
                    schools: schoolView.listCompact(data.favorites)
                },
                seoLinks: seoView.linksList(data.seoLinks)
            },
            errorText: errorText || 'Страница, которую вы искали, не найдена',
            popularSchools: schoolView.popular(data.popularSchools),
            dataLinks: schoolView.dataLinks(),
            amountSchools: data.amountSchools,
            config: {
                staticVersion: config.lastBuildTimestamp,
                year: new Date().getFullYear(),
                analyticsId: analyticsId,
                yandexMetrikaId: yandexMetrikaId,
                carrotquestId: CARROTQUEST_ID,
                csrf: req.csrfToken()
            }
        }
    });
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
});


controller.generalError = async(function(
    req, res, next, entityType, subdomain
) {
    let html;
    try {
        let authSocialLinks = services.auth.getAuthSocialUrl(),
            user = req.user || {};

        let data = await({
            favorites: services.favorite.getFavoriteEntities(user.id)
        });

        let errorText;

        if (/(\/error)$/.test(req.path)) {
            res.status(500);
            errorText = 'Что-то пошло не так';
        } else {
            res.status(404);
        }

        let templateData = errorView.render({
            entityType: entityType,
            user: user,
            favorites: data.favorites,
            authSocialLinks: authSocialLinks,
            header: headerView.render(config, entityType),
            errorText: errorText
        });

        html = soy.render('sm.lErrorNotFound.Template.errorNotFound', {
            params: {
                data: templateData,
                config: {
                    staticVersion: config.lastBuildTimestamp,
                    entityType: entityType,
                    modifier: MODIFIER,
                    year: new Date().getFullYear(),
                    analyticsId: config[subdomain].analyticsId,
                    yandexMetrikaId: config[subdomain].yandexMetrikaId,
                    carrotquestId: CARROTQUEST_ID,
                    csrf: req.csrfToken(),
                    fbClientId: FB_CLIENT_ID,
                    domain: config[subdomain].host
                }
            }
        });
    } catch (error) {
        logger.error(error);

        res.status(error.code || 500);
        next(error);
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
    }
});

module.exports = controller;
