'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const soy = require('../../../components/soy'),
    services = require('../../../components/services').all;

const courseView = require('../../../../api/modules/course/views/courseView'),
    searchView = require('../../../../api/modules/course/views/searchView'),
    homeView = require('../../../../api/modules/course/views/homeView'),
    informationView = require(
        '../../../../api/modules/course/views/informationView'
    ),
    configView = require('../../common/views/configView');

const contentExperiment =
        require('../../../components/contentExperiment/contentExperiment');

const pageName = require('../../common/enums/pageName'),
    entityType = require('../../../../api/modules/entity/enums/entityType.js'),
    filterName = require('../../../../api/modules/course/enums/filterName');

const logger = require('../../../components/logger/logger').getLogger('app');

const config = require('../../../config').config;

const FB_CLIENT_ID = config.facebookClientId;

let controller = {};

controller.home = async(function(req, res, next) {
    try {
        let authSocialLinks = services.auth.getAuthSocialUrl(),
            user = req.user || {};

        let data = await({
            favorites: services.favorite.getFavoriteEntities(user.id),
            categories: services.courseCategory.getAll({isActive: true}),
            categoryAliases: services.courseCategory.getAliases(),
            recommendations: services.courseSearchCatalog.getAll()
        });

        let templateData = homeView.render({
            user: user,
            authSocialLinks: authSocialLinks,
            favorites: data.favorites,
            categories: data.categories,
            categoryAliases: data.categoryAliases,
            recommendations: data.recommendations,
            entityType: entityType.COURSE,
            config: config
        });

        let templateConfig = configView.render({
            entityType: entityType.COURSE,
            pageName: pageName.HOME,
            query: req.query,
            csrf: req.csrfToken(),
            config: config
        });

        let html = soy.render(
            'sm.lHome.Template.home', {
                params: {
                    data: templateData,
                    config: templateConfig
                }
            });

        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
    } catch (error) {
        logger.error(error);

        res.status(error.code || 500);
        next(error);
    }
});

controller.commonSearch = async(function(req, res, next) {
    try {
        let authSocialLinks = services.auth.getAuthSocialUrl(),
            user = req.user || {},
            searchParams = searchView.initSearchParams(req.query);

        let factory = contentExperiment.getFactoryByQuery(req.query),
            templateName = contentExperiment.getSearchTemplateName(factory);

        let data = await({
                favorites: services.favorite.getFavoriteEntities(user.id),
                search: services.search.getData(searchParams, null)
            }),
            aliases = await({
                courses: services.course.getAliases(data.search.courses),
                map: services.course.getAliases(data.search.mapCourses),
                categories: services.courseCategory.getAliases()
            });

        let templateData = searchView.render({
            user: user,
            fbClientId: FB_CLIENT_ID,
            favorites: data.favorites,
            authSocialLinks: authSocialLinks,
            coursesList: data.search.courses,
            mapCourses: courseView.joinAliases(
                data.search.mapCourses, aliases.map
            ),
            mapPosition: data.search.mapPosition,
            searchParams: searchParams,
            enabledFilters: [
                filterName.CATEGORY,
                filterName.FORM_TRAINING,
                filterName.AGE
            ],
            filtersData: data.search.filtersData,
            aliases: aliases.courses,
            seoParams: data.search.seoParams,
            currentAlias: 'search',
            categories: data.search.categories,
            categoryAliases: aliases.categories,
            entityType: entityType.COURSE,
            config: config
        });

        let templateConfig = configView.render({
            entityType: entityType.COURSE,
            pageName: pageName.SEARCH,
            query: req.query,
            csrf: req.csrfToken(),
            config: config
        });

        let html = soy.render(
            templateName, {
                params: {
                    data: templateData,
                    config: templateConfig
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

            let factory = contentExperiment.getFactoryByQuery(req.query),
                templateName = contentExperiment.getSearchTemplateName(factory);

            let data = await({
                    favorites: services.favorite.getFavoriteEntities(user.id),
                    search: services.search.getData(
                        searchParams, categoryInstance.id
                    )
                }),
                aliases = await({
                    courses: services.course.getAliases(data.search.courses),
                    map: services.course.getAliases(data.search.mapCourses),
                    categories: services.courseCategory.getAliases()
                });

            let templateData = searchView.render({
                entityType: entityType.COURSE,
                user: user,
                fbClientId: FB_CLIENT_ID,
                favorites: data.favorites,
                authSocialLinks: authSocialLinks,
                coursesList: data.search.courses,
                mapCourses: courseView.joinAliases(
                    data.search.mapCourses, aliases.map
                ),
                mapPosition: data.search.mapPosition,
                searchParams: searchParams,
                filtersData: data.search.filtersData,
                enabledFilters: categoryInstance.filters,
                aliases: aliases.courses,
                seoParams: data.search.seoParams,
                currentCategory: categoryName,
                categories: data.search.categories,
                categoryAliases: aliases.categories,
                categoryId: categoryInstance.id,
                config: config
            });

            let templateConfig = configView.render({
                entityType: entityType.COURSE,
                pageName: pageName.SEARCH,
                query: req.query,
                csrf: req.csrfToken(),
                config: config
            });

            let html = soy.render(
                templateName, {
                    params: {
                        data: templateData,
                        config: templateConfig
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
                    categoryAliases: services.courseCategory.getAliases(),
                    seoParams: services.seoCourseList.getPageMeta(
                        page.category.entityId
                    )
                });

                course.categories = data.categories;

                let templateData = informationView.render({
                    user: user,
                    fbClientId: FB_CLIENT_ID,
                    authSocialLinks: authSocialLinks,
                    course: course,
                    categoryAlias: categoryAlias,
                    favorites: data.favorites,
                    categories: data.categories,
                    categoryAliases: data.categoryAliases,
                    seoParams: data.seoParams,
                    entityType: entityType.COURSE,
                    config: config
                });

                let templateConfig = configView.render({
                    entityType: entityType.COURSE,
                    pageName: pageName.INFORMATION,
                    query: req.query,
                    csrf: req.csrfToken(),
                    config: config
                });

                let html = soy.render(
                    'sm.lCourse.Template.course', {
                        params: {
                            data: templateData,
                            config: templateConfig
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
