'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const soy = require('../../../components/soy'),
    services = require('../../../components/services').all,
    courseView = require('../../../../api/modules/course/views/courseView'),
    searchView = require('../../../../api/modules/course/views/searchView'),
    informationView = require(
        '../../../../api/modules/course/views/informationView'
    ),
    pageView = require('../../../../api/modules/entity/views/pageView'),
    entityType = require('../../../../api/modules/entity/enums/entityType.js');

const PageNotFoundError = require('../../error/lib/PageNotFoundError');

const logger = require('../../../components/logger/logger').getLogger('app');

const config = require('../../../config').config;

const ANALYTICS_ID = config.courses.analyticsId,
    YANDEX_METRIKA_ID = config.courses.yandexMetrikaId,
    DOMAIN = config.url.protocol + '://' + config.url.host,
    FB_CLIENT_ID = config.facebookClientId;

let controller = {};

controller.home = async(function(req, res, next) {
    res.redirect('/proforientacija');
});

controller.search = async(function(req, res, next) {
    try {
        let authSocialLinks = services.auth.getAuthSocialUrl(),
            user = req.user || {},
            searchParams = searchView.initSearchParams(req.query);

        let data = await({
                favorites: services.favorite.getFavoriteEntities(user.id),
                courses: services.course.list(searchParams, 10),
                mapCourses: services.course.listMap(searchParams, 10),
                mapPosition: services.map.getPositionParams(searchParams),
                filtersData: {
                    type: services.courseType.getAll()
                }
            }),
            aliases = await({
                courses: services.course.getAliases(data.courses),
                map: services.course.getAliases(data.mapCourses)
            });

        let templateData = searchView.render({
            entityType: entityType.COURSE,
            user: user,
            fbClientId: FB_CLIENT_ID,
            favorites: data.favorites,
            authSocialLinks: authSocialLinks,
            countResults: data.courses[0] && data.courses[0].countResults || 0,
            coursesList: data.courses,
            mapCourses: courseView.joinAliases(
                data.mapCourses, aliases.map
            ),
            mapPosition: data.mapPosition,
            searchParams: searchParams,
            filtersData: data.filtersData,
            aliases: aliases.courses
        });

        let html = soy.render(
            'sm.lSearch.Template.search', {
                params: {
                    data: templateData,
                    config: {
                        entityType: entityType.COURSE,
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
        next(error);
    }
});


controller.information = async(function(req, res, next) {
    try {
        let alias = services.urls.stringToURL(req.params.name),
            brandAlias = services.urls.stringToURL(req.params.brandName),
            page = await({
                course: services.page.getByAlias(
                    alias,
                    entityType.COURSE
                ),
                brand: services.page.getByAlias(
                    brandAlias,
                    entityType.COURSE_BRAND
                )
            });
        if (!page.course || !page.brand) {
            throw new PageNotFoundError();
        } else {
            let courseInstance = await(services.urls.getEntityByUrl(
                alias, entityType.COURSE
            ));
            if (!courseInstance || courseInstance.brandId != page.brand.id) {
                throw new PageNotFoundError();
            } else {
                let authSocialLinks = services.auth.getAuthSocialUrl(),
                    user = req.user || {};

                let data = await({
                    favorites: services.favorite.getFavoriteEntities(user.id),
                    course: services.course.information(courseInstance.id)
                });

                let templateData = informationView.render({
                    user: user,
                    fbClientId: FB_CLIENT_ID,
                    authSocialLinks: authSocialLinks,
                    entityData: courseView.page(data.course),
                    map: courseView.pageMap(data.course),
                    favorites: data.favorites,
                    actionButtonText: 'Хочу этот курс!'
                });

                let html = soy.render(
                    'sm.lCourse.Template.course', {
                        params: {
                            data: templateData,
                            config: {
                                entityType: entityType.COURSE,
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
            }
        }
    } catch (error) {
        logger.error(error);

        res.status(error.code || 500);
        next(error);
    }
});

module.exports = controller;
