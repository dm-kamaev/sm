'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const soy = require('../../../components/soy'),
    services = require('../../../components/services').all,
    contentExperiment =
        require('../../../components/contentExperiment/contentExperiment'),
    courseView = require('../../../../api/modules/course/views/courseView'),
    searchView = require('../../../../api/modules/course/views/searchView'),
    homeView = require('../../../../api/modules/course/views/homeView'),
    informationView = require(
        '../../../../api/modules/course/views/informationView'
    ),
    headerView = require('../../../../api/modules/entity/views/haderView'),
    entityType = require('../../../../api/modules/entity/enums/entityType');

const filterName = require('../../../../api/modules/course/enums/filterName');

const logger = require('../../../components/logger/logger').getLogger('app');

const config = require('../../../config').config;

const ANALYTICS_ID = config.courses.analyticsId,
    YANDEX_METRIKA_ID = config.courses.yandexMetrikaId,
    DOMAIN = config.courses.host,
    FB_CLIENT_ID = config.facebookClientId,
    CARROTQUEST_ID = config.carrotquestId,
    EXPERIMENT_ID = config.courses.experimentId;

let controller = {};

controller.home = async(function(req, res, next) {
    try {
        let authSocialLinks = services.auth.getAuthSocialUrl(),
            user = req.user || {};
        let factory = contentExperiment.getFactoryByQuery(req.query);


        let data = await({
            favorites: services.favorite.getFavoriteEntities(user.id),
            categories: services.courseCategory.getAll({isActive: true}),
            categoryAliases: services.courseCategory.getAliases()
        });

        let templateData = homeView.render({
            entityType: entityType.COURSE,
            user: user,
            fbClientId: FB_CLIENT_ID,
            favorites: data.favorites,
            authSocialLinks: authSocialLinks,
            categories: data.categories,
            categoryAliases: data.categoryAliases,
            header: headerView.render(config, entityType.COURSE)
        });

        let html = soy.render(
            'sm.lHome.Template.home', {
                params: {
                    data: templateData,
                    config: {
                        entityType: entityType.COURSE,
                        page: 'home',
                        modifier: factory,
                        staticVersion: config.lastBuildTimestamp,
                        year: new Date().getFullYear(),
                        analyticsId: ANALYTICS_ID,
                        experimentId: EXPERIMENT_ID,
                        yandexMetrikaId: YANDEX_METRIKA_ID,
                        carrotquestId: CARROTQUEST_ID,
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
        next(error);
    }
});

controller.search = async(function(req, res, next) {
    try {
        let categoryName = req.params.categoryName,
            categoryInstance = await(
                services.courseCategory.getByAlias(categoryName)
            );
        if (!categoryInstance) {
            return next();
        } else {
            let authSocialLinks = services.auth.getAuthSocialUrl(),
                user = req.user || {},
                searchParams = searchView.initSearchParams(
                    req.query, categoryInstance.id
                );

            let factory = contentExperiment.getFactoryByQuery(req.query);
            let data = await({
                    favorites: services.favorite.getFavoriteEntities(user.id),
                    courses: services.course.list(searchParams, 10),
                    mapCourses: services.course.listMap(searchParams, 10),
                    mapPosition: services.map.getPositionParams(searchParams),
                    filtersData: {
                        [filterName.TYPE]: services.courseType.getAll()
                    },
                    seoParams: services.seoCourseList.getByCategoryId(
                        categoryInstance.id
                    ),
                    categories: services.courseCategory.getAll({isActive: true})
                }),
                aliases = await({
                    courses: services.course.getAliases(data.courses),
                    map: services.course.getAliases(data.mapCourses),
                    categories: services.courseCategory.getAliases()
                });

            let templateData = searchView.render({
                entityType: entityType.COURSE,
                user: user,
                fbClientId: FB_CLIENT_ID,
                favorites: data.favorites,
                authSocialLinks: authSocialLinks,
                countResults: data.courses[0] &&
                    data.courses[0].countResults ||
                    0,
                coursesList: data.courses,
                mapCourses: courseView.joinAliases(
                    data.mapCourses, aliases.map
                ),
                mapPosition: data.mapPosition,
                searchParams: searchParams,
                filtersData: data.filtersData,
                enabledFilters: categoryInstance.filters,
                aliases: aliases.courses,
                seoParams: data.seoParams,
                currentCategory: categoryName,
                categories: data.categories,
                categoryAliases: aliases.categories,
                header: headerView.render(config, entityType.COURSE)
            });

            let html = soy.render(
                'sm.lSearch.Template.search', {
                    params: {
                        data: templateData,
                        config: {
                            entityType: entityType.COURSE,
                            page: 'search',
                            modifier: factory,
                            staticVersion: config.lastBuildTimestamp,
                            year: new Date().getFullYear(),
                            analyticsId: ANALYTICS_ID,
                            experimentId: EXPERIMENT_ID,
                            yandexMetrikaId: YANDEX_METRIKA_ID,
                            carrotquestId: CARROTQUEST_ID,
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
            categoryAlias = services.urls.stringToURL(req.params.categoryName),
            page = await({
                course: services.page.getByAlias(
                    alias,
                    entityType.COURSE
                ),
                brand: services.page.getByAlias(
                    brandAlias,
                    entityType.COURSE_BRAND
                ),
                category: services.page.getByAlias(
                    categoryAlias,
                    entityType.COURSE_CATEGORY
                )
            });
        if (!page.course || !page.brand || !page.category) {
            return next();
        } else {
            let courseInstance = await(services.urls.getEntityByUrl(
                    alias, entityType.COURSE
                )),
                course = await(services.course.information(courseInstance.id));
            if (!courseInstance ||
                course.brandId != page.brand.id ||
                course.courseType.categoryId != page.category.id
            ) {
                return next();
            } else {
                let authSocialLinks = services.auth.getAuthSocialUrl(),
                    user = req.user || {};

                let data = await({
                    favorites: services.favorite.getFavoriteEntities(user.id),
                    categories: services.courseCategory.getAll({
                        isActive: true
                    }),
                    categoryAliases: services.courseCategory.getAliases()
                });

                course.categories = data.categories;

                let templateData = informationView.render({
                    user: user,
                    fbClientId: FB_CLIENT_ID,
                    authSocialLinks: authSocialLinks,
                    entityData: courseView.page(course),
                    map: courseView.pageMap(course),
                    favorites: data.favorites,
                    categories: data.categories,
                    categoryAliases: data.categoryAliases,
                    priceLabelText: 'Гарантия лучшей цены',
                    actionButtonText: 'Хочу этот курс!',
                    header: headerView.render(config, entityType.COURSE)
                });
                let factory = contentExperiment.getFactoryByQuery(req.query);

                let html = soy.render(
                    'sm.lCourse.Template.course', {
                        params: {
                            data: templateData,
                            config: {
                                entityType: entityType.COURSE,
                                page: entityType.COURSE,
                                modifier: factory,
                                staticVersion: config.lastBuildTimestamp,
                                year: new Date().getFullYear(),
                                analyticsId: ANALYTICS_ID,
                                experimentId: EXPERIMENT_ID,
                                yandexMetrikaId: YANDEX_METRIKA_ID,
                                carrotquestId: CARROTQUEST_ID,
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
